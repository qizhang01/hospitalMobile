<template>
	<view class="container">
		<uni-section title="请选择日期和时间" type="line"></uni-section>
		<view class="example-body">
			<uni-datetime-picker type="datetime" v-model="datetimesingle" @change="changeLog" />
		</view>
	</view>
</template>

<script>
import uniDataSelect from '@dcloudio/uni-ui/lib/uni-data-select/uni-data-select.vue'
import uniSection from '@dcloudio/uni-ui/lib/uni-section/uni-section.vue'
import uniEasyinput from '@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.vue'
import uniDatetimePicker from '@dcloudio/uni-ui/lib/uni-datetime-picker/uni-datetime-picker.vue'
export default {
  components: { 
	uniSection,
	uniDatetimePicker
  },
	data() {
		return {
			datetimesingle: ''
		}
	},
	onPageScroll(e) {
		// 兼容iOS端下拉时顶部漂移

	},
	methods: {
		changeLog(e) {
			console.log('change事件:', e);
		},

		// 数据初始化
		initData() {
		},
		// 通用跳转
		navTo(route) {
			// if (!this.$mStore.getters.hasLogin) {
			// 	uni.setStorageSync('backToPage', JSON.stringify({ route: '/pages/cart/cart' }));
			// }
			// this.$mRouter.push({ route });
		},

		// 控制左滑删除效果
		touchStart(index, event) {
			// 多点触控不触发
		},
		touchMove(index, event) {

		},
		touchEnd(index, $event) {

		},

	}
};
</script>
<style lang="scss">
page {
	background-color: #fff;
}
.container {
	margin: 0 16upx;
}
</style>
