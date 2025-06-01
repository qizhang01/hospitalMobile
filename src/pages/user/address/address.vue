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
					<text class="iconfont iconshang"  :style="{color: tabIndex==0? themeColor.color:'#444'}"></text>
				</view>
				<view class="rf-top-item" :class="[tabIndex == 1?`text-${themeColor.name} rf-bold`:'']" @tap="screen" data-index="2">
					未停
					<text class="iconfont iconshang"  :style="{color: tabIndex==0? themeColor.color:'#444'}"></text>
				</view>
				<view class="rf-top-item" :class="[tabIndex == 1?`text-${themeColor.name} rf-bold`:'']" @tap="screen" data-index="3">
					全部
					<text class="iconfont iconshang"  :style="{color: tabIndex==0? themeColor.color:'#444'}"></text>
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

	import rfProductList from '@/components/rf-product-list';
	import rfLoadMore from '@/components/rf-load-more/rf-load-more';
	import medicineList, {dropDownList, periodList} from './infoList.js'
	/* eslint-disable */
	export default {
		components: {
			rfProductList,
			rfLoadMore,
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
				dropdownList: [],
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
					this.dropdownList = dropDownList
				} else if (index === 1) {
					this.dropdownList = periodList
				} else if (index === 2) {

				} else if (index === 3) {

				}
				this.selectH = this.dropdownList.length * 80;
				this.tabIndex = 0;
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
