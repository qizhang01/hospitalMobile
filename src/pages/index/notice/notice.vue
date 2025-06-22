<template>
	<view clas="notice">
		暂无商城公告
		<!--加载动画-->
		<!-- <rfLoading isFullScreen :active="loading"></rfLoading> -->
	</view>
</template>

<script>
export default {
	components: {  },
	data() {
		return {

		};
	},

	// 下拉刷新
	onPullDownRefresh() {
		//
	},
	// 加载更多
	onReachBottom() {

	},
	onLoad() {

	},
	methods: {
	
	}
};
</script>

<style lang="scss">
page {
	background-color: $page-color-base;
	padding-bottom: 30upx;
}

</style>
