<template>
    <view class="container">
        <view v-if='!isInvolving'>
            <view>
                <!-- <view>排药操作: {{ this.scanCode}}</view> -->
                <view class="header-text">
                    <uni-steps :options="stepList" :active="stepList.findIndex(item=>item.title==currentStep)" />
                </view>
                <scroll-view scroll-y="true" style="height: 76vh;">
                    <uni-card :is-shadow="true" style="margin: 15px 8px; padding:0px" :class="'bg-' + themeColor.name">
                        <view class="" v-if="patientInfo">
                            <text class="item rf-bolder">{{ patientInfo.Name }} |</text>
                            <text class="item rf-bolder">{{ patientInfo.BedNo }}床 |</text>
                            <text class="item">{{ patientInfo.PhysiSexName }} |</text>
                            <text class="item">{{ getAgeByBirthdate(patientInfo.BirthDate) }} |</text>
                            <text>MRN {{ patientInfo.Mrn }}</text>
                        </view>
                    </uni-card>
                    <uni-card  v-for="(task, index) in this.taskList" :key="task.barcode" :title="task.barcode" :extra="task.freq + ' ' + task.plan_time.slice(5, 16).replace('T', ' ')" style="margin: 15px 8px; padding:0px">
                        <view
                            class="progress-info"
                            v-for="(item, index) in task.medicines"
                            :key="index"
                        >   
                            <text class="rf-bolder">{{ item.order_name }}</text>
                            <text>{{ item.quantity }}{{ item.unit }}</text>
                        </view>
                    </uni-card>
                </scroll-view>
            </view>
            <view class="operate-group">
                <text class="cu-warning" v-if="currentStep=='执行'">
                    该药品还未执行, 请扫描病人腕带, 核对患者并执行
                </text>
                <text v-else class="cu-load">可继续扫描或者继续排药</text>
                <button type="primary" class="confirm-button" @tap.stop="operate" v-if="currentStep" :disabled="disabled">
                    {{currentStep}}{{ "("+this.taskList.length+')' }}
                </button>
            </view>
        </view>

        <view v-else>
            <view class="header-text">请填写巡视信息</view>
            <uni-section title="滴速 (滴/分)"  type="line" class="input-area">
                <uni-easyinput class="uni-mt-5" trim="all" v-model="inputValue1" placeholder="请输入内容" type='number'></uni-easyinput>
            </uni-section>
            <uni-section title="备注"  type="line" class="input-area">
                <uni-easyinput class="uni-mt-5" trim="all" v-model="inputValue2" placeholder="请输入内容"></uni-easyinput>
            </uni-section>
            <view class="single-line-group" >
                <button type="primary"  @tap.stop="finish"  style="width: 200upx;">
                    拔针完成
                </button>
                <button  @tap.stop="save"  style="width: 200upx;">
                    保存滴速
                </button>
            </view>
            <!-- <uni-icons type="checkbox-filled" size="30" color=""></uni-icons> -->
        </view>

        <rfLoading isFullScreen :active="loading"></rfLoading>
    </view>
</template>

<script>
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import { mapState } from 'vuex';
import {taskUrl, getInpatientTasksById} from '@/api/login'

export default {
	components: {
		rfLoadMore,
	},
	data() {
		return {
           patientInfo:  null,
           loading: false,
           stepsCodeList: [],
           bardcodeList: [],  //判断是否重复扫码
           currentStep: '',
           inputValue1: '',
           inputValue2: '',
           isInvolving: false,
           Wristband: '',
           stepList: [],
           isInformAllergy: false
		};
	},
    computed: {
        ...mapState(['cachePatientsList', 'scanCode','workflows', 'taskList']),
        disabled(){
            if(this.currentStep.includes('执行')){
                if(this.patientInfo.Wristband!=this.Wristband){
                    return true
                }
            }
            return false
        }
    },
     
    watch: {
        scanCode: {
            async handler(newVal, oldVal){
                if(newVal) {
                    const stringCode = newVal + ''
                    if(stringCode.length==5||stringCode.length==6){
                        this.Wristband = stringCode
                        //腕带
                        if(this.taskList.length==0){

                            return this.$mHelper.toast('请先扫描药品二维码');

                        } else if(this.patientInfo.Wristband!=stringCode) {
                            
                            this.$mHelper.toast(`患者是${this.patientInfo.Wristband}, 扫描的是${stringCode}, 腕带和药品不匹配, 不能执行`);

                        }else if( this.patientInfo.Wristband==stringCode){
                            if(this.currentStep=='执行'){
                                //首先查询是否有正在执行中的药品，有的话先结束
                                await this.getExcutingInfo(this.patientInfo.PatientId)
                                this.operate()
                            }
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
        this.$mStore.commit('clearTaskList'); 
        // this.getInfo('00249772902026091023001')
	},

    mounted() {
	},

	methods: {
        
        async getInfo(code){
            // this.loading = true
            const res = await this.$http.get(taskUrl + `?code=${code}`)
            if(res){
                // this.loading = false
                this.handleResponse(res)
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
            
            if(this.patientInfo && this.patientInfo.PatientId!=res.inpatient && this.currentStep!='收药'){
                return this.$mHelper.toast('扫描的二维码不是同一个人, 请核对.');
            }else if(!this.patientInfo){                   
                this.patientInfo = this.cachePatientsList.filter(item=> item.PatientId==res.inpatient)[0]

                this.$mHelper.toast(this.patientInfo.Wristband)

                if(this.patientInfo.Allergy && this.patientInfo.Allergy.length>0){
                    if(!this.isInformAllergy) {
                        uni.vibrateLong({
                            success: function () {
                                this.$mHelper.toast('该患者有药品过敏记录');
                            },
                            fail: function (err) {
                                console.log('震动失败', err);
                            }
                        });
                    }
                    this.isInformAllergy = true
                }
            }

            if(!this.currentStep){
                this.$mHelper.toast(res.steps[0].name);
                this.stepsCodeList=res.steps.map(item=>item.code)
                this.currentStep = res.steps[0].name
                uni.setNavigationBarTitle({
                    title: this.currentStep 
                });
                this.isInvolving = this.currentStep=='结束'
            }else {
                let isSameStep = this.currentStep == res.steps[0].name
                if(!isSameStep){
                    return this.$mHelper.toast('此药品流程与已有药品流程不同，暂时不能执行此操作');
                }
            }

            this.$mStore.commit('addTaskList', res);
            this.bardcodeList.push(res.barcode)
            this.stepList = this.getStepList( this.workflows.get(res.workflow))
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
            if(this.currentStep=='执行' && this.stepList.includes('结束')) this.isInvolving = true
            this.reset()
        },

        reset(){
            this.$mStore.commit('clearTaskList'); 
            this.Wristband = ''
            this.patientInfo=null
            this.stepsCodeList=[]
            this.bardcodeList = []
            this.loading = false
            this.stepList=[]
            this.isInformAllergy = false
            this.currentStep = ''
        },

        operate(){
            this.loading = true
            
            const requestList = this.taskList.map(task=>this.$http.post(taskUrl + `/${task.id}/${this.stepsCodeList[0]}`))
            Promise.all(requestList).then(res=>{
                this.$mHelper.toast(`${this.currentStep}成功`);
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
                this.$mHelper.toast('拔针完成');
                this.reset()
                this.isInvolving = false
            }
        },
        
        async save(){
            this.loading = true
            const res = await this.$http.post(taskUrl + `/${this.taskList[0].id}/inspect`,{
                drop_per_min: this.inputValue1,
                remark: this.inputValue2
            })
            if(res){
                this.$mHelper.toast('保存成功');
                this.loading = false
            }
        },

        async getExcutingInfo(inpatient){
            const res = await this.$http.get(getInpatientTasksById(inpatient)+ '?active=true')
            const filterItem = res.filter(item=>item.state==51)
            if(filterItem.length > 0){
                const id = filterItem[0].id
                await this.$http.post(taskUrl + `/${id}/finish`)
            }
        },
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
    padding: 20upx 10upx;
}

.progress-info,
.drug-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    margin-top: 30upx;
}
.input-area {
    padding: 20upx 20upx;
}
.cu-warning {
    color: #007aff;
}
</style>