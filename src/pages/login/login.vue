<template>
	<view class="login">
		<view class="login-type-2" >
			<!--顶部返回按钮-->
			<text class="back-btn iconfont iconzuo" @tap="navBack"></text>
			<view class="login-top" :class="'bg-' + themeColor.name">
				<view class="desc">
					<view class="title">Hi~</view>
					<text>{{ appName }}欢迎您</text>
				</view>
				<image class="login-pic" :src="loginPic"></image>
			</view>
			<view class="login-type-content">
				<image class="login-bg" :src="loginBg" :style="{height: tabCurrentIndex === 1 ? '150vw' : '94vw'}"></image>
				<view class="main">
					<view class="nav-bar">
						<view
							class="nav-bar-item"
							:class=" `text-${themeColor.name} nav-bar-item-active`"
						>
						登录
						</view>
					</view>
					<block>
						<view class="login-type-form">
							<view class="input-item">
								<text class="iconfont iconzhanghuffffffpx" :class="'text-' + themeColor.name"></text>
								<input
									class="login-type-input"
									type="number"
									name="mobile"
									v-model="loginParams.mobile"
									placeholder="请输入用户名"
									maxlength="11"
									@blur="blurMobileChange"
								/>
							</view>
							<view class="input-item" v-if="loginByPass">
								<text class="iconfont iconmimaffffffpx" :class="'text-' + themeColor.name"></text>
								<input
									class="login-type-input"
									type="password"
									v-model="loginParams.password"
									placeholder="请输入密码"
									maxlength="20"
								/>
							</view>
						</view>
						<view class="login-type-tips">
							<text @tap="navTo('/pages/public/password?type=1')">修改密码</text>
						</view>
						<button
							class="confirm-btn"
							:class="'bg-' + themeColor.name"
							:disabled="btnLoading"
							:loading="btnLoading"
							@tap="toLogin"
						>
							登录
						</button>
					</block>
				</view>
			</view>
			<view class="login-type-bottom" :class="'text-' + themeColor.name">
				{{ appName }} 版权所有
			</view>
		</view>
	</view>
</template>
<script>
import { loginByPass, loginBySmsCode, smsCode, authLogin, registerByPass } from '@/api/login';

export default {
	data() {
		return {
			loginParams: {
				mobile: '',
				code: '',
				password: ''
			},
			btnLoading: false,
			reqBody: {},
			loginByPass: true,
			userInfo: null,
			loginBg: this.$mAssetsPath.loginBg,
			loginPic: this.$mAssetsPath.loginPic,
			appName: this.$mSettingConfig.appName,
			styleLoginType: this.$mSettingConfig.styleLoginType,
			tabCurrentIndex: 0,
		};
	},
	onShow() {
		// if (this.$mStore.getters.hasLogin) {
		// 	this.$mRouter.reLaunch({ route: '/pages/index/index' });
		// }
	},
	onLoad(options) {
		// this.loginParams.mobile = uni.getStorageSync('loginMobile') || '';
		// this.loginParams.password = uni.getStorageSync('loginPassword') || '';
		// this.userInfo = uni.getStorageSync('wechatUserInfo');
	},
	methods: {
		loginTest(mobile, password) {
			this.loginParams.mobile = mobile;
			this.loginParams.password = password;
		},

		// 失去焦点的手机号
		blurMobileChange(e) {
			this.mobile = e.detail.value;
		},

		// 返回上一页
		navBack() {
			this.$mRouter.back();
		},
		// 统一跳转路由
		navTo(route) {
			this.$mRouter.push({ route });
		},
		// 返回主页
		toHome() {
			this.$mRouter.reLaunch({ route: '/pages/index/index' });
		},
		// 提交表单
		async toLogin() {
			uni.removeStorageSync('loginMobile');
			uni.removeStorageSync('loginPassword');
			this.reqBody['mobile'] = this.loginParams['mobile'];
			let cheRes, loginApi;
			if (this.loginByPass) {
				loginApi = loginByPass;
				this.reqBody['password'] = this.loginParams['password'];
			} else {
				this.reqBody['code'] = this.loginParams['code'];
				loginApi = loginBySmsCode;
			}
			if (!cheRes) {
				return;
			}
			this.reqBody.group = this.$mHelper.platformGroupFilter();
			const backUrl = uni.getStorageSync('backToPage');
			if (backUrl.indexOf('promo_code') !== -1) {
				this.reqBody.promo_code = JSON.parse(backUrl)['query']['promo_code'];
			}
			this.handleLogin(this.reqBody, loginApi);
		},
		// 登录
		async handleLogin(params, loginApi) {
			this.btnLoading = true;
			await this.$http
				.post(loginApi, params)
				.then(r => {
					this.$mHelper.toast('恭喜您，登录成功！');
					this.$mStore.commit('login', r.data);
					if (this.userInfo) {
						this.btnLoading = false;
						const oauthClientParams = {};
						/*  #ifdef MP-WEIXIN */
						oauthClientParams.oauth_client = 'wechatMp';
						/*  #endif  */
						/*  #ifndef MP-WEIXIN */
						oauthClientParams.oauth_client = 'wechat';
						/*  #endif  */
						const userInfo = JSON.parse(this.userInfo);
						this.$http.post(authLogin, {
							...userInfo,
							...oauthClientParams,
							gender: userInfo.sex || userInfo.gender,
							oauth_client_user_id: userInfo.openid || userInfo.openId,
							head_portrait: userInfo.headimgurl || userInfo.avatarUrl
						});
					}
					uni.removeStorageSync('wechatUserInfo');
					const backToPage = uni.getStorageSync('backToPage');
					uni.removeStorageSync('backToPage');
					if (backToPage) {
						if (
							backToPage.indexOf('/pages/profile/profile') !== -1 ||
							backToPage.indexOf('/pages/cart/cart') !== -1 ||
							backToPage.indexOf('/pages/index/index') !== -1 ||
							backToPage.indexOf('/pages/public/login') !== -1 ||
							backToPage.indexOf('/pages/category/category') !== -1
						) {
							this.$mRouter.reLaunch(JSON.parse(backToPage));
						} else {
							this.$mRouter.redirectTo(JSON.parse(backToPage));
						}
					} else {
						this.$mRouter.reLaunch({ route: '/pages/profile/profile' });
					}
				})
				.catch(() => {
					this.btnLoading = false;
				});
		}
	}
};
</script>
<style lang="scss">
page {
	background: $color-white;
}
.login-type-2 {
	width: 100%;
	position: relative;
	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 48upx;
		color: $color-white;
	}
	.login-top {
		height: 460upx;
		position: relative;
		.desc {
			position: absolute;
			top: 200upx;
			left: 40upx;
			font-size: 48upx;
			.title {
				font-size: 48upx;
			}
		}
		.login-pic {
			position: absolute;
			width: 220upx;
			height: 270upx;
			right: 30upx;
			top: 100upx;
		}
	}
	.login-type-content {
		position: relative;
		top: -72upx;
		.login-bg {
			width: 94vw;
			height: 94vw;
			margin: 0 3vw;
		}
		.main {
			width: 94vw;
			position: absolute;
			top: 0;
			left: 3vw;
			.nav-bar {
				display: flex;
				height: 100upx;
				justify-content: center;
				align-items: center;
				position: relative;
				z-index: 10;
				.nav-bar-item {
					flex: 1;
					display: flex;
					height: 100%;
					line-height: 96upx;
					font-size: $font-lg;
					display: flex;
					margin: 0 120upx;
					justify-content: center;
				}
				.nav-bar-item-active {
					border-bottom: 5upx solid;
				}
			}
			.login-type-form {
				width: 80%;
				margin: 50upx auto;
				.input-item {
					position: relative;
					height: 90upx;
					line-height: 90upx;
					margin-bottom: $spacing-lg;
					.iconfont {
						font-size: 50upx;
						position: absolute;
						left: 0;
					}
					.login-type-input {
						height: 90upx;
						padding-left: 80upx;
						border-bottom: 1upx solid rgba(0, 0, 0, .1);
					}
					.sms-code-btn, sms-code-resend {
						width: 240upx;
						font-size: $font-base - 2upx;
					}
				}
			}
			.login-type-tips {
				padding: 0 50upx;
				display: flex;
				justify-content: space-between;
			}
			.confirm-btn {
				height: 80upx;
				line-height: 80upx;
			}
		}
	}
	.login-type-bottom {
		width: 100%;
		padding-bottom: 30upx;
		text-align: center;
		font-size: $font-lg;
	}
}
</style>
