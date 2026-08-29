<template>
    <view class="container">
            <view class="patient-info">
                <text class="item rf-bolder">{{ patientInfo.Name }} |</text>
                <text class="item rf-bolder">{{ patientInfo.BedNo }}床 |</text>
                <text class="item rf-bolder">{{ patientInfo.PhysiSexName }} |</text>
                <text class="item rf-bolder">{{ getAgeByBirthdate(patientInfo.BirthDate) }} |</text>
                <text>MRN {{ patientInfo.Mrn }}</text>
                
                <uni-section title="选择时间" type="line">
                    <uni-datetime-picker type="date" :clear-icon="false" v-model="single" @maskClick="maskClick" />
                    <!-- <uni-data-select
                        v-if="range && range.length>0"
                        v-model="timePeriodValue"
                        :localdata="range"
                        @change="change"
                        :clear="false"
                    ></uni-data-select> -->
                </uni-section>
            </view>
        <view class="input-container">
            <text class="rf-bolder">TPRBP</text>
            <uni-section title="体温" type="line">
                <uni-card>
                    <view class="option-list">
                        <button 
                            v-for="(item, index) in temperature" 
                            :key="index" 
                            class="button"
                            :type="temperatureIndex==index? 'primary':''"
                            @tap.stop="handleClickTemperature(index)"
                            >
                            {{ item }}
                        </button>
                    </view>
                    <view class="single-line">
                        <view class="single-item">
                            <uni-easyinput v-model="temperatureValue1" placeholder="请输入内容" type="number"></uni-easyinput>
                                <text class="single-item-right-text">℃</text>
                        </view>
                        <view class="single-item">
                            <text class="single-item-left-text">降温后</text>
                            <uni-easyinput v-model="temperatureValue2" placeholder="请输入内容" type="number"></uni-easyinput>
                            <text class="single-item-right-text">℃</text>
                        </view>
                    </view>
                </uni-card>
            </uni-section>
            <uni-section title="脉搏" type="line">
                <uni-card>
                    <view class="option-list">
                        <button 
                            v-for="(item, index) in pulseList" 
                            :key="index" 
                            class="button"
                            :type="pulseIndex==index? 'primary':''"
                            @tap.stop="handleClickPulse(index)"
                            >
                            {{ item }}
                        </button>
                    </view>
                    <view class="single-line">
                        <view class="single-item">
                            <uni-easyinput v-model="pulseValue" placeholder="请输入内容" type="number"></uni-easyinput>
                            <text class="single-item-right-text">次/分</text>
                        </view>
                    </view>
                </uni-card>
            </uni-section>

            <uni-section title="呼吸" type="line">
                <uni-card>
                    <view class="option-list">
                        <button 
                            v-for="(item, index) in breatheWay" 
                            :key="index" 
                            class="button"
                            :type="breatheWayIndex==index? 'primary':''"
                            @tap.stop="handleClickBreatheWay(index)"
                            >
                            {{ item }}
                        </button>
                    </view>
                    <view class="single-line">
                        <view class="single-item">
                            <uni-easyinput v-model="breatheWayValue" placeholder="请输入内容" type="number"></uni-easyinput>
                                <text class="single-item-right-text">次/分</text>
                        </view>
                    </view>
                </uni-card>
            </uni-section>

            <uni-section title="大便" type="line">
                <uni-card>
                    <view class="option-list">
                        <button 
                            v-for="(item, index) in stoolOptions" 
                            :key="index" 
                            class="button"
                            :type="stoolOptionsIndex==index? 'primary':''"
                            @tap.stop="handleClickStoolOptions(index)"
                            >
                            {{ item }}
                        </button>
                    </view>
                    <view class="single-line">
                        <view class="single-item">
                            <uni-easyinput v-model="stoolOptionsValue" placeholder="请输入内容"></uni-easyinput>
                                <text class="single-item-right-text">次</text>
                        </view>
                    </view>
                </uni-card>
            </uni-section>


            <uni-section title="小便" type="line">
                <uni-card>
                    <view class="option-list">
                        <button 
                            v-for="(item, index) in urinateOptions" 
                            :key="index" 
                            class="button"
                            :type="urinateOptionsIndex==index? 'primary':''"
                            @tap.stop="handleClickUrinateOptions(index)"
                            >
                            {{ item }}
                        </button>
                    </view>
                    <view class="single-line">
                        <view class="single-item">
                            <uni-easyinput v-model="urinateOptionsValue" placeholder="请输入内容"></uni-easyinput>
                                <text class="single-item-right-text">次</text>
                        </view>
                    </view>
                </uni-card>
            </uni-section>
            
            

            <uni-section title="血压" type="line">
                <uni-card>
                    <view class="single-line">
                        <view class="single-item">
                            <uni-easyinput v-model="bloodPressureValue1" placeholder="收缩压" type="number"></uni-easyinput>
                                <text class="single-item-right-text">mmHg</text>
                        </view>
                        <view class="single-item">
                            <uni-easyinput v-model="bloodPressureValue2" placeholder="舒张压" type="number"></uni-easyinput>
                                <text class="single-item-right-text">mmHg</text>
                        </view>                            
                    </view>
                </uni-card>
            </uni-section>
            
            <uni-section title="心率" type="line">
                <uni-card>
                    <view class="single-line">
                        <view class="single-item">
                            <uni-easyinput v-model="heartRateValue" placeholder="请输入内容" type="number"></uni-easyinput>
                                <text class="single-item-right-text">次/分</text>
                        </view>
                    </view>
                </uni-card>
            </uni-section>

            <uni-section title="疼痛评分" type="line">
                <uni-card>
                    <view class="single-line">
                        <view class="single-item">
                            <uni-easyinput v-model="painValue1" placeholder="疼痛评分" type="number"></uni-easyinput>
                        </view>
                        <view class="single-item">
                            <uni-easyinput v-model="painValue2" placeholder="疼痛缓解" type="number"></uni-easyinput>
                        </view>
                    </view>
                </uni-card>
            </uni-section>
            
            
            <uni-section title="24H入量" type="line">
                <uni-card>
                    <view class="single-line">
                        <view class="single-item">
                            <uni-easyinput v-model="in24HValue" placeholder="请输入内容" type="number"></uni-easyinput>
                                <text class="single-item-right-text">次</text>
                        </view>
                    </view>
                </uni-card>
            </uni-section> 
            <uni-section title="24H出量" type="line">
                <uni-card>
                    <view class="single-line">
                        <view class="single-item">
                            <uni-easyinput v-model="out24HValue" placeholder="请输入内容" type="number"></uni-easyinput>
                                <text class="single-item-right-text">次</text>
                        </view>
                    </view>
                </uni-card>
            </uni-section>

            <uni-section title="引流量" type="line">
                <uni-card>
                    <view class="single-line">
                        <view class="single-item">
                            <uni-easyinput v-model="pipeValue" placeholder="请输入内容" ></uni-easyinput>
                                <text class="single-item-right-text">ml</text>
                        </view>
                    </view>
                </uni-card>
            </uni-section>
            
            
                <uni-section title="脉象" type="line">
                <uni-card>
                    <view class="option-list">
                        <button 
                            v-for="(item, index) in pulseCondition" 
                            :key="index" 
                            class="button"
                            :type="pulseConditionIndex==index? 'primary':''"
                            @tap.stop="handleClickPulseCondition(index)"
                            >
                            {{ item }}
                        </button>
                    </view>
                    <view class="single-line">
                        <view class="single-item">
                        </view>
                    </view>
                </uni-card>
            </uni-section>


                <uni-section title="舌象" type="line">
                <uni-card>
                    <view class="option-list">
                        <button 
                            v-for="(item, index) in tongueCondition" 
                            :key="index" 
                            class="button"
                            :type="tongueConditionIndex==index? 'primary':''"
                            @tap.stop="handleClickTongueCondition(index)"
                            >
                            {{ item }}
                        </button>
                    </view>
                </uni-card>
            </uni-section>
            
                <uni-section title="药物过敏1" type="line">
                <uni-card>
                    <view class="option-list">
                        <button 
                            v-for="(item, index) in allergy" 
                            :key="index" 
                            class="button"
                            :type="allergy1Index==index? 'primary':''"
                            @tap.stop="handleClickAllergy1(index)"
                            >
                            {{ item }}
                        </button>
                    </view>
                </uni-card>
            </uni-section>
            
            
                <uni-section title="药物过敏2" type="line">
                <uni-card>
                    <view class="option-list">
                        <button 
                            v-for="(item, index) in allergy" 
                            :key="index" 
                            class="button"
                            :type="allergy2Index==index? 'primary':''"
                            @tap.stop="handleClickAllergy2(index)"
                            >
                            {{ item }}
                        </button>
                    </view>
                </uni-card>
            </uni-section> 

            <uni-section title="起搏心率" type="line">
                <uni-card>
                    <view class="single-line">
                        <view class="single-item">
                            <uni-easyinput v-model="erectionHeartRateValue" placeholder="请输入内容" type="number"></uni-easyinput>
                                <text class="single-item-right-text">次/分</text>
                        </view>
                    </view>
                </uni-card>
            </uni-section> 

                <uni-section title="农历节气" type="line">
                <uni-card>
                    <view class="option-list">
                        <button 
                            v-for="(item, index) in climate" 
                            :key="index" 
                            class="button"
                            :type="climateIndex==index? 'primary':''"
                            @tap.stop="handleClickClimate(index)"
                            >
                            {{ item }}
                        </button>
                    </view>
                </uni-card>
            </uni-section> 

            <uni-section title="体重" type="line">
                <uni-card>
                    <view class="option-list">
                        <button 
                            v-for="(item, index) in weight" 
                            :key="index" 
                            class="button"
                            :type="weightIndex==index? 'primary':''"
                            @tap.stop="handleClickWeight(index)"
                            >
                            {{ item }}
                        </button>
                    </view>
                    <view class="single-line">
                        <view class="single-item">
                            <uni-easyinput v-model="weightValue" placeholder="请输入内容" type="number"></uni-easyinput>
                        </view>
                    </view>
                </uni-card>
            </uni-section>

            <uni-section title="其他" type="line">
                <uni-card>
                    <view class="option-list">
                        <button 
                            v-for="(item, index) in other" 
                            :key="index" 
                            class="button"
                            :type="otherIndex==index? 'primary':''"
                            @tap.stop="handleClickOther(index)"
                            >
                            {{ item }}
                        </button>
                    </view>
                    <view class="single-line">
                        <view class="single-item">                                
                        </view>
                    </view>
                </uni-card>
            </uni-section>

            <uni-section title="地高辛" type="line">
                <uni-card>
                    <view class="option-list">
                        <button 
                            v-for="(item, index) in diGaoXin" 
                            :key="index" 
                            class="button"
                            :type="diGaoXinIndex==index? 'primary':''"
                            @tap.stop="handleClickDigaoxin(index)"
                            >
                            {{index==1? '↑': index==2? '↓': ''}}
                            {{  item }}
                        </button>
                    </view>
                    <view class="single-line">
                        <view class="single-item">
                        </view>
                    </view>
                </uni-card>
            </uni-section>
                        
            <uni-section title="事件" type="line">
                <uni-card>
                    <view class="option-list">
                        <button 
                            v-for="(item, index) in eventName" 
                            :key="index" 
                            class="button"
                            :type="eventNameIndex==index? 'primary':''"
                            @tap.stop="handleClickEventName(index)"
                            >
                            {{ item }}
                        </button>
                    </view>
                </uni-card>
            </uni-section>
        </view>
        <view class="">
            <button type="primary" class="confirm-button" @tap.stop="submit">
                提交
            </button>
        </view>
        <rfLoading isFullScreen :active="loading"></rfLoading>
    </view>
</template>

<script>
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import uniDataSelect from '@dcloudio/uni-ui/lib/uni-data-select/uni-data-select.vue'
import uniSection from '@dcloudio/uni-ui/lib/uni-section/uni-section.vue'
import uniEasyinput from '@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.vue'
import uniDatetimePicker from '@dcloudio/uni-ui/lib/uni-datetime-picker/uni-datetime-picker.vue'
import { mapMutations, mapState } from 'vuex';
import {taskUrl, getInpatientTasksById} from '@/api/login'
import {temperature, pulseList, breatheWay, allergy, pulseCondition,weight,
    tongueCondition,climate, other, diGaoXin, eventName, stoolOptions, urinateOptions} from './option.js'

export default {
	components: {
		rfLoadMore,
        uniDataSelect,
        uniSection,
        uniDatetimePicker,
        uniEasyinput
	},
	data() {
		return {
            patientInfo:  null,
            medicines: [],
            loading: true,
            timePeriodValue: 1, 
            range: [ {value: 0, text:'02'},
                    {value: 1, text:'06'},
                    {value: 2, text: '10'},
                    {value: 3, text: '14'},
                    {value: 4, text: '18'},
                    {value: 5, text: '22'}
                ],
            temperature,
            pulseList,
            breatheWay,
            allergy,
            pulseCondition,
            weight,
            tongueCondition,
            climate, 
            other, 
            diGaoXin, 
            eventName, 
            stoolOptions, 
            urinateOptions,
            temperatureIndex: 0,
            pulseIndex: 0,
            breatheWayIndex: 0,
            stoolOptionsIndex: 0,
            urinateOptionsIndex: 0,
            allergy1Index: 0,
            allergy2Index: 0,
            weightIndex: 0,
            climateIndex: 0,
            pulseConditionIndex: 0,
            tongueConditionIndex: 0,
            eventNameIndex: 0,
            otherIndex: 0,
            diGaoXinIndex: 0,

            temperatureValue1: '',
            temperatureValue2: '',
            pulseValue: '',
            breatheWayValue: '',
            stoolOptionsValue: '',
            urinateOptionsValue: '',
            bloodPressureValue1: '',
            bloodPressureValue2: '',
            heartRateValue: '',
            painValue1: '',
            painValue2: '',
            in24HValue: '',
            out24HValue: '',
            weightValue: '',
            eventNameValue: '',
            pipeValue: '',
            erectionHeartRateValue: '',
            single: ''
		};
	},
    computed: {
        ...mapState(['cachePatientsList']),
    },

	onLoad(options) {
        this.patientInfo = JSON.parse(options.patientInfo)
        this.getInfo(this.patientInfo.PatientId)
	},

	methods: {

        async getInfo(inpatient){
            this.loading = true
            const res = await this.$http.get(getInpatientTasksById(inpatient))
            if(res){
                this.medicines = res
                this.loading = false
            }
        },

        change(e) {

        },
        
        maskClick(e) {
            console.log("e:", e);
        },

        getAgeByBirthdate(birthDate){
            if(birthDate){
                const today = new Date()
                return today.getFullYear() - Number(birthDate.slice(0,4))
            }else {
                return ''
            }
        },
    
        generateBody(){
            let planned_time =''
            if(isOpened){
                planned_time = getStandardDay(searchForm.date)+ 'T'+ searchForm.timePeriod +':00:00+08:00'
            }else {
                if(timePickerValue.value){
                    planned_time = getStandardDay(searchForm.date)+ 'T'+ timePickerValue.value +'+08:00'
                }else {
                    ElMessage.warning('请选择时段')
                    return
                }
            }
            const inpatient = this.patientInfo.PatientId
            const result = []

            if(temperatureValue1.value){
                const obj1 = {
                    inpatient,
                    unit: '℃',
                    planned_time,
                    text1: temperatureType.value, 
                    value1: Number(temperatureValue1.value),
                    name: nameMap.temperatureName
                }
                result.push(obj1)
            }
            if(temperatureValue2.value){
                const obj2 = {
                    inpatient,
                    unit: '℃',
                    planned_time,
                    text1: temperatureType.value,
                    value1: Number(temperatureValue2.value),
                    name: nameMap.coolTemperatureName
                }
                result.push(obj2)
            }

            if(pulseValue.value){
                result.push({
                    inpatient,
                    unit: '次/分',
                    planned_time,
                    text1: pulseTypeValue.value, 
                    value1: Number(pulseValue.value),
                    name: nameMap.pulseName
                })
            }
            if(breatheValue.value){
                result.push({
                    inpatient,
                    unit: '次/分',
                    planned_time,
                    text1: breatheWayValue.value, 
                    value1: Number(breatheValue.value),
                    name: nameMap.breatheName
                })
            }
            if(stoolValue.value){
                result.push({
                    inpatient,
                    unit: '次/分',
                    planned_time,
                    text1: stoolValue.value, 
                    name: nameMap.stoolName
                })
            }
            if(bloodPressureValue1.value){
                result.push({
                    inpatient,
                    unit: 'mmHg',
                    planned_time,
                    value1: Number(bloodPressureValue1.value),
                    value2: Number(bloodPressureValue2.value),
                    name: nameMap.bloodPressureName
                })
            }
            if(heartQuencyValue.value){
                result.push({
                    inpatient,
                    unit: '次/分',
                    planned_time,
                    value1: heartQuencyValue.value,
                    name: nameMap.heartRate
                })
            }


            if(painValue.value){
                result.push({
                    inpatient,
                    unit: '',
                    planned_time,
                    value1: Number(painValue.value),
                    name: nameMap.score
                })
            }

            if(painEaseValue.value){
                result.push({
                    inpatient,
                    unit: '',
                    planned_time,
                    value1: Number(painEaseValue.value),
                    name: '缓解后疼痛得分'
                })
            }

            if(pulseConditionValue.value){
                result.push({
                    inpatient,
                    unit: '',
                    planned_time,
                    text1: pulseConditionValue.value, 
                    name: nameMap.pulseCondition
                })
            }
            if(tongueConditionValue.value){
                result.push({
                    inpatient,
                    unit: '',
                    planned_time,
                    text1: tongueConditionValue.value, 
                    name: nameMap.tongueCondition
                })
            }

            if(weightValue.value){
                result.push({
                    inpatient,
                    unit: 'kg',
                    planned_time,
                    value1: Number(weightValue.value),
                    name: nameMap.weight
                })
            }

            if(jumpHeartValue.value){
                result.push({
                    inpatient,
                    unit: '次/分',
                    planned_time,
                    value1: Number(jumpHeartValue.value),
                    name: nameMap.jumpHeartValue
                })
            }

            if(urinateValue.value){
                result.push({
                    inpatient,
                    unit: 'ml',
                    planned_time,
                    text1: urinateValue.value, 
                    name: nameMap.urinate
                })
            }
            if(in24HValue.value){
                result.push({
                    inpatient,
                    unit: 'ml',
                    planned_time,
                    text1: nameMap.HIn24, 
                    value1: in24HValue.value,
                    name: nameMap.HIn24
                })
            }
            if(out24HValue.value){
                result.push({
                    inpatient,
                    unit: 'ml',
                    planned_time,
                    text1: nameMap.HOut24, 
                    value1: out24HValue.value,
                    name: nameMap.HOut24
                })
            }
            if(pipeValue.value){
                result.push({
                    inpatient,
                    unit: 'ml',
                    planned_time,
                    text1: pipeValue.value,
                    name: nameMap.drainage
                })
            }

            if(allergyValue1.value){
                result.push({
                    inpatient,
                    unit: '',
                    planned_time,
                    text1: allergyValue1.value, 
                    name: nameMap.drugAllergy+'1'
                })
            }

            if(allergyValue2.value){
                result.push({
                    inpatient,
                    unit: '',
                    planned_time,
                    text1: allergyValue2.value, 
                    name: nameMap.drugAllergy+2
                })
            }

            if(diGaoXinValue.value){
                result.push({
                    inpatient,
                    unit: '',
                    planned_time,
                    text1: diGaoXinValue.value===0? '上升地高辛':'下降地高辛', 
                    value1: diGaoXinValue.value,
                    name: nameMap.diGaoXin
                })
            }

            if(otherSelectValue.value){
                result.push({
                    inpatient,
                    unit: '',
                    planned_time,
                    text1: otherSelectValue.value, 
                    name: nameMap.other
                })
            }

            if(otherValue.value){
                result.push({
                    inpatient,
                    unit: '',
                    planned_time,
                    text1: otherValue.value, 
                    name: nameMap.otherThings
                })
            }

            if(result.length>0 && climateValue.value){
                result.push({
                    inpatient,
                    unit: '',
                    planned_time,
                    text1: climateValue.value, 
                    name: nameMap.climate
                })
            }
            return result
        },
        submit(){

        },

        handleClickTemperature(index){
            this.temperatureIndex = index
        },

        handleClickPulse(index){
            this.pulseIndex = index
        },

        handleClickBreatheWay(index){
            this.breatheWayIndex = index
        },

        handleClickStoolOptions(index){
            this.stoolOptionsIndex = index
        },

        handleClickUrinateOptions(index){
            this.urinateOptionsIndex = index
        },

        handleClickOther(index){
            this.otherIndex = index
        },
        handleClickDigaoxin(index){
            this.diGaoXinIndex = index
        },

        handleClickEventName(index){
            this.eventNameIndex = index
        },

        handleClickPulseCondition(index){
             this.pulseConditionIndex = index
        },

        handleClickTongueCondition(index){
            this.tongueConditionIndex = index
        },

        handleClickAllergy1(index){
            this.allergy1Index = index
        },

        handleClickAllergy2(index){
            this.allergy2Index = index
        },

        handleClickClimate(index){
            this.climateIndex = index
        },

        handleClickWeight(index){
            this.weightIndex = index
        }
	}
};
</script>
<style lang="scss">

page {
    background: white;
    height: 100%;
}

.header-text {
    margin-left: 40upx;
}
.patient-info {
    position: fixed;
    top: 44px;
    left: 0px;
    z-index: 100;
    width: 100%;
    background-color: white;
    padding: 0px 0px 6px;
}

.input-container {
    margin-top: 66px;
    padding-bottom: 40px;
}

.option-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start; /* 关键属性 */
    margin-bottom: 6px;
    .button {
        margin: 2px 5px 2px 0px;
        max-width: 200px;
        line-height: 30px;
    }
    .button:last-child{
        margin-right: auto;
    }
}
.single-item {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.single-line {
    display: flex;
}
.single-item-right-text {
    margin-left: 2px;
}
.single-item-left-text {
   margin-left: 4px;
}
.operate-button {
    position: fixed;
    bottom: 6px;
    left: 0px;
    z-index: 100;
    width: 100%;
}
</style>