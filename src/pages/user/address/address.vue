<template>
	<view class="container product-list">
		<view class="rf-header-screen">
			<view class="rf-screen-top">
				<view class="rf-top-item rf-icon-ml" :class="[tabIndex==0? `text-${themeColor.name} rf-bold`:'']" data-index="0" @tap="screen">
					<text>{{selectedName}}</text>
					<text class="iconfont" :class="selectH>0?'iconshang':'iconxia'" :style="{color: tabIndex==0? themeColor.color:'#444'}"></text>
				</view>
				<view class="rf-top-item" :class="[tabIndex == 1?`text-${themeColor.name} rf-bold`:'']" @tap="screen" data-index="1">
					销量
				</view>
				<view class="rf-top-item" @tap="screen" data-index="2">
					<text class="iconfont" :class="isList>0? 'iconliebiaoqiehuan':'iconfenlei'"></text>
				</view>
				<view class="rf-top-item rf-icon-ml" @tap="screen" data-index="3">
					<text>筛选</text>
					<!--<rf-icon name="screen" :size="12" color="#333" rf-icon-class="rf-ml" :bold="true"></rf-icon>-->
				</view>
				<!--下拉选择列表--综合-->
				<view class="rf-dropdownlist" :class="[selectH>0?'rf-dropdownlist-show':'']" :style="{height:selectH+'upx'}">
					<view class="rf-dropdownlist-item rf-icon-middle" :class="[item.selected?'rf-bold':'']" v-for="(item,index) in dropdownList" :key="index" @tap.stop="dropdownItem" :data-index="index">
						<text class="rf-ml rf-middle">{{item.name}}</text>
						<text class="iconfont icongouxuan" :class="'text-' + themeColor.name" v-if="item.selected"></text>
					</view>
				</view>
				<view class="rf-dropdownlist-mask" :class="[selectH>0?'rf-mask-show':'']" @tap.stop="hideDropdownList"></view>
				<!--下拉选择列表--综合-->
			</view>
		</view>
		<view class="product-list-wrapper">
				<rf-product-list :list="productList" :style="{paddingTop: 100 + 'upx' }"></rf-product-list>
		</view>
		<!-- <rf-load-more
			:status="loadingType"
			v-if="productList.length > 0"
		></rf-load-more> -->
		<!-- <rf-empty
			:info="errorInfo || '该分类暂无商品'"
			v-if="productList.length === 0 && !loading"
		></rf-empty> -->
		<!--页面加载动画-->
		<!-- <rfLoading isFullScreen :active="loading"></rfLoading> -->
	</view>
</template>
<script>
	import uniDrawer from '@/components/uni-drawer/drawer';
	import rfTopDrawer from '@/components/rf-top-drawer';
	import rfAttrContent from '@/components/rf-attr-content';
	import rfProductList from '@/components/rf-product-list';
	import rfLoadMore from '@/components/rf-load-more/rf-load-more';
	import medicineList from './infoList.js'
	/* eslint-disable */
	export default {
		components: {
			uniDrawer,
			rfProductList,
			rfAttrContent,
			rfLoadMore,
			rfTopDrawer
		},
		filters: {
			filterTotalSales (val) {
				if (val > 10000) {
					val = `${(val / 10000).toFixed(2)}w`;
				}
				return val;
			}
		},
		data() {
			return {
			  	keyword: '',
			 	errorInfo: '',
				loadingType: 'more',
				loading: true,
				tabIndex: 0, //顶部筛选索引
				selectedName: "药品医嘱",
				selectH: 0,
				dropdownList: [{
					name: "药品医嘱",
					selected: true,
					param: {}
				}, {
					name: "其他1",
					selected: false,
					param: { price: 'asc' }
				}, {
					name: "其他2",
					selected: false,
					param: { price: 'desc' }
				}],

				productList: medicineList,
				pageIndex: 1,

			}
		},
		onLoad(options) {

		},
		// 下拉刷新
		onPullDownRefresh() {
		},
		// 加载更多
		onReachBottom() {

		},
		methods: {
			showDropdownList() {
				this.selectH = 246;
				this.tabIndex = 0;
			},
			hideDropdownList() {
				this.selectH = 0
			},
			dropdownItem(e) {
				let index = parseInt(e.currentTarget.dataset.index, 10);
				let arr = this.dropdownList;
				for (let i = 0; i < arr.length; i++) {
					if (i === index) {
						arr[i].selected = true;
					} else {
						arr[i].selected = false;
					}
				}
				this.dropdownList = arr;
				this.selectedName = index === 0 ? '综合' : index === 1 ? '价格升序' : '价格降序';
				this.selectH = 0;
				this.page = 1;
				this.productList = [];
				this.loading = true;
				this.productParams = this.dropdownList[index].param;
				this.getProductList();
			},
			screen(e) {
				let index = parseInt(e.currentTarget.dataset.index, 10);
				if (index === 0) {
					this.showDropdownList();
				} else if (index === 1) {
					let params = {}
					if (this.tabIndex === 1) {
						this.tabIndex = null;
						params.total_sales = 'asc';
					} else {
						this.tabIndex = 1;
						params.total_sales = 'desc';
					}
					this.page = 1;
					this.productList = [];
					this.loading = true;
				  this.productParams = params;
					this.getProductList();
				} else if (index === 2) {
					this.isList = !this.isList
				} else if (index === 3) {
				  if (this.productCateList.length === 0) {
						this.getProductCate();
				  }
				  if (this.brandList.length === 0) {
						this.getBrandList();
				  }
					this.drawer = true;
				}
			},

			async getProductList(type) {
                return medicineList;
			},
			// 跳转详情
			navTo(route) {
				this.$mRouter.push({ route });
			}
		},
	}
</script>
<style lang="scss">
	page {
		background: $page-color-base;
	}
	/*顶部下拉选择 属性*/
	.rf-scroll-box {
		width: 100%;
		height: 480upx;
		box-sizing: border-box;
		position: relative;
		z-index: 99;
		color: $color-white;
		font-size: 30upx;
		word-break: break-all;
	}
	.rf-drop-item {
		color: #333;
		height: 80upx;
		font-size: 28upx;
		padding: 20upx 40upx 20upx 40upx;
		box-sizing: border-box;
		display: inline-block;
		width: 50%;
	}
	.rf-drop-btnbox {
		width: 100%;
		height: 100upx;
		position: absolute;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		display: flex;
	}
	.rf-drop-btn {
		width: 50%;
		font-size: 32upx;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		border: 0;
	}
	.rf-dropdownlist {
		width: 100%;
		position: absolute;
		background: $color-white;
		border-bottom-left-radius: 24upx;
		border-bottom-right-radius: 24upx;
		overflow: hidden;
		box-sizing: border-box;
		padding-top: 10upx;
		padding-bottom: 26upx;
		left: 0;
		top: 88upx;
		visibility: hidden;
		transition: all 0.2s ease-in-out;
		z-index: 99;
		.icongouxuan {
			font-size: $font-lg;
			line-height: 88upx;
		}
	}
	.rf-dropdownlist-show {
		visibility: visible;
	}
	.rf-dropdownlist-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: -1;
		transition: all 0.2s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}
	.rf-mask-show {
		opacity: 1;
		visibility: visible;
	}
	.rf-dropdownlist-item {
		color: #333;
		height: 70upx;
		font-size: 28upx;
		padding: 0 40upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.rf-flex-attr {
		flex-wrap: wrap;
		justify-content: flex-start;
	}
	.rf-attr-item {
		width: 30%;
		height: 64upx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 4upx;
		box-sizing: border-box;
		border-radius: 32upx;
		margin-right: 5%;
		margin-bottom: 5%;
	}

	.rf-attr-safearea {
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		/*padding-bottom: env(safe-area-inset-bottom);*/
	}
	.rf-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}
	.rf-attr-btnbox::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1upx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.product-list {
		padding-bottom: env(safe-area-inset-bottom);
		/* 隐藏scroll-view滚动条*/
		::-webkit-scrollbar {
			width: 0;
			height: 0;
			color: transparent;
		}
		.rf-header-box {
			width: 100%;
			background: $color-white;
			position: fixed;
			z-index: 100;
			left: 0;
			top: 0;
			.rf-header {
				display: flex;
				align-items: flex-start;
				.rf-back {
					margin-left: 8upx;
					height: 32px !important;
					width: 32px !important;
					display: flex;
					justify-content: center;
					align-items: center;
					.iconzuo {
						font-size: $font-lg + 4upx;
						font-weight: 500;
						color: $font-color-dark;
					}
				}
			}
			.input-box {
				width: 100%;
				font-size: $font-sm;
				box-sizing: border-box;
				color: #999;
				display: flex;
				align-items: center;
				overflow: hidden;
				height: 60upx;
				background-color: $page-color-base;
				border-radius: 30upx;
				position: relative;
				margin: 0 20upx 0 10upx;
				.iconsousuo2 {
					z-index: 100;
					display: flex;
					align-items: center;
					position: absolute;
					top: 0;
					right: 0;
					width: 60upx;
					height: 60upx;
					font-size: $font-lg + 4upx;
					color: $font-color-dark;
				}
				input {
					width: 100%;
					padding-left: 28upx;
					height: 28upx;
					color: $font-color-base;
					font-size: 28upx;
				}
			}
		}
		/*screen*/
		.rf-header-screen {
			width: 100%;
			background: $color-white;
			position: fixed;
			z-index: 99;
			.rf-screen-top,
			.rf-screen-bottom {
				border: none;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28upx;
				color: #333;
			}
			.rf-screen-top {
				height: 88upx;
				line-height: 88upx;
				position: relative;
				background: $color-white;
			}
			.rf-top-item {
				height: 28upx;
				line-height: 28upx;
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				.iconfont {
					font-size: $font-lg + 4upx;
					font-weight: 500;
				}
			}
			.rf-screen-bottom {
				height: 100upx;
				padding: 0 30upx;
				box-sizing: border-box;
				font-size: 24upx;
				align-items: center;
				overflow: hidden;
			}
			.rf-bottom-text {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.rf-bottom-item {
				flex: 1;
				width: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 12upx;
				box-sizing: border-box;
				margin-right: 20upx;
				white-space: nowrap;
				height: 60upx;
				border-radius: 40upx;
			}
			.rf-bottom-item:last-child {
				margin-right: 0;
			}
			.rf-bold {
				font-weight: bold;
			}
			.rf-active {
				color: $base-color;
			}
			.rf-icon-ml .rf-icon-class {
				margin-left: 6upx;
			}
			.rf-ml {
				margin-left: 6upx;
			}
			.rf-seizeaseat-20 {
				height: 20upx;
			}
			.rf-seizeaseat-30 {
				height: 30upx;
			}
			.rf-icon-middle .rf-icon-class {
				vertical-align: middle;
			}
			.rf-middle {
				vertical-align: middle;
			}
		}
	}
</style>
