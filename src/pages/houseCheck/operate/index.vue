<template>
    <view class="container">
        <view class="coupon-center">
            <view v-if="!isInvolving">
                <view>排药操作: {{ $store.state.scanCode}}</view>
                <view class="header-text">
                    <uni-steps :options="stepList" :active="stepList.findIndex(item=>item.title==currentStep)" />
                </view>
                <scroll-view>
                    <view v-for="(task, index) in taskList" :key="task.barcode">
                        <view class="progress-info patient-info">
                            <text>{{ task.barcode }}</text>
                            <view>
                                <text style="margin-right: 16upx;">{{ task.freq }}</text>
                                <text>{{ task.plan_time.slice(0, 16).replace('T', ' ') }}</text>
                            </view>
                        </view>
                        <view
                            class="progress-info"
                            v-for="(item, index) in task.medicines"
                            :key="index"
                        >   
                            <text>{{ item.order_name }}</text>
                            <text>{{ item.quantity }}{{ item.unit }}</text>
                        </view>
                    </view>
                    <view class="center patient-info" v-if="patientInfo">
                        <text class="item">{{ patientInfo.Name }} |</text>
                        <text class="item">{{ patientInfo.BedNo }}床 |</text>
                        <text class="item">{{ patientInfo.PhysiSexName }} |</text>
                        <text class="item">{{ getAgeByBirthdate(patientInfo.BirthDate) }} |</text>
                        <text>MRN {{ patientInfo.Mrn }}</text>
                    </view>
                </scroll-view>
            </view>
            <view v-else>
                <view class="header-text">请填写巡视信息</view>
                <uni-section title="滴速 (滴/分)"  type="line" class="input-area">
                    <uni-easyinput class="uni-mt-5" trim="all" v-model="inputValue1" placeholder="请输入内容" type='number'></uni-easyinput>
                </uni-section>
                <uni-section title="备注"  type="line" class="input-area">
                    <uni-easyinput class="uni-mt-5" trim="all" v-model="inputValue2" placeholder="请输入内容"></uni-easyinput>
                </uni-section>
            </view>
        </view>
        <view class="operate-group" v-if='!isInvolving'>
            <text>可继续扫描或者继续排药</text>
            <button type="primary" class="confirm-button" @tap.stop="operate" v-if="!isOneFlowEnd">
                {{currentStep}}{{ "("+count+')' }}
            </button>
        </view>
        <view class="single-line-group" v-else>
            <button type="primary"  @tap.stop="finish" size="mini" style="height: 50upx; width: 200upx;">
                拔针完成
            </button>
            <button  @tap.stop="save" size="mini" style="height: 50upx; width: 200upx;">
                保存滴速
            </button>
        </view>
        <rfLoading isFullScreen :active="loading"></rfLoading>
    </view>
</template>

<script>
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import { mapMutations, mapState } from 'vuex';
import {taskUrl} from '@/api/login'

export default {
	components: {
		rfLoadMore,
	},
	data() {
		return {
           patientInfo:  null,
           taskList : [],
           loading: true,
           count: 0,
           step: [],
           stepsCodeList: [],
           bardcodeList: [],
           currentStep: '',
           isOneFlowEnd: false,
           inputValue1: '',
           inputValue2: '',
           isInvolving: false,
           stepList: [{
              title: '排药'
           },{
            title: '加药'
           },{
            title: '执行'
           }]
		};
	},
    computed: {
        ...mapState(['cachePatientsList', 'scanCode']),
    },

    watch: {
        scanCode(newVal) {
			this.getInfo(newVal)
		},
    },

	onLoad(options) {
        this.getInfo()
	},

    beforeUnmount() {

	},

	methods: {
		...mapMutations(['setPatientInfo']),

        async getInfo(code='00249175632026072008001'){
            this.loading = true
            const res = await this.$http.get(taskUrl + `?code=${code}`)
            if(res){
                this.handleResponse(res)
            }
        },
        
        handleResponse(res){
                if(this.bardcodeList.includes(res.barcode)){
                    return this.$mHelper.toast('请不要重复扫码.');
                }
                if(this.patientInfo && !this.isOneFlowEnd){
                    if(this.patientInfo.PatientId!==res.inpatient){
                        return this.$mHelper.toast('扫描的二维码不是同一个人, 请核对.');
                    }
                }else {
                    this.isOneFlowEnd = false
                    this.taskList = []
                    this.patientInfo = this.cachePatientsList.filter(item=> item.PatientId==res.inpatient)[0]
                }

                if(this.step.length==0){
                    this.step= res.steps
                    this.stepsCodeList=this.step.map(item=>item.code)
                    this.currentStep = this.step[0].name
                    this.isInvolving = this.step[0].name=='结束'
                }else {
                    let isSameStep = true
                    res.steps.forEach(item=>{
                        if(!this.stepsCodeList.includes(item.code)){
                            isSameStep = false
                        }
                    })
                    if(!isSameStep){
                        return this.$mHelper.toast('此药品暂时不能执行此操作');
                    }
                }
                this.taskList = [...this.taskList, res]
                this.bardcodeList.push(res.barcode)
                this.loading = false
                this.count++
        },

        getAgeByBirthdate(birthDate){
            if(birthDate){
                const today = new Date()
                return today.getFullYear() - Number(birthDate.slice(0,4))
            }else {
                return ''
            }
        },
        
        handleSumbitSuccess(){
            this.isOneFlowEnd = true
            this.step = [],
            this.stepsCodeList=[],
            this.bardcodeList = []
            this.count = 0
            this.loading = false
        },

        operate(){
            this.loading = true
            const requestList = this.taskList.map(task=>this.$http.post(taskUrl + `/${task.id}/${this.stepsCodeList[0]}`))
            Promise.all(requestList).then(res=>{
                this.handleSumbitSuccess()
            }).catch((err)=>{
                this.$mHelper.toast(err);
                this.loading = false
            })
        },

        async finish(){
            this.loading = true
            const res = await this.$http.post(taskUrl + `/${this.taskList[0].id}/finish`)
            if(res){
                this.$mHelper.toast('操作完成');
                this.loading = false
            }
        },
        
        async save(){
            this.loading = true
            const res = await this.$http.post(taskUrl + `/${this.taskList[0].id}/round`,{
                drop_per_min: this.inputValue1
            })
            if(res){
                this.$mHelper.toast('保存成功');
                this.loading = false
            }
        }
	}
};
</script>
<style lang="scss">

page {
    background: white;
    height: 100%;
}

.tip-text {
    color: grey;
}
.header-text {
    text-align: center;
    padding: 20upx 0;
}

.progress-info,
.drug-info {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid gray;
    height: 90upx;
    padding: 0 30upx;
    align-items: center;
}

.patient-info {
    display: flex;
    border-bottom: 1px solid gray;
    height: 90upx;
    padding: 0 30upx;
    align-items: center;
    .item {
        margin-right: 10upx;
    }
}
.patient-info  {
    background-color: rgb(105, 98, 98, 0.1);
}
.container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 98%;
}
.operate-group {
    text-align: center;
}

.isCurrentStep {
    color: #007aff;
    font-weight: bolder;
}

.single-line-group {
    display: flex;
    flex-direction: row;

}
.input-area {
    padding: 0upx 20upx;
}
</style>