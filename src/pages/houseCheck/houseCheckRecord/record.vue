<template>
	<view class="coupon-center">
        <view class="">
             
        </view>
        <view class="content">

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
  

		// 获取收货地址列表
		async getCouponList() {
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
</style>