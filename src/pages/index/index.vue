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
			<block v-if="currentCate === 0">
				<!-- 轮播图1 -->
				<view class="swiper">
					<view class="swiper-box">
						<rf-swipe-dot
							:info="carouselList.index_top"
							mode="nav"
							:current="current"
							field="title"
						>
							<swiper @change="handleDotChange" autoplay="true">
								<swiper-item
									v-for="(item, index) in carouselList.index_top"
									@tap="indexTopToDetailPage(item)"
									:key="index"
								>
									<view class="swiper-item">
										<image :src="item.cover" mode="aspectFill" />
									</view>
								</swiper-item>
							</swiper>
						</rf-swipe-dot>
					</view>
				</view>
				<!-- 分类列表 -->
				<swiper
					:indicator-active-color="themeColor.color"
					indicator-color="#666"
					:indicator-dots="productCateList.length > 10"
					:style="{height: productCateList.length <= 5 ? '200rpx' : '400rpx'}"
					class="category-list-wrapper"
					v-if="productCateList.length > 0">
					<swiper-item
						class="category-list"
						v-for="(fItem, fIndex) in swipeCateList"
						:key="fIndex"
					>
						<view
							class="category"
							v-for="(sItem, sIndex) in fItem" :key="sIndex" @tap.stop="navToCategory(sItem.id)">
							<view class="img">
								<image :src="sItem.cover || errorImage" mode="aspectFill"></image>
							</view>
							<view class="text in1line">{{ sItem.title}}</view>
						</view>
					</swiper-item>
				</swiper>
				<!--新闻通知-->
				<rf-swiper-slide v-if="announceList.length > 0" :list="announceList" class="rf-skeleton" @navTo="navTo('/pages/index/notice/notice')">
					<view slot="header" class="swiper-slide-header">
						<text class="iconfont icongonggao" :class="'text-'+themeColor.name"></text>
					</view>
				</rf-swiper-slide>
				<!-- 爆款推荐 -->
			</block>
		</view>
		<!--页面加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
		<rf-back-top :scrollTop="scrollTop"></rf-back-top>
		<rf-back-home></rf-back-home>
	</view>
</template>

<script>

	import {
		indexList,
		productList
	} from '@/api/product';
	import rfSwipeDot from '@/components/rf-swipe-dot';
	import rfFloorIndex from '@/components/rf-floor-index';
	import rfSearchBar from '@/components/rf-search-bar';
	import rfSwiperSlide from '@/components/rf-swiper-slide';
	import rfProductList from '@/components/rf-product-list/indexcopy';
	import listCell from '@/components/rf-list-cell';
	import { mapMutations } from 'vuex';
	export default {
		components: {
			rfFloorIndex,
			rfSwipeDot,
			rfProductList,
			rfSearchBar,
			listCell,
			rfSwiperSlide
		},
		data() {
			return {
				current: 0, // 轮播图index
				carouselList: {}, // 广告图
				hotProductList: [], // 热门商品列表
				recommendProductList: [], // 推荐商品列表
				guessYouLikeProductList: [], // 猜您喜欢商品列表
				newProductList: [], // 新品上市商品列表
				productCateList: [], // 商品栏目
				config: {}, // 商户配置
				announceList: [], // 公告列表
				share: {},
				loading: true,
				scrollTop: 0,
				kefuShow: true,
				loadingType: 'more',
				hotSearchDefault: '请输入关键字',
				newsBg: this.$mAssetsPath.newsBg,
				errorImage: this.$mAssetsPath.errorImage,
				appName: this.$mSettingConfig.appName,
				categoryList: [], // 分类列表
				categoryProductList: [], // 分类列表
				page: 1,
				currentCate: 0,
				hotRecommendList: this.$mConstDataConfig.hotRecommendList,
				productLoading: true,
				isOpenIndexCate: this.$mSettingConfig.isOpenIndexCate,
				moneySymbol: this.moneySymbol,
				merchantShow: false,
				merchantData: {}
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onShow() {
			// 初始化购物车数量
			this.setCartNum(uni.getStorageSync('cartNum'));
			this.initData();
		},
		computed: {
			statusBar () {
				const e = uni.getSystemInfoSync();
				return e.statusBarHeight;
			},
			// 计算倒计时时间
			second() {
				return function(val) {
					return Math.floor(15 * 60 - (new Date() / 1000 - val));
				};
			},
			bottom () {
				let bottom = 0;
				/*  #ifdef H5  */
				bottom = 90;
				/*  #endif */
				return bottom;
			},
			swipeCateList() {
				const list = this.productCateList;
				let result = [];
				for (let i = 0, len = list.length; i < len; i += 10) {
					result.push(list.slice(i, i + 10));
				}
				return result;
			}
		},

		// 下拉刷新
		onPullDownRefresh() {
			this.getIndexList('refresh');
		},
		// 加载更多
		onReachBottom() {
			if (this.currentCate === 0) return;
			if (this.loadingType === 'nomore') return;
			this.page++;
			this.getProductList(this.currentCate);
		},
		methods: {
			// 顶部tab点击
			tabClick({ id }) {
				this.currentCate = id;
				if (id === 0) return;
				this.loading = true;
				this.page = 1;
				this.productLoading = true;
				this.categoryProductList = [];
				this.getProductList(id);
			},
			// 获取产品列表
			async getProductList(id) {
				await this.$http
					.get(`${productList}`, {
						cate_id: id,
						page: this.page
					})
					.then(async r => {
						this.loading = false;
						this.productLoading = false;
						this.loadingType = r.data.length < 10 ? 'nomore' : 'more';
						this.categoryProductList = [...this.categoryProductList, ...r.data];
					}).catch(() => {
						this.loading = false;
						this.productLoading = false;
					});
			},
			...mapMutations(['setCartNum']),
			// 监听轮播图切换
			handleDotChange(e) {
				this.current = e.detail.current;
			},
			// 数据初始化
			initData() {
				// 设置购物车数量角标
				this.getIndexList();
				this.initCartItemCount();
			},
			// 设置购物车数量角标
			async initCartItemCount() {
				if (
					this.$mStore.getters.hasLogin &&
					parseInt(uni.getStorageSync('cartNum'), 10) > 0
				) {
					uni.setTabBarBadge({
						index: this.$mConstDataConfig.cartIndex,
						text: uni.getStorageSync('cartNum').toString()
					});
				} else {
					uni.removeStorageSync('cartNum');
					uni.removeTabBarBadge({ index: this.$mConstDataConfig.cartIndex });
				}
			},
			// 通用跳转
			navTo(route) {
				this.$mRouter.push({ route });
			},
			// 跳转至分类模块
			navToCategory(id) {
				if (this.$mSettingConfig.appCateType === '2') {
					uni.setStorageSync('indexToCateId', id);
					this.$mRouter.reLaunch({ route: '/pages/category/category' });
				} else {
					this.navTo(`/pages/product/list?cate_id=${id}`);
				}
			},
			// 通用跳转
			navToSearch() {
				this.$mRouter.push({
					route: `/pages/index/search/search?data=${JSON.stringify(this.search)}`
				});
			},
			// 跳至广告图指定页面
			indexTopToDetailPage(item) {
				this.$mHelper.handleBannerNavTo(item.jump_type, item.jump_link, item.id);
			},
			// 获取主页数据
			async getIndexList(type) {
				await this.$http
					.get(`${indexList}`, {})
					.then(async r => {
						uni.setNavigationBarTitle({ title: this.appName });
						if (type === 'refresh') {
							uni.stopPullDownRefresh();
						}
						// 首页参数赋值
						this.initIndexData(r.data);
						this.loading = false;
					})
					.catch(() => {
						this.loading = false;
						if (type === 'refresh') {
							uni.stopPullDownRefresh();
						}
					});
			},
			// 首页参数赋值
			initIndexData(data) {
				this.announceList = data.announce;
				this.productCateList = data.cate;
				this.carouselList = data.adv;
				this.search = data.search;
				this.share = data.share;
				uni.setStorageSync('search', this.search);
				this.hotSearchDefault = data.search.hot_search_default || '请输入关键字';
				uni.setStorage({
					key: 'hotSearchDefault',
					data: data.search.hot_search_default
				});
				this.hotProductList = data.product_hot;
				this.recommendProductList = data.product_recommend;
				this.guessYouLikeProductList = data.guess_you_like;
				this.newProductList = data.product_new;
				this.config = data.config;
				this.$mHelper.handleWxH5Share(this.share.share_title || this.appName, this.share.share_desc || `欢迎来到${this.appName}商城`, this.share.share_link || this.$mConfig.hostUrl, this.share.share_cover || this.$mSettingConfig.appLogo);
			},
			// 跳转至商品详情页
			navToDetailPage(data) {
				const { id } = data;
				if (!id) return;
				this.$mRouter.push({ route: `/pages/product/product?id=${id}` });
			},
			// 跳转至分类页
			toCategory() {
				this.$mRouter.switchTab({ route: '/pages/category/category' });
			}
		}
	};
</script>
<style lang="scss">
	page {
		background-color: $page-color-base;
	}
	.rf-index {
		background-color: $color-white;
		/*爆款拼团*/
		.wrapper {
			border-radius: 10upx;
			.h-list {
				background-color: $page-color-base;
				white-space: nowrap;
				padding: 0 $spacing-sm;
				.h-item {
					margin: $spacing-sm $spacing-sm $spacing-sm 0;
					display: inline-block;
					background-color: $color-white;
					font-size: $font-sm;
					width: 280upx;
					border-radius: 6upx;
					.h-item-img {
						display: inline-block;
						width: 280upx;
						height: 300upx;
						border-top-left-radius: 12upx;
						border-top-right-radius: 12upx;
						border-bottom: 1upx solid rgba(0, 0, 0, 0.01);
					}
					.title {
						width: 280upx;
						white-space : normal;
						height: 60upx;
						line-height: 30upx;
						font-size: $font-sm;
						padding: 0 $spacing-sm;
						margin: $spacing-sm 0;
					}
					.last-line {
						padding: 0 $spacing-sm $spacing-base;
						margin-bottom: 5upx;
						display: flex;
						justify-content: space-between;
						align-items: center; /* 垂直居中 */
						.red {
							font-size: $font-sm;
							margin-right: 4upx;
						}
					}
					.price {
						font-size: $font-base - 2upx;
						line-height: 1;
						.m-price {
							margin-left: 8upx;
							color: $font-color-light;
							font-size: $font-sm;
							text-decoration: line-through;
						}
					}
				}
			}
		}
		/*轮播图*/
		.swiper {
			width: 100%;
			margin-bottom: 20upx;
			display: flex;
			justify-content: center;
			.swiper-box {
				width: 92%;
				height: 40vw;
				overflow: hidden;
				border-radius: 15upx;
				box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
				//兼容ios，微信小程序
				position: relative;
				z-index: 1;
				swiper {
					width: 100%;
					height: 40vw;
					swiper-item {
						image {
							width: 100%;
							height: 40vw;
						}
					}
				}
			}
		}

		/*轮播图2*/
		.swiper-item-text {
			position: absolute;
			bottom: 16upx;
			left: 30upx;
			height: 48upx;
			line-height: 48upx;
			background: rgba(0, 0, 0, 0.2);
			width: 90%;
			color: $color-white;
			border-bottom-left-radius: 12upx;
			padding-left: 20upx;
		}
		/*新闻通知*/
		.swiper-slide-header {
			.iconfont {
				font-size: $font-lg + 8upx;
				font-weight: 600;
			}
		}
		/*分类列表*/
		.category-list-wrapper {
			.category-list {
				width: 100%;
				padding: $spacing-base;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.category {
					margin-top: 10upx;
					width: calc(20% - 20upx);
					height: 132upx;
					display: flex;
					text-align: center;
					flex-wrap: wrap;
					.img {
						width: 100%;
						display: flex;
						justify-content: center;
						image {
							width: 12vw;
							height: 12vw;
							border-radius: 50%;
						}
					}
					.text {
						margin-top: 16upx;
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 24upx;
						color: #3c3c3c;
					}
				}
			}
		}
	}
	.container {
		padding-top: 70px;
	}
</style>
