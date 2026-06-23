<template>
	<view class="login">
		<view class="login-type-2" >
			<!--顶部返回按钮-->
			<view class="login-top" :class="'bg-' + themeColor.name">
				<view class="desc">
					<view class="title">Hi~</view>
					<text>{{ appName }}欢迎您</text>
				</view>
				<image class="login-pic" :src="loginPic"></image>
			</view>
			<view class="login-type-content" v-if="!loginSuccess">
				<image class="login-bg" :src="loginBg" style="height: 94vw"></image>
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
									v-model="loginParams.employee_no"
									placeholder="请输入用户名"
									maxlength="11"
									@blur="blurMobileChange"
								/>
							</view>
							<view class="input-item">
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
						<!-- <view class="login-type-tips">
							<text @tap="navTo('/pages/public/password?type=1')">修改密码</text>
						</view> -->
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
            <view class="logout-type-content" v-else>
                <view>
                    <text style="color: #0081ff; margin-right: 8upx;">
                        {{ user && user.name }}
                    </text>
                    <text>登录中</text>
                </view>
                <button
                    class="confirm-btn"
                    :class="'bg-' + themeColor.name"
                    :disabled="btnLoading"
                    :loading="btnLoading"
                    @tap="toLogout"
                >
                    退出登录
                </button>
            </view>
			<!-- <view class="login-type-bottom" :class="'text-' + themeColor.name">
				{{ appName }} 版权所有
			</view> -->
		</view>
	</view>
</template>
<script>
import {loginUrl, logoutUrl } from '@/api/login';
import {mapState} from 'vuex'

export default {
    computed: {
        ...mapState(['userInfo']),
        user(){
            return this.userInfo
        }
    },
	data() {
		return {
			loginParams: {
				employee_no: '',
				password: ''
			},

			btnLoading: false,
			loginSuccess: false,
			loginBg: this.$mAssetsPath.loginBg,
			loginPic: this.$mAssetsPath.loginPic,
			appName: this.$mSettingConfig.appName,
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

		// 失去焦点的手机号
		blurMobileChange(e) {
			this.mobile = e.detail.value;
		},

		// 统一跳转路由
		navTo(route) {
			this.$mRouter.push({ route });
		},
		// 登录
		async toLogin() {
			this.btnLoading = true;
            const params = {
                employee_no: this.loginParams.employee_no,
                password: this.loginParams.password
            }
			await this.$http
				.post(loginUrl, params)
				.then(r => {
					this.$mHelper.toast('恭喜您，登录成功！');
					this.$mStore.commit('login', r);
                    this.loginSuccess = true
                    this.btnLoading = false;
				})
				.catch(() => {
					this.btnLoading = false;
				});
		},


        async toLogout(){
            this.btnLoading = true;
            await this.$http
				.post(logoutUrl, {})
				.then(r => {
					this.$mHelper.toast('恭喜您，登出成功');
					this.$mStore.commit('logout');
					this.btnLoading = false;
                    this.loginSuccess = false
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
    .logout-type-content {
        height: 400upx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>
