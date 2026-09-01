<template>
    <view class="container">
            <view class="patient-info">
                <uni-section title="当前患者:" type="line">
                    <view class="uni-list-cell-db">
                        <picker @change="patientChange" :value="patientIndex" :range="patientRange">
                            <view v-if="patientInfo" style="margin-left: 6px;">
                                <text class="item rf-bolder">{{ patientInfo.Name }} |</text>
                                <text class="item rf-bolder">{{ patientInfo.BedNo }}床 |</text>
                                <text class="item rf-bolder">{{ patientInfo.PhysiSexName }} |</text>
                                <text class="item rf-bolder">{{ getAgeByBirthdate(patientInfo.BirthDate) }} |</text>
                                <text>MRN {{ patientInfo.Mrn }}</text>
                            </view>
                            <view v-else>
                                请选择患者
                            </view>
                        </picker>

                    </view>
                </uni-section>
                <uni-section title="选择时间" type="line">
                    <uni-datetime-picker type="date" :clear-icon="false" v-model="timeValue" @maskClick="maskClick" />
                    <!-- <uni-data-select
                        v-if="range && range.length>0"
                        v-model="timePeriodValue"
                        :localdata="range"
                        @change="change"
                        :clear="false"
                    ></uni-data-select> -->
                    <view class="uni-list">
                        <view class="uni-list-cell">
                            <view class="uni-list-cell-left">
                                当前选择时段
                            </view>
                            <view class="uni-list-cell-db">
                                <picker @change="change" :value="timePeriodValue" :range="range">
                                    <view class="uni-input">{{range[timePeriodValue]}}</view>
                                </picker>
                            </view>
                        </view>
                    </view>
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
                            <uni-easyinput v-model="painValue1" placeholder="疼痛评分" type="number" max="9"></uni-easyinput>
                        </view>
                        <view class="single-item">
                            <uni-easyinput v-model="painValue2" placeholder="疼痛缓解" type="number" max="9"></uni-easyinput>
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
                            <uni-easyinput v-model="pulseConditionValue" placeholder="请输入内容"></uni-easyinput>
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
                    <view class="single-line">
                        <view class="single-item">
                            <uni-easyinput v-model="tongueValue" placeholder="请输入内容"></uni-easyinput>
                        </view>
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
                    <view class="single-line">
                        <view class="single-item">
                            <uni-easyinput v-model="allergy1Value" placeholder="请输入内容" ></uni-easyinput>
                        </view>
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
                    <view class="single-line">
                        <view class="single-item">
                            <uni-easyinput v-model="allergy2Value" placeholder="请输入内容" ></uni-easyinput>
                        </view>
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
                            <uni-easyinput v-model="otherValue" placeholder="请输入内容" ></uni-easyinput>                               
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
import {vitalsUrl, eventUrl, getInpatientTasksById} from '@/api/login'

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
    computed: {
        ...mapState(['cachePatientsList']),
        patientRange(){
            return this.cachePatientsList.map(item=>item.BedNo+'---'+item.Name)
        }
    },

	data() {
		return {
            patientInfo:  null,
            medicines: [],
            loading: true,
            timePeriodValue: 1, 
            range: [ '02:00',
                    '06:00',
                    '10:00',
                    '14:00',
                    '18:00',
                    '22:00'
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
            stoolOptionsIndex: -1,
            urinateOptionsIndex: -1,
            allergy1Index: 0,
            allergy2Index: 0,
            weightIndex: 0,
            climateIndex: -1,
            pulseConditionIndex: -1,
            tongueConditionIndex: -1,
            eventNameIndex: -1,
            otherIndex: 0,
            diGaoXinIndex: 0,
            patientIndex: 0,

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
            otherValue: '',
            pipeValue: '',
            erectionHeartRateValue: '',
            tongueValue: '',
            pulseConditionValue: '',
            allergy1Value: '',
            allergy2Value: '',

            timeValue: this.getStandTime(new Date())
		};
	},

	onLoad(options) {
        this.patientInfo = JSON.parse(options.patientInfo)
        if(this.patientInfo)
        this.getInfo(this.patientInfo.PatientId)
	},

	methods: {
        
        getStandTime(day){
             return `${day.getFullYear()}-${this.get2Digtal(day.getMonth()+1)}-${this.get2Digtal(day.getDate())}`
        },

        get2Digtal(month){
            if(month<10){
                return `0${month}`
            }
            return `${month}`
        },

        async getInfo(inpatient){
            this.loading = true
            const res = await this.$http.get(getInpatientTasksById(inpatient))
            if(res){
                this.medicines = res
                this.loading = false
            }
        },

        change(e) {
            this.timePeriodValue = e.detail.value
        },

        patientChange(e) {
            this.patientInfo = this.cachePatientsList[e.detail.value]
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
            const nameMap = {
                temperatureName: '体温',
                coolTemperatureName: '降温后',
                pulseName: '脉搏',
                breatheName: '呼吸',
                stoolName: '大便',
                bloodPressureName: '血压',
                other: '其他',
                otherThings: '其他事项',
                pulseCondition: '脉象',
                tongueCondition: '舌象',
                weight: '体重',
                heartRate: '心率',
                score: '疼痛得分',
                urinate: '小便',
                HIn24: '24H入量',
                HOut24: '24H出量',
                drainage: '引流量',
                drugAllergy: '药物过敏',
                jumpHeartValue: '起搏心率',
                climate: '节气',
                diGaoXin: '地高辛',
                event: '事件'
            }
            let planned_time = this.timeValue+ 'T'+ this.range[this.timePeriodValue] +':00+08:00'

            const inpatient = this.patientInfo.PatientId
            const result = []

            // stoolOptionsValue: '',
            // urinateOptionsValue: '',

            if(this.temperatureValue1){
                const obj1 = {
                    inpatient,
                    unit: '℃',
                    planned_time,
                    text1: this.temperature[this.temperatureIndex], 
                    value1: Number(this.temperatureValue1),
                    name: nameMap.temperatureName
                }
                result.push(obj1)
            }

            if(this.temperatureValue2){
                const obj2 = {
                    inpatient,
                    unit: '℃',
                    planned_time,
                    text1: this.temperature[this.temperatureIndex], 
                    value1: Number(this.temperatureValue2),
                    name: nameMap.coolTemperatureName
                }
                result.push(obj2)
            }

            if(this.pulseValue){
                result.push({
                    inpatient,
                    unit: '次/分',
                    planned_time,
                    value1: Number(this.pulseValue),
                    name: nameMap.pulseName
                })
            }
            if(this.breatheWayValue){
                result.push({
                    inpatient,
                    unit: '次/分',
                    planned_time,
                    text1: this.breatheWay[this.breatheWayIndex], 
                    value1: Number(this.breatheWayValue),
                    name: nameMap.breatheName
                })
            }

            if(this.stoolOptionsValue){
                result.push({
                    inpatient,
                    unit: '次/分',
                    planned_time,
                    text1: this.stoolOptionsValue, 
                    name: nameMap.stoolName
                })
            }
            if(this.urinateOptionsValue){
                result.push({
                    inpatient,
                    unit: 'ml',
                    planned_time,
                    text1: this.urinateOptionsValue, 
                    name: nameMap.urinate
                })
            }
            

            if(this.bloodPressureValue1){
                result.push({
                    inpatient,
                    unit: 'mmHg',
                    planned_time,
                    value1: Number(this.bloodPressureValue1),
                    value2: Number(this.bloodPressureValue2),
                    name: nameMap.bloodPressureName
                })
            }
            if(this.heartRateValue){
                result.push({
                    inpatient,
                    unit: '次/分',
                    planned_time,
                    value1: this.heartRateValue,
                    name: nameMap.heartRate
                })
            }


            if(this.painValue1){
                result.push({
                    inpatient,
                    unit: '',
                    planned_time,
                    value1: Number(this.painValue1),
                    name: nameMap.score
                })
            }

            if(this.painValue2){
                result.push({
                    inpatient,
                    unit: '',
                    planned_time,
                    value1: Number(this.painValue2),
                    name: '缓解后疼痛得分'
                })
            }

            if(this.pulseConditionValue){
                result.push({
                    inpatient,
                    unit: '',
                    planned_time,
                    text1: this.pulseConditionValue, 
                    name: nameMap.pulseCondition
                })
            }

            if(this.tonguevalue){
                result.push({
                    inpatient,
                    unit: '',
                    planned_time,
                    text1: this.tonguevalue, 
                    name: nameMap.tongueCondition
                })
            }

            if(this.weightValue){
                result.push({
                    inpatient,
                    unit: 'kg',
                    planned_time,
                    value1: Number(this.weightValue),
                    name: nameMap.weight
                })
            }

            if(this.erectionHeartRateValue){
                result.push({
                    inpatient,
                    unit: '次/分',
                    planned_time,
                    value1: Number(this.erectionHeartRateValue),
                    name: nameMap.jumpHeartValue
                })
            }


            if(this.in24HValue){
                result.push({
                    inpatient,
                    unit: 'ml',
                    planned_time,
                    text1: nameMap.HIn24, 
                    value1: this.in24HValue,
                    name: nameMap.HIn24
                })
            }
            if(this.out24HValue){
                result.push({
                    inpatient,
                    unit: 'ml',
                    planned_time,
                    value1: this.out24HValue,
                    name: nameMap.HOut24
                })
            }
            if(this.pipeValue){
                result.push({
                    inpatient,
                    unit: 'ml',
                    planned_time,
                    text1: this.pipeValue,
                    name: nameMap.drainage
                })
            }

            if(this.allergy1Value){
                result.push({
                    inpatient,
                    unit: '',
                    planned_time,
                    text1: this.allergy1Value, 
                    name: nameMap.drugAllergy+'1'
                })
            }

            if(this.allergy2Value){
                result.push({
                    inpatient,
                    unit: '',
                    planned_time,
                    text1: this.allergy2Value,
                    name: nameMap.drugAllergy+2
                })
            }

            if(this.diGaoXinIndex>0){
                result.push({
                    inpatient,
                    unit: '',
                    planned_time,
                    value1: Number(this.diGaoXinIndex) -1,
                    name: nameMap.diGaoXin
                })
            }

            if(this.otherValue){
                result.push({
                    inpatient,
                    unit: '',
                    planned_time,
                    text1: this.otherValue, 
                    name: nameMap.other
                })
            }

            // if(otherValue.value){
            //     result.push({
            //         inpatient,
            //         unit: '',
            //         planned_time,
            //         text1: otherValue.value, 
            //         name: nameMap.otherThings
            //     })
            // }

            if(this.climateIndex>-1){
                result.push({
                    inpatient,
                    unit: '',
                    planned_time,
                    text1: this.climate[this.climateIndex], 
                    name: nameMap.climate
                })
            }
            return result
        },

        async submit(){
            const params = this.generateBody()
            
            if(Object.keys(params).length>0 || this.eventNameIndex>-1) {
                this.loading = true
                if(Object.keys(params).length>0){
                    this.$http.put(vitalsUrl, params).then(res=>{
                        this.$mHelper.toast('体征提交成功');
                    })
                }
                if(this.eventNameIndex>-1){
                    await this.saveEvent()
                }
                this.loading = false
            }
        },

        saveEvent(){
            const inpatient = this.patientInfo.PatientId
            let planned_time = this.timeValue+ 'T'+ this.range[this.timePeriodValue] +':00+08:00'
            const params = {
                inpatient,
                unit: '',
                start_at: planned_time,
                text1: this.eventName[this.eventNameIndex], 
                name: '事件'
            }

            this.$http.post(eventUrl, params).then(res=>{
                this.$mHelper.toast('事件提交成功');
            })
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
            this.stoolOptionsValue = this.stoolOptionsValue + this.stoolOptions[index]
        },

        handleClickUrinateOptions(index){
            this.urinateOptionsIndex = index
            this.urinateOptionsValue = this.urinateOptionsValue + this.urinateOptions[index]
        },

        handleClickOther(index){
            this.otherIndex = index
            if(index==0){
                this.otherValue = ''
            }else{
                this.otherValue = this.other[index]
            }
        },

        handleClickDigaoxin(index){
            this.diGaoXinIndex = index
        },

        handleClickEventName(index){
            this.eventNameIndex = index
        },

        handleClickPulseCondition(index){
            this.pulseConditionIndex = index
            this.pulseConditionValue = this.pulseCondition[this.pulseConditionIndex]
        },

        handleClickTongueCondition(index){
            this.tongueConditionIndex = index
            this.tongueValue = this.tongueCondition[this.tongueConditionIndex]  
        },

        handleClickAllergy1(index){
            this.allergy1Index = index
            if(index==0){
                this.allergy1Value = ''
            }else {
                this.allergy1Value = this.allergy[this.allergy1Index]
            }
        },

        handleClickAllergy2(index){
            this.allergy2Index = index
            if(index==0){
                this.allergy2Value = ''}
            else {
                this.allergy2Value = this.allergy[this.allergy2Index]
            }
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
    top: 0px;
    left: 0px;
    z-index: 100;
    width: 100%;
    background-color: white;
    padding: 0px 0px 6px;
}

.input-container {
    margin-top: 150px;
    padding-bottom: 20px;
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
.uni-list {
    margin-top: 6px;
}
</style>