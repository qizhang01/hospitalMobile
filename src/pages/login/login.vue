<template>
	<view class="login">
		<view class="login-type-2" >
			<!--顶部返回按钮-->
			<view class="login-top" :class="'bg-' + themeColor.name">
				<view class="desc">
					<view class="title">Hi~</view>
					<text @tap="open">{{ appName }}欢迎您</text>
				</view>
			</view>
			<view class="login-type-content">
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
			<!-- <view class="login-type-bottom" :class="'text-' + themeColor.name">
				{{ appName }} 版权所有
			</view> -->
		</view>
        <uni-popup ref="popup" type="bottom" border-radius="10px 10px 0 0">
            <view class="setting-content">
                <view>
                    <text>设置地址(比如https://hispital.us.to:8080/)</text>
                    <input
                        style="margin-top: 20upx;"
                        v-model="serviceAdress"
                        placeholder="请输入服务器地址"
                    />
                </view>
                <button @click="close" type="primary" style="width: 100%;">提交</button>
            </view>
        </uni-popup>
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
            serviceAdress: uni.getStorageSync('serviceAdress') || '',
			btnLoading: false,
			loginBg: this.$mAssetsPath.loginBg,
			appName: this.$mSettingConfig.appName,
            clickTimes: 0
		};
	},
	onShow() {
		if (uni.getStorageSync('accessToken')) {
			this.$mRouter.reLaunch({ route: '/pages/mainPageTab/index' });
		}
	},
	onLoad(options) {
		// this.loginParams.mobile = uni.getStorageSync('loginMobile') || '';
		// this.loginParams.password = uni.getStorageSync('loginPassword') || '';
		// this.userInfo = uni.getStorageSync('wechatUserInfo');
	},
	methods: {

		blurMobileChange(e) {
			this.mobile = e.detail.value;
		},

		// 统一跳转路由
		navTo(route) {
			this.$mRouter.push({ route });
		},
		// 登录
		async toLogin() {
            if(this.serviceAdress.trim() === ''){
                this.$mHelper.toast('请设置服务器地址')
                return
            }
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
                    this.btnLoading = false;
                    // uni.navigateTo({ url: '/pages/mainPageTab/index' })
                    this.$mRouter.reLaunch({ route: '/pages/mainPageTab/index' })
				})
				.catch(() => {
					this.btnLoading = false;
				});
		},

        open(){
            // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
            this.clickTimes++
            if(this.clickTimes >= 5){
                this.$refs.popup.open('top')
            }
        },

        close() {
            const tempStr = this.serviceAdress.trim()
            const address = tempStr[tempStr.length - 1]=='/' ? tempStr.substring(0, tempStr.length - 1): tempStr
            uni.setStorageSync('serviceAdress', address)
			this.$refs.popup.close()
		}
	}
};
</script>
<style lang="scss">
page {
	background: $color-white;
}
.setting-content {
    background: $color-white;
    height: 100vh;
    padding: 20upx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
