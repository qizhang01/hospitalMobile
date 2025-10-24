<script>
/* eslint-disable */
import Vue from 'vue';
import { verifyAccessToken } from '@/api/login'
import { mapMutations } from 'vuex';
export default {
	async onLaunch() {
		await this.initData();
	},
	methods: {
		...mapMutations(['setCartNum', 'setNotifyNum']),
		// 数据初始化
		async initData() {
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
			// 获取页面设置配置
			const token = uni.getStorageSync('accessToken');
			// 获取系统title高度
			await this.initSystemInfo();

			if (this.$mStore.getters.hasLogin) {

			}
		},
		// 初始化系统信息
		initSystemInfo() {
			uni.getSystemInfo({
				success(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform === 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 43;
					}
					// #endif
				}
			});
		},
		// 检验token是否有效
		async handleVerifyAccessToken (token) {
			// await this.$http.post(verifyAccessToken, { token }).then(r => {
			// 	if (!r.data.token) {
			// 				this.$mStore.commit('logout');
			// 	}}
			// );
    	}
	}
};
</script>
<style lang="scss">
// 导入colorUI
@import '/static/css/colorui/main.css';
@import '/static/css/colorui/icon.css';
@import '/static/css/colorui/animation.css';
// 导入阿里巴巴矢量图标库
@import './static/css/iconfont/iconfont.css';
@import './static/css/reset.scss';
@import './static/css/uni.scss';
</style>
