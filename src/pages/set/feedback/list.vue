<template>
	<view class="feedback-list">
		<view class="add-btn-wrapper">
			<button class="add-btn" :class="'bg-' + themeColor.name" @tap="">
				意见反馈
			</button>
		</view>
	</view>
</template>

<script>


export default {
	components: {

	},
	data() {
		return {

		};
	},

	// 下拉刷新
	onPullDownRefresh() {

	},
	// 加载更多
	onReachBottom() {

	},

	methods: {

	}
};
</script>

<style lang="scss">
page {
	background-color: $page-color-base;
}

.feedback-list {
	position: relative;
}
</style>
