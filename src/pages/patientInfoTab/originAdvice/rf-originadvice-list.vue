<template>
	<view class="rf-product-list">
		<view class="rf-product-list-container">
			<block>
				<view
					class="rf-product-item"
				>
                    <view class="rf-card-topic text-red-color" v-for="(item, index) in patientMedicineInfo" :key="item.id">
						<view>
							<text class="sketch in1line">{{ item.name }}</text>
							<text class="sketch in1line small-text">{{ item.dosage }} {{ item.dosage_unit }}</text>
						</view>
						<view>
							<text class="sketch in1line">{{ item.spec }}</text>	
                            <text class="sketch in1line">{{ item.stop_by }}</text>	
						</view>	

					</view>
     
					<view class="rf-pro-content">
							<view class="rf-pro-pay">
								<text>计划时间: {{patientMedicineInfo[0].planTime}}</text>
                                <text>{{patientMedicineInfo[0].type}}</text>
                                <text>{{patientMedicineInfo[0].freq}}</text>
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
			type: Array,
			default() {
				return [];
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
