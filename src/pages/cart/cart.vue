<template>
	<view class="cart">
		<view class="empty">
			<text class="iconfont icongouwuche" :class="'text-'+themeColor.name"></text>
			<text >空空如也</text>
		</view>
		<!-- 规格-模态层弹窗 -->
		<view
			class="popup spec show"
			v-if="specClass === 'show'"
			@touchmove.stop.prevent="stopPrevent"
			@tap="hideSpec"
		>
			<!-- 遮罩层 -->
			<view class="mask" @tap="hideSpec"></view>
			<view class="layer" @tap.stop="stopPrevent">
				<rf-attr-content
					:isSelectedNum="false"
					:product="productDetail"
					@toggle="toggleSpec"
					></rf-attr-content>
			</view>
		</view>
	</view>
</template>

<script>

export default {
  components: {  },
	data() {
		return {
		}
	},
	onPageScroll(e) {
		// 兼容iOS端下拉时顶部漂移

	},
	// 下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh() {

	},

	methods: {

		// 获取产品详情
		async getProductDetail(row) {
			// this.currentSkuId = row.sku_id;
			// await this.$http
			// 	.get(`${productDetail}`, {
			// 		id: row.product_id
			// 	})
			// 	.then(async r => {
			// 		this.productDetail = r.data;
			// 		this.productDetail.sku_name = row.sku_name;
			// 		this.specClass = 'show';
			// 	});
		},

		stopPrevent() {},


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

.popup .layer {
	// #ifndef H5
	bottom: 0;
	// #endif
}
</style>
