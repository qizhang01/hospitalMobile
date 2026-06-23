<template>
	<view class="rf-index">
		<view class="rf-header-screen" >
			<view class="rf-screen-top">

			</view>
		</view>
        <scroll-view scroll-y="true" class="patient-list_container">

        </scroll-view>
		<!--页面加载动画-->
		<!-- <rfLoading isFullScreen :active="loading"></rfLoading> -->
		<rf-back-top :scrollTop="scrollTop"></rf-back-top>
		<!-- <rf-back-home></rf-back-home> -->
	</view>
</template>

<script>
    import {mockData, typeOption, timeOption} from './data'
    import lineCell from './components/lineCell.vue';
    import buttonGroup from '../../lifeSignQuery/components/buttonGroup.vue';
    import timeSelect from '../../lifeSignQuery/components/timeSelect.vue';
	import { mapMutations } from 'vuex';
	export default {
		components: {

		},
		data() {
			return {

			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onShow() {

		},


		// 下拉刷新
		onPullDownRefresh() {

		},
		// 加载更多
		onReachBottom() {

		},
		methods: {
			// 数据初始化
			initData() {

			},

			// 通用跳转
			navTo(route) {
				this.$mRouter.push({ route });
			},

		}
	};
</script>
<style lang="scss">
	page {
		background-color: $page-color-base;
	}

</style>
