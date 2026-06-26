<template>
	<view class="rf-product-list">
		<view class="rf-product-list-container">
			<block>
				<view
					class="rf-product-item"
				>
                    <view class="rf-title">
                            <text>{{patientMedicineInfo.enter_at.slice(0,10)}}</text>
                            <text>{{supply.get(patientMedicineInfo.supply)}}</text>
                            <text>{{patientMedicineInfo.freq}}</text>					
					</view>
                    <view class="rf-card-topic text-red-color" v-for="(item, index) in patientMedicineInfo.orders" :key="item.id">
						<view class="line-1">
							<text class="sketch in1line">{{ item.name }}</text>
							<text class="sketch in1line">{{ item.spec }}</text>	
						</view>
						<view class="line-2">
                            <text class="small-text">{{ item.dosage }} {{ item.dosage_unit }}</text>
							<text class="doctor-text">{{ patientMedicineInfo.doctor }}</text>	
						</view>	

					</view>
     
				</view>
			</block>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'rfCard',
    computed: mapState(['supply']),
	props: {
		patientMedicineInfo: {
			type: Object,
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
    padding:4px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    .line-1 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .line-2 {
        display: flex;
        flex-direction: row;
        .doctor-text {
            margin-left: 100upx;
        }
    }
}
.rf-product-item {
  padding: 6px 0px;
}
.rf-title {
    background-color: #6699CC;
}
.rf-product-list .rf-title  {
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 10upx;
}
</style>
