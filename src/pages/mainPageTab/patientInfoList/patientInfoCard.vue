<template>
    <view
        class="patient-info-item"
        hover-class="hover"
        :hover-start-time="150"
    >   
        <view class="patient-info-item_top">
            <view class="patient-info-content column-1">
                <text class="rf-bolder">{{ patientInfo.BedNo }} 床</text>
            </view>
            <view class="patient-info-content column-2">
                <text class="rf-bolder">{{ patientInfo.Name }}</text>
                <text >{{patientInfo.Age}}岁|{{ patientInfo.PhysiSexName }}</text>
            </view>
            <view class="patient-info-content column-3">
                <view class="patient-info-status">
                    <text class="item-info rf-bolder">{{ NursingClass}}级</text>
                    <image class="character-icon item-info" :src="noMoney" v-if="patientInfo.ArrearFlag"></image>
                    <image class="character-icon item-info" :src="finish" style="width: 22px; height: 22px;" ></image>
                    <image class="character-icon item-info" :src="newPatient" v-if="patientInfo.isNewPatient"></image>
                    <image class="character-icon item-info" :src="allergy" v-if="patientInfo.Allergy" ></image>
                    <image class="character-icon item-info" :src="notes" v-if="patientInfo.hasNewDoctorAdvice" style="width: 18px; height: 18px;"></image>
                    <image class="character-icon item-info" :src="highTemperature" v-if="patientInfo.isHighTemperature"></image>
                    <image class="character-icon item-info" :src="operation" v-if="patientInfo.SurgeryHistory"></image>
                </view>
                <text >#{{ patientInfo.PatientId }}</text>
            </view>
            <view class="icon-action">
                <text class="iconfont iconxiala" @tap.stop="toggleOpen"></text>
            </view>
        </view>
        <view class="patient-info-item_down" v-if="isShowDetail">
            <view class="row">
                <view class="row-item_1">
                    <text class="inline">医保:</text>
                    <text class="inline rf-bolder">{{ patientInfo.ChargeTypeName }}</text>
                </view>
                <view>
                    <text class="inline">医生:</text>
                    <text class="inline rf-bolder">{{ patientInfo.ReceptTreatDrName }}</text>
                </view>
            </view>
            <view class="">
                <text class="inline">入院:</text>
                <text class="inline rf-bolder">{{ AdmissionWardTime }}</text>
            </view>
            <view class="">
                <text class="inline">诊断:</text>
                <text class="inline rf-bolder">{{ patientInfo.DiagnosisName }}</text>
            </view>
            <view class="">
                <text class="inline">住院事件:</text>
                <text class="inline rf-bolder">{{ patientInfo.OutcomeName }}</text>
            </view>
        </view>
    </view>
</template>


<script>
import {getNurseClass} from '@/utils/util'

export default {
	name: 'rfProductList',
	props: {
        patientInfo: {
            type: Object,
            default(){return {}}
        },
	},
	components: {

	},
    computed: {
        NursingClass() {
            return getNurseClass(this.patientInfo.NursingClass)
        },
        AdmissionWardTime() {
            return this.patientInfo.AdmissionWardTime ? this.patientInfo.AdmissionWardTime.replace(/[TZ]/g, ' ') : ''
        }
    },
	data() {
		return {
            isShowDetail: false,
            noMoney: this.$mAssetsPath.noMoney,
            finish: this.$mAssetsPath.finish,
            newPatient: this.$mAssetsPath.newPatient,
            highTemperature: this.$mAssetsPath.highTemperature,
            notes: this.$mAssetsPath.notes,
            operation: this.$mAssetsPath.operation,
            allergy: this.$mAssetsPath.allergy,
        };
	},
	filters: {

	},
	methods: {
		// 跳转详情
		navTo(route) {
			this.$mRouter.push({ route });
		},
        
        toggleOpen(){
            this.isShowDetail = !this.isShowDetail
        }
	}
};
</script>


<style lang="scss">
	page {
		background: $page-color-base;
	}
.patient-info-item {
    border-bottom: 1px solid #909399;
}
.patient-info-item_top{
    display: flex;
    align-items: center;
    padding: 10upx 10upx;
}
.content-item {
    display: flex;
    align-items: center;
}
.patient-info-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .patient-info-status {
        display: flex;
        align-items: center;
        .item-info{
            margin-right: 4px;
        }
        .character-icon {
            height: 20px; 
            width: 20px;
        }
    }
}
.column-1 {
    width: 150upx;
}
.column-2 {
    width: 180upx;
}
.column-3 {
    width: 350upx;
}
.inline {
    margin-right: 10upx;
}
.patient-info-item_down{
    padding-left: 120px;
}
.patient-info-item_down .row {
    display: flex;
    flex-direction: row;
}
.row-item_1 {
    margin-right: 40upx;
}

</style>