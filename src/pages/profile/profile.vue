<template>
	<view class="user">
		<!--头部-->
		<view class="user-section" :class="'bg-' + themeColor.name">
			<image class="bg" :src="userBg"></image>
			<!--用户信息-->
			<view class="user-info-box">
				<view
					class="portrait-box"
					@tap="navTo(userInfo ? '/pages/user/userinfo/userinfo' : 'login')"
				>
					<image
						class="portrait"
						:src="userInfo.head_portrait || headImg"
					></image>
					<text class="username">
						{{
							userInfo.nickname ||
							userInfo.realname ||
								'登录/注册'
						}}
					</text>
				</view>
			</view>
			<!--vip信息-->
			<view class="vip-card-box">
				<view class="tit">
					<i class="iconfont iconzuanshi" />
					{{appName}}尊享会员
				</view>
				<text class="e-m">{{appName}} 版权所有</text>
			</view>
		</view>
		<!-- 个人中心 内容区-->
		<view
			class="cover-container"
			:style="[
				{
					transform: coverTransform,
					transition: coverTransition
				}
			]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		>
			<image class="arc" :src="arc"></image>
			<!--我的服务-->
			<view class="promotion-center">
				<list-cell
					icon="iconfuwu"
					:iconColor="themeColor.color"
					@eventClick="navTo('/pages/set/set')"
					:title="_i18n.t('profile.myService')"
				></list-cell>
				<view class="tj-sction">
					<!-- 分类列表 -->
					<view class="category-list">
						<view
							class="category"
							v-for="(item, index) in settingList"
							:key="index"
							@tap.stop="navTo(item.url)"
						>
							<view >
								<view class="img">
									<text
										class="iconfont"
										:class="[item.icon, 'text-'+themeColor.name]"
									></text>
								</view>
								<view class="text">{{ item.title }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--页面加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
</template>
<script>

import { footPrintList, memberInfo, notifyUnRreadCount } from '@/api/userInfo';
import listCell from '@/components/rf-list-cell';
import { mapMutations } from 'vuex';
import rfBadge from '@/components/rf-badge/rf-badge';
import $mAssetsPath from '@/config/assets.config';
let startY = 0, moveY = 0, pageAtTop = true;
export default {
	components: {
		listCell,
		rfBadge
	},
	data() {
		return {
			isOpenLiveStreaming: this.$mSettingConfig.isOpenLiveStreaming,
			headImg: this.$mAssetsPath.headImg,
			vipCardBg: this.$mAssetsPath.vipCardBg,
			arc: this.$mAssetsPath.arc,
			userBg: this.$mAssetsPath.userBg,
			coverTransform: 'translateY(0px)',
			coverTransition: '0s',
			moving: false,
			userInfo: {
				// 用户信息
				promoter: null // 分销商信息
			},
			loading: true,
			appName: this.$mSettingConfig.appName,
			hasLogin: false,
			currentLanguage: this._i18n.locale === 'zh' ? 'English' : '中文'
		};
	},

  computed: {
    // 判断推广中心是否显示 当有分销商信息的时候显示
    settingItemShowFilter() {
    },
		settingList() {
			return [
				{ icon: 'icongonggao', url: '/pages/index/notice/notice', title: this._i18n.t('profile.notice'), color: '#ff6b81' },
				{ icon: 'iconyouhuiquan-copy', url: '/pages/user/coupon/list', title: this._i18n.t('profile.couponCenter'), color: '#ff6b81' },
				{ icon: 'icondizhi1', url: '/pages/user/address/address', title: this._i18n.t('profile.addressManage'), color: '#ff6b81' },
				{ icon: 'iconshoucang3', url: '/pages/user/collection/collection', title: this._i18n.t('profile.myCollection'), color: '#ff6b81' },
			];
		}
  },
	// // 小程序分享
	// onShareAppMessage() {
	// 	return {
	// 		title: `欢迎来到${this.appName}`,
	// 		path: '/pages/index/index'
	// 	};
	// },
	async onShow() {
		// 初始化数据
		await this.initData();
	},
	// #ifndef MP
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
			this.navTo('/pages/set/set');
		} else if (index === 1) {
			// #ifdef APP-PLUS
			// eslint-disable-next-line
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			const currentWebview = page.$getAppWebview();
			currentWebview.hideTitleNViewButtonRedDot({
				index
			});
			// #endif
			this.$mRouter.switchTab({ route: '/pages/public/login' });
		}
	},
	// #endif
	methods: {

		...mapMutations(['setNotifyNum', 'setCartNum']),
		// 分享
		...mapMutations(['login']),
		// 数据初始化
		async initData() {
			this.hasLogin = this.$mStore.getters.hasLogin;
			uni.setTabBarStyle({
				selectedColor: this.themeColor.color,
				borderStyle: 'white'
			});
			this.themeColor.tabList && this.themeColor.tabList.forEach((selectedIconPath, index) => {
				uni.setTabBarItem({
					index,
					selectedIconPath
				});
			});
			if (this.hasLogin) {
				await this.getMemberInfo();
			} else {
				this.loading = false;
				this.resetSectionData();
			}
		},
		// 获取用户信息
		async getMemberInfo() {
			await this.$http
				.get(memberInfo)
				.then(async r => {
					this.loading = false;
					this.userInfo = r.data;
					await this.setCartNum(r.data.cart_num);
					await this.initNotifyNum();
					// 获取足迹列表
					await this.getFootPrintList();
					await this.setSectionData(r.data);
				})
				.catch(() => {
					this.hasLogin = false;
					this.userInfo = {};
					this.resetSectionData();
					this.loading = false;
				});
		},
		// 设置未读消息个数
		async initNotifyNum () {
      await this.$http.get(notifyUnRreadCount).then(r => {
        this.setNotifyNum(r.data.count);
      });
    },

		// 给个人中心的各模块赋值
		setSectionData(data) {
			const orderSynthesizeNumArr = [];
			for (let item in data.order_synthesize_num) {
				orderSynthesizeNumArr.push(data.order_synthesize_num[item]);
			}
			// 更新userInfo缓存
			uni.setStorageSync('userInfo', data);
		},
		// 获取足迹列表
		async getFootPrintList() {
			await this.$http.get(`${footPrintList}`).then(r => {
				this.footPrintList = r.data;
			});
		},
		// 统一跳转接口,拦截未登录路由
		navTo(route) {
			if (!route) return;
			if (route === '/pages/index/notice/notice') {
				this.$mRouter.push({ route });
			} else if (!this.hasLogin) {
				uni.removeStorageSync('backToPage');
				this.$mRouter.push({ route: '/pages/public/logintype' });
			} else {
				this.$mRouter.push({ route });
			}
		},

		coverTouchstart(e) {
			if (pageAtTop === false) {
				return;
			}
			this.coverTransition = 'transform .1s linear';
			startY = e.touches[0].clientY;
		},
		coverTouchmove(e) {
			moveY = e.touches[0].clientY;
			let moveDistance = moveY - startY;
			if (moveDistance < 0) {
				this.moving = false;
				return;
			}
			this.moving = true;
			if (moveDistance >= 80 && moveDistance < 100) {
				moveDistance = 80;
			}
			if (moveDistance > 0 && moveDistance <= 80) {
				this.coverTransform = `translateY(${moveDistance}px)`;
			}
		},
		coverTouchend() {
			if (this.moving === false) {
				return;
			}
			this.moving = false;
			this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
			this.coverTransform = 'translateY(0px)';
		},
		// 跳转至商品详情
		navToProduct(type, id) {
			let route = `/pages/product/product?id=${id}`;
			switch (type) {
				case 'discount':
					route = `/pages/marketing/discount/product?id=${id}`;
					break;
				case 'bargain':
					route = `/pages/marketing/bargain/product?id=${id}`;
					break;
				case 'group_buy':
					route = `/pages/marketing/group/product?id=${id}`;
					break;
				case 'wholesale':
					route = `/pages/marketing/wholesale/product?id=${id}`;
					break;
			}
			this.$mRouter.push({ route });
		}
	}
};
</script>
<style lang="scss" scoped>
page {
	background-color: $page-color-base;
}
.user {
	.user-section {
		height: 520upx;
		padding: 100upx 30upx 0;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100vw;
			height: 60vw;
			opacity: 0.84;
		}
		.user-info-box {
			height: 180upx;
			display: flex;
			align-items: center;
			position: relative;
			z-index: 1;
			justify-content: space-between;

			.portrait-box {
				display: flex;
				align-items: center;

				.portrait {
					width: 130upx;
					height: 130upx;
					border: 5upx solid #fff;
					border-radius: 50%;
				}

				.username {
					font-size: $font-lg + 6upx;
					color: $color-white;
					margin-left: 20upx;
				}

				button {
					background-color: transparent;
					font-size: $font-lg + 6upx;
					color: $font-color-dark;
					border: none;
				}

				button::after {
					border: none;
				}
			}
		}

		.vip-card-box {
			display: flex;
			flex-direction: column;
			color: #f7d680;
			height: 240upx;
			background: url('/static/vip-card.png');
			background-size: 100% 100%;
			border-radius: 16upx 16upx 0 0;
			overflow: hidden;
			position: relative;
			padding: 20upx 24upx;
			.b-btn{
				position: absolute;
				right: 24upx;
				top: 24upx;
				width: 132upx;
				height: 40upx;
				text-align: center;
				line-height: 40upx;
				font-size: 22upx;
				color: #36343c;
				border-radius: 20px;
				background: linear-gradient(to left, #f9e6af, #ffd465);
				z-index: 1;
			}
			.tit {
				font-size: $font-base + 2upx;
				color: #f7d680;
				margin-bottom: 28upx;
				.iconfont {
					color: #f6e5a3;
					display: inline-block;
					margin-right: 16upx;
				}
			}
		}
	}

	.cover-container {
		margin-top: -150upx;
		padding: 0 30upx 20upx;
		position: relative;
		background-color: $page-color-base;

		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}

		.promotion-center {
			background: #fff;
			margin-bottom: 20upx;
			/*分类列表*/
			.category-list {
				width: 100%;
				padding: 0 0 30upx 0;
				border-bottom: solid 2upx #f6f6f6;
				display: flex;
				flex-wrap: wrap;
				.category {
					width: 33.3%;
					margin-top: 50upx;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					.img {
						width: 100%;
						display: flex;
						justify-content: center;

						.iconfont {
							font-size: $font-lg + 24upx;
						}
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 24upx;
						color: #3c3c3c;
					}
					.share-btn {
						height: 142upx;
						text-align: left;
						background: none;
						padding: 0;
						margin: 0;
					}

					.share-btn:after {
						border: none;
						border-radius: none;
					}
				}
			}
		}

		.tj-sction {
			@extend %section;
			display: flex;

			.tj-item {
				@extend %flex-center;
				flex: 1;
				flex-direction: column;
				margin: 30upx 0;
				font-size: $font-sm;
				color: #75787d;
				/*border-right: 2upx solid rgba(0, 0, 0, 0.2);*/
			}

			/*.tj-item:last-child {*/
			/*border-right: none;*/
			/*}*/
			.num {
				font-size: $font-base;
			}

			.red {
				color: $base-color;
			}
		}

		.order-section {
			@extend %section;
			padding: 28upx 0;

			.order-item {
				@extend %flex-center;
				width: 120upx;
				height: 120upx;
				border-radius: 10upx;
				font-size: $font-sm;
				color: $font-color-dark;
				position: relative;
			}

			.badge {
				position: absolute;
				top: 0;
				right: 4upx;
			}

			.iconfont {
				font-size: 48upx;
			}

			.icon-shouhoutuikuan {
				font-size: 44upx;
			}
		}

	}
}
%flex-center {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
%section {
	justify-content: space-around;
	display: flex;
	align-content: center;
	background: #fff;
	border-radius: 10upx;
}
</style>
