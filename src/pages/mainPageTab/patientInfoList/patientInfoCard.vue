<template>
    <view
        class="patient-info-item"
        hover-class="hover"
        :hover-start-time="150"
    >   
        <view class="patient-info-item_top">
            <view class="patient-info-content">
                <text >{{ patientInfo.BedNo }} 床</text>
                <!-- <view class="triangle-wrapper">
                    <image class="triangle-tag" :src="item | filterTagName"></image>
                </view> -->
            </view>
            <view class="patient-info-content">
                <text >{{ patientInfo.Name }}</text>
                <text >35</text>
            </view>
            <view class="patient-info-content">
                <text class="">{{ patientInfo.NursingClass }}级</text>
                <text >#{{ patientInfo.PatientId }}</text>
            </view>
            <view class="icon-action">
                <text class="iconfont iconxiala" @tap.stop="toggleOpen"></text>
            </view>
        </view>
        <view class="patient-info-item_down" v-if="isShowDetail">
            <view class="row">
                <view class="row-item_1">
                    <text class="inline">医保</text>
                    <text class="inline">{{ patientInfo.ChargeTypeName }}</text>
                </view>
                <view>
                    <text class="inline">医生</text>
                    <text class="inline">{{ patientInfo.ReceptTreatDrName }}</text>
                </view>
            </view>
            <view class="">
                <text class="inline">入院</text>
                <text class="inline">{{ patientInfo.AdmissionTime }}</text>
            </view>
            <view class="">
                <text class="inline">诊断</text>
                <text class="inline">{{ patientInfo.DiagnosisName }}</text>
            </view>
            <view class="">
                <text class="inline">住院事件</text>
                <text class="inline">{{ patientInfo.OutcomeName }}</text>
            </view>
        </view>
    </view>
</template>


<script>

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
	data() {
		return {
            isShowDetail: false
		};
	},
	filters: {

	},
	methods: {
		// 跳转详情
		navTo(route) {
			this.$mRouter.push({ route });
		},
		// 获取产品详情
		async getProductDetail(row) {
			// await this.$http
			// 	.get(`${productDetail}`, {
			// 		id: row.id
			// 	})
			// 	.then(async r => {
			// 		this.productDetail = await r.data;
			// 		this.productDetail.sku_name = row.sku_name;
			// 		this.specClass = 'show';
			// 	});
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
    border-bottom: 1px solid #606266;
}
.patient-info-item_top{
    display: flex;
    align-items: center;
    padding: 10upx 0upx;
}
.content-item {
    display: flex;
    align-items: center;
}
.patient-info-content {
    display: flex;
    flex-direction: column;
    padding: 0upx 50upx;
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
.icon-action {
    margin-left: 60upx;
}
</style>