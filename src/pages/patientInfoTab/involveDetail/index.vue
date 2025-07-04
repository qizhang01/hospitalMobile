<template>
	<view class="user">
		<view class="user-section" :class="'bg-' + themeColor.name">
			8898989
		</view>
		<!--页面加载动画-->
		<!-- <rfLoading isFullScreen :active="loading"></rfLoading> -->
	</view>
</template>

<script>
import listCell from '@/components/rf-list-cell';
import { mapMutations } from 'vuex';
import rfBadge from '@/components/rf-badge/rf-badge';
export default {
	components: {
		listCell,
		rfBadge
	},
	data() {
		return {

		};
	},

  computed: {

  },

async onShow() {
    // 初始化数据
    await this.initData();
},

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
			}
		},
    },
};
</script>

<style lang="scss" scoped>
    page {
        background-color: $page-color-base;
    }
</style>
