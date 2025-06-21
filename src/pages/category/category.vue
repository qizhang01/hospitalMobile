<template>
	<view class="rf-category">
		<!--顶部搜索导航栏-->
		<view class="input-box">
			<view class="iconfont iconzhuyedefuben"  :class="'text-'+themeColor.name" @tap.stop="toHome"></view>
			<input
				@tap.stop="toSearch"
				disabled
				:value="hotSearchDefault || '请输入关键字'"
				style="color:#888;"
				placeholder-style="color:#ccc;"
			/>
			<view class="iconfont iconsousuo2" @tap.stop="toSearch"></view>
		</view>
		<view
			class="category-list"
			@touchmove.stop.prevent="moveHandle"
			v-if="(styleCateType === 'one_two_three_cover' || styleCateType === 'one_two_three_text') && categoryList.length > 0">
			<!-- 左侧分类导航 -->
			<scroll-view scroll-y="true" class="left">
				<view
					class="row"
					v-for="(fItem, fIndex) in categoryList"
					:key="fItem.id"
					:class="[fIndex === showCategoryIndex ? 'on' : '']"
					@tap="showCategory(fIndex)"
				>
					<view class="text">
						<view class="block" :class="'bg-'+themeColor.name"></view>
						{{ fItem.title }}
					</view>
				</view>
			</scroll-view>
			<!--右侧子导航-->
			<scroll-view scroll-y="true" class="right">
				 <view v-if="showCategoryIndex===0">
					<document1></document1>
				 </view>
				<view v-else-if="showCategoryIndex===1">
				  <document2 ></document2>
				</view>
				<view v-else-if="showCategoryIndex===2">
				  <document3 ></document3>
				</view>
			</scroll-view>
		</view>
		<!--加载动画-->
		<!-- <rfLoading isFullScreen :active="loading"></rfLoading> -->
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
					:product="productDetail"
					@toggle="toggleSpec"
					:showBuyBtn="true"
					></rf-attr-content>
			</view>
		</view>
	</view>
</template>
<script>

import { productCate, productList, productDetail, cartItemCount, cartItemCreate } from '@/api/product';
import rfSearchBar from '@/components/rf-search-bar';
import rfAttrContent from '@/components/rf-attr-content';
import document1 from './document1.vue';
import document2 from './document2.vue';
import document3 from './document3.vue';
import { mapMutations } from 'vuex';
import {documentList} from './document.js'
export default {
	components: {
		rfSearchBar,
		rfAttrContent,
		document1,
		document2,
		document3
	},
	data() {
		return {
			hotSearchDefault: '请输入关键字', // 搜索默认关键字
			showCategoryIndex: 0, // 一级菜单高亮显示序号
			categoryList: documentList, // 分类列表
			specClass: 'none', // 规格弹窗
			productDetail: {}, // 商品详情
			search: {},
			cateTop: {}, // 分类通用广告图
			loading: true,
			styleCateType: this.$mSettingConfig.styleCateType,
			errorImage: this.$mAssetsPath.errorImage,
			currentCateId: '',
			categoryProductList: [],
			price: '',
			total_sales: '',
			loadingType: 'more',
			page: 1,
			moneySymbol: this.moneySymbol,
			productLoading: true,
			currentSecondCategoryList: [],
			categoryInvertedIndex: 0
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



		hideSpec() {
			this.specClass = 'hide';
			setTimeout(() => {
				this.specClass = 'none';
			}, 250);
		},

		// 跳转至商品列表
		navTo(route) {
			this.$mRouter.push({ route });
		},
		// 数据初始化
		async initData() {
			this.search = uni.getStorageSync('search') || {};
			this.hotSearchDefault = this.search.hot_search_default || '请输入关键字';
		},

		// 分类切换显示
		showCategory(index) {
			this.showCategoryIndex = index;
		},

		// 跳转至搜索详情页
		toSearch() {
			this.$mRouter.push({
				route: `/pages/index/search/search?data=${JSON.stringify(this.search)}`
			});
		},
	}
};
</script>
<style lang="scss">
page {
	background-color: $color-white;
}
.rf-category {
	background-color: $color-white;
	/*  #ifdef  APP-PLUS  */
	margin-top: calc(20upx + var(--status-bar-height));
	/*  #endif  */
	/*模块分类*/
	.category-list {
		width: 100%;
		background-color: #fff;
		display: flex;
		.left,
		.right {
			position: absolute;
			top: 80upx;
			/*  #ifdef  APP-PLUS  */
			top: calc(80upx + var(--status-bar-height));
			/*  #endif  */
			bottom: 0upx;
		}

		.left {
			width: 24%;
			left: 0upx;
			background-color: $page-color-base;
			.row {
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;

				.text {
					width: 100%;
					position: relative;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					color: #3c3c3c;

					.block {
						position: absolute;
						width: 0upx;
						left: 0;
					}
				}

				&.on {
					height: 100upx;
					background-color: #fff;
					.text {
						font-size: 30upx;
						font-weight: 600;
						color: #2d2d2d;
						.block {
							width: 6upx;
							height: 120%;
							left: 10upx;
						}
					}
				}
			}
		}
		.right {
			width: 76%;
			left: 24%;
			background-color: #fff;
			.second-category {
				z-index: 10;
				white-space: nowrap;
				width: 100%;
				margin: $spacing-sm $spacing-sm $spacing-base;
				.second-category-tag {
					margin-right: $spacing-base;
					padding: 5upx $spacing-lg;
					display: inline-block;
					border-radius: 8upx;
					font-size: $font-sm + 2upx;
				}
				.second-category-normal {
					color: $font-color-dark;
					border: none;
					background-color: $page-color-light;
				}
			}
			.category {
				width: 100%;
				padding: 0 15upx $spacing-base;
				.banner {
					width: 96%;
					margin: 10upx auto 30upx;
					height: 24.262vw;
					border-radius: 10upx;
					overflow: hidden;
					box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.05);
					image {
						width: 100%;
						height: 24.262vw;
					}
				}
				.order-by-wrapper {
					height: 48upx;
					line-height: 48upx;
					display: flex;
					justify-content: space-between;
					margin: $spacing-sm 0;
					font-size: $font-sm + 2upx;
					.order-by {
						display: flex;
						justify-content: center;
						align-items: center;
						.order-by-item {
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: $font-sm + 2upx;
							margin: 0 $spacing-base 0 $spacing-sm;
							color: $font-color-light;
							.iconfont-group {
								margin-top: -2upx;
							}
							.iconfont {
								height: 16upx;
								line-height: 16upx;
								display: block;
								margin-left: 6upx;
								font-weight: 550;
								font-size: $font-sm - 4upx;
							}
						}
					}
				}
				.list {
					margin-top: $spacing-base;
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					.box {
						width: calc(71.44vw / 3);
						margin-bottom: $spacing-lg;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-wrap: wrap;
						image {
							width: 64%;
							height: calc(71.44vw / 3 * 0.64);
						}
						.text {
							margin-top: 8upx;
							width: 100%;
							display: flex;
							justify-content: center;
							font-size: 26upx;
						}
						.category-tag {
							width: 100%;
							display: flex;
							justify-content: center;
							align-items: center;
							padding: $spacing-sm;
							font-size: $font-sm + 2upx;
							margin-right: $spacing-base;
							color: $font-color-dark;
							background-color: $page-color-base;
							border-radius: 6upx;
						}
					}
				}
				.second-category-text {
					display: flex;
					justify-content: space-between;
				}
				.no-data {
					margin: 48upx 0;
					color: $font-color-light;
					display: flex;
					justify-content: center;
					align-items: center;

					.iconfont {
						margin-right: 20upx;
						font-size: $font-lg + 16upx;
					}
				}
			}
		}
	}

	.category-product-list {
		margin-bottom: 15upx;
		padding-bottom: 15upx;
		border-bottom: 1upx solid rgba(0, 0, 0, 0.08);
	}
	.category-product-list:last-child {
		border-bottom: none;
		background-color: #007aff;
	}

	.input-box {
		height: 60upx;
		position: relative;
		display: flex;
		align-items: center;
		margin: 10upx 20upx;
		.iconfont {
			width: 60upx;
			font-size: 48upx;
			font-weight: 500;
		}
		.iconsousuo2 {
			z-index: 999;
			display: flex;
			align-items: center;
			position: absolute;
			top: 0;
			right: 0;
			width: 60upx;
			height: 60upx;
			font-size: 34upx;
			color: #c0c0c0;
		}
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
}
</style>
