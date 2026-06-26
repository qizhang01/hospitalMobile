<template>
	<view class="rf-product-list">
		<view class="rf-product-list-container">
			<block>
				<view
					class="rf-product-item"
				>
                <block v-for="(item, index) in patientMedicineInfo.medicines" :key="index">
                    <view class="rf-card-topic text-red-color">
						<view>
							<text class="sketch in1line">{{ item.order_name }}</text>
							<text class="sketch in1line small-text">{{ item.quantity }}{{ item.unit }}</text>
						</view>
						<view>
                            <text class="sketch in1line small-text">{{ item.dosage }} * {{ item.dosage_unit }}</text>	
						</view>	
					</view>
                </block>
                <view class="rf-pro-content">
                        <view class="rf-pro-pay">
                            <text>计划时间: {{patientMedicineInfo.plan_time.slice(0,10)}}</text>
                            <text>{{patientMedicineInfo.supply}}</text>
                            <text>{{patientMedicineInfo.freq}}</text>
                            <text>{{patientMedicineInfo.workflow}}</text>
                        </view>
                        <view class="rf-pro-pay">
                            <text>开始时间: {{patientMedicineInfo.start_at}}</text>
                            <text>{{patientMedicineInfo.execute_by}}</text>
                        </view>
                        <view class="rf-pro-pay">
                            <text>结束时间: {{patientMedicineInfo.enter_at}}</text>
                            <text>{{patientMedicineInfo.stop_by}}</text>
                        </view>
                    
                </view>
				</view>
			</block>
		</view>
	</view>
</template>
<script>

export default {
	name: 'rfCard',
	props: {
		patientMedicineInfo: {
			type: Object,
			default() {
				return {};
			}
		},

		bottom: {
			type: Number,
			default: 0
		}
	},
	components: {
		
	},
	data() {
		return {

		};
	},

	methods: {

	}
};
</script>

<style>
.rf-card-topic{
    display: flex;
    justify-content: space-between;
    padding:4px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.rf-product-item {
  padding: 6px 0px;
}
.rf-pro-content {
    background-color: #6699CC;
}
.rf-product-list .rf-pro-content .rf-pro-pay {
    color: white;
}
</style>
