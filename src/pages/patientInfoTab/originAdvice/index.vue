<template>
	<view class="user">
		<view class="user-section" :class="'bg-' + themeColor.name">
			56565656
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

		},
    },
};
</script>

<style lang="scss" scoped>
    page {
        background-color: $page-color-base;
    }
</style>
