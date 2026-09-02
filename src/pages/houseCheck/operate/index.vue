<template>
    <view class="container">
        <view class="coupon-center">
            <view>
                <!-- <view>排药操作: {{ this.scanCode}}</view> -->
                <!-- <view><text v-for="(code, index) in bardcodeList" :key="index">{{ code }}</text></view> -->
                <view class="header-text">
                    <uni-steps :options="stepList" :active="stepList.findIndex(item=>item.title==currentStep)" />
                </view>
                <scroll-view scroll-y="true" style="height: 76vh;">
                    <view v-for="(task, index) in this.taskList" :key="task.barcode">
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
            <view v-if='isInvolving'>
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
            <text class="cu-warning" v-if="currentStep=='执行'">
                该药品还未执行, 请扫描病人腕带, 核对患者并执行
            </text>
            <text v-else class="cu-load">可继续扫描或者继续排药</text>
            <button type="primary" class="confirm-button" @tap.stop="operate" v-if="currentStep" :disabled="disabled">
                {{currentStep}}{{ "("+this.taskList.length+')' }}
            </button>
        </view>
        <view class="single-line-group" v-else>
            <button type="primary"  @tap.stop="finish"  style="width: 200upx;">
                拔针完成
            </button>
            <button  @tap.stop="save"  style="width: 200upx;">
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
           loading: true,
           stepsCodeList: [],
           bardcodeList: [],  //判断是否重复扫码
           currentStep: '',
           inputValue1: '',
           inputValue2: '',
           isInvolving: false,
           wristband: '',
           stepList: []
		};
	},
    computed: {
        ...mapState(['cachePatientsList', 'scanCode','workflows', 'taskList']),
        disabled(){
            if(this.currentStep.includes('执行')){
                if(this.patientInfo.Wristband!=this.wristband){
                    return true
                }
            }
            return false
        }
    },
     
    watch: {
        scanCode: {
            handler(newVal, oldVal){
                if(newVal) {
                    const stringCode = newVal + ''
                    if(stringCode.length==5||stringCode.length==6){
                        this.wristband = stringCode
                        //腕带
                        if(this.taskList.length==0){

                            return this.$mHelper.toast('请先扫描药品二维码');

                        } else if(this.patientInfo.wristband!=stringCode) {

                            this.$mHelper.toast('腕带和药品不匹配, 不能执行');

                        }else if( this.patientInfo.wristband==stringCode){
                            this.operate()
                        }
                    }else {
                        //瓶贴
                        this.getInfo(stringCode)
                    }
                }
            },
            immediate: true
        }
    },

	onLoad(options) {
        // this.getInfo('00249175632026072008001')
	},

    beforeUnmount() {

	},

	methods: {

        async getInfo(code){
            this.loading = true
            const res = await this.$http.get(taskUrl + `?code=${code}`)
            if(res){
                this.loading = false
                this.handleResponse(res)
                this.stepList = this.getStepList( this.workflows.get(res.workflow))
            }
        },
        
        getStepList(stepString){
            const steps = stepString.split('->')
            return steps.map(item=>{
                return {
                    title: item=='配药'?'加药': item
                }
            })
        },


        handleResponse(res){
            if(this.bardcodeList.includes(res.barcode)){
                return this.$mHelper.toast('请不要重复扫码.');
            }
            if(!res.steps || res.steps.length==0){
                return this.$mHelper.toast('该药品已经执行完毕, 请勿重复操作.');
            }

            if(this.patientInfo ){
                if(this.patientInfo.PatientId!=res.inpatient){
                    return this.$mHelper.toast('扫描的二维码不是同一个人, 请核对.');
                }
            }else {
                this.$mStore.commit('clearTaskList');                   
                this.patientInfo = this.cachePatientsList.filter(item=> item.PatientId==res.inpatient)[0]
            }

            if(!this.currentStep){
                this.stepsCodeList=res.steps.map(item=>item.code)
                this.currentStep = res.steps[0].name
                uni.setNavigationBarTitle({
                    title: this.currentStep 
                });
                this.isInvolving = this.currentStep=='结束'
            }else {
                let isSameStep = this.currentStep == res.steps[0].name
                if(!isSameStep){
                    return this.$mHelper.toast('此药品暂时不能执行此操作');
                }
            }

            this.$mStore.commit('addTaskList', res);
            this.bardcodeList.push(res.barcode)
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
            this.wristband = ''
            this.patientInfo=null
            this.stepsCodeList=[]
            this.bardcodeList = []
            this.currentStep = ''
            this.loading = false
        },

        operate(){
            if(!this.currentStep.includes('执行')){
                return this.$mHelper.toast('该药品暂时不能执行此操作');
            }
            this.loading = true
            
            const requestList = this.taskList.map(task=>this.$http.post(taskUrl + `/${task.id}/${this.stepsCodeList[0]}`))
            Promise.all(requestList).then(res=>{
                this.$mHelper.toast('执行成功');
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
                drop_per_min: this.inputValue1,
                remark: this.inputValue2
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
.cu-warning {
    color: #007aff;
}
</style>