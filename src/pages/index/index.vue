<template>
	<view class="rf-index">
		<!--搜索导航栏-->
		<rf-search-bar
			@search="navToSearch"
			title="扫一扫"
			icon="iconsaomiao"
			@tab="tabClick"
			:categoryList="categoryList"
			:merchantData="merchantData"
			:placeholder="hotSearchDefault"
		/>
		<view class="container">

		</view>
		<!--页面加载动画-->
		<!-- <rfLoading isFullScreen :active="loading"></rfLoading> -->
		<rf-back-top :scrollTop="scrollTop"></rf-back-top>
		<!-- <rf-back-home></rf-back-home> -->
	</view>
</template>

<script>

	import {
		indexList,
		productList
	} from '@/api/product';
	import rfSearchBar from '@/components/rf-search-bar';
	import { mapMutations } from 'vuex';
	export default {
		components: {
			rfSearchBar,
		},
		data() {
			return {
				loading: true,
				scrollTop: 0,
				hotSearchDefault: '请输入关键字',
				merchantData: {}
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onShow() {

		},


		// 下拉刷新
		onPullDownRefresh() {

		},
		// 加载更多
		onReachBottom() {

		},
		methods: {
			// 顶部tab点击
			tabClick({ id }) {
			},

			// 数据初始化
			initData() {

			},

			// 通用跳转
			navTo(route) {
				this.$mRouter.push({ route });
			},

			// 通用跳转
			navToSearch() {
				this.$mRouter.push({
					route: `/pages/index/search/search?data=${JSON.stringify(this.search)}`
				});
			},


			// 首页参数赋值
			initIndexData(data) {

				uni.setStorageSync('search', this.search);
				this.hotSearchDefault = data.search.hot_search_default || '请输入关键字';
				uni.setStorage({
					key: 'hotSearchDefault',
					data: data.search.hot_search_default
				});
			},
		}
	};
</script>
<style lang="scss">
	page {
		background-color: $page-color-base;
	}

	.container {
		padding-top: 70px;
	}
</style>
