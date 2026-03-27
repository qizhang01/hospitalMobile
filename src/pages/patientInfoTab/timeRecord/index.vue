<template>
	<view class="coupon-center">
        <view class="header-text">
            <text>排药 - 加药 - 执行 - 继续执行</text>
        </view>
        <view class="progress-info">
            <text>注射用头孢他定/氯化钠注射液(国痰)</text>
            <text>2g</text>
        </view>
        <view class="drug-info">
            <text>注射用头孢他定/氯化钠注射液(国痰)</text>
            <text>2g</text>
        </view>
        <view class="patient-info">
            <text>101床|男|72|MRN1985167</text>
        </view>
	</view>
</template>

<script>
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import { mapMutations } from 'vuex';
import {formatTime} from '@/utils/util.js'

let timer=null
export default {
	components: {
		rfLoadMore,
	},
	data() {
		return {

		};
	},
    computed: {
    },

    onShow() {

    },

	onLoad(options) {

	},

    onHide() {

    },

    onUnload() {

    },
    
    beforeUnmount() {

	},

	methods: {
		...mapMutations(['setPatientInfo']),
		// 数据初始化
		initData() {
			
		},
  
		navTo(route) {
			// this.$mRouter.push({ route });
		},

	}
};
</script>
<style lang="scss">

    page {
        background: white;
    }

.tip-text {
    color: grey;
}
.header-text {
    text-align: center;
    padding: 20upx 0;
}

.progress-info,
.patient-info,
.drug-info {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid gray;
    height: 90upx;
    padding: 0 30upx;
    align-items: center;
}
.progress-info {
    background-color: rgb(105, 98, 98, 0.3);
}
</style>