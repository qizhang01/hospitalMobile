<template>
	<view class="input-box">
        <input
            @tap.stop=""
            disabled={false}
            :value="hotSearchDefault || '请输入关键字'"
            style="color:#888;"
            placeholder-style="color:#ccc;"
        />

		<!--加载动画-->
		<!-- <rfLoading isFullScreen :active="loading"></rfLoading> -->
		<!-- 规格-模态层弹窗 -->
	</view>
</template>

<script>
export default {
	components: {

	},
	data() {
		return {
hotSearchDefault: ''
		};
	},
	computed: {
	},
	filters: {

	},
	// 每次页面显示 执行该方法
	onLoad() {

	},
	methods: {

	}
};
</script>
<style lang="scss">
    page {
        background-color: $color-white;
    }
    .input-box {
		height: 60upx;
		position: relative;
		display: flex;
		align-items: center;
		margin: 10upx 20upx;

		input {
			flex: 1;
			height: 60upx;
			background-color: #f5f5f5;
			padding-left: 28upx;
			border-radius: 30upx;
			color: #888;
			font-size: 28upx;
		}
	}
</style>
