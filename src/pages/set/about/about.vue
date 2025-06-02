<template>
	<view class="about">
		<view>
			<text >本系统由</text>
			<text class="cell-tit">上海紫露网络系统有限公司</text>
			<text >研发</text>
		</view>
	</view>
</template>
<script>

export default {
	components: { },
	data() {
		return {
			navList: [
			],
			appName: this.$mSettingConfig.appName
		};
	},
	onLoad() {
		this.initData();
	},
	methods: {
		// 初始化数据
		initData() {
			uni.setNavigationBarTitle({ title: `关于${this.appName}` });
		},
	}
};
</script>
<style lang="scss">
page {
	position: relative;
	background-color: #f5f5f5;
}
.about {
	padding: 20upx 0;
	// background-color: white;
	text-align: center;
}

.cell-tit{
   color: blue;
}
</style>
