<template>
	<view class="coupon-center">
		<view class="coupon-list">
			<!-- 优惠券列表 -->
			<view class="sub-list valid">
				<view
					class="row"
					v-for="(item, index) in couponList"
					:key="index"
					@tap.stop="navTo('/pages/user/account/recharge')"
				>
					<view class="carrier">
						<view class="title">
							<text class="cell-title">床位号: 165</text>
						</view>
						<view class="term">
							<text>李金浩</text>
							<text class="at_least">二级</text>
							<text>
	                            57岁
							</text>
							<text>
	                            男
							</text>
							<view>
								#167899
							</view>
						</view>
						<view class="">
							<view class="info">
								<text>医保: 无保老人</text>
								<text class="at_least">医生: 王静蕾</text>
							</view>
							<text>入院时间: 2023-02-13 12:09</text>
							<view class="info">
								<text class="at_least">诊断: 肺恶行肿瘤</text>
								<text class="at_least">住院时间15天</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<rf-load-more
				:status="loadingType"
				v-if="couponList.length > 0"
			></rf-load-more>
		</view>
		<rf-empty
			:info="errorInfo || '暂无患者信息'"
			v-if="couponList.length === 0 && !loading"
		></rf-empty>
		<!--页面加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
</template>

<script>
/**
 * @des 领取中心
 *
 * @author stav stavyan@qq.com
 * @date 2020-01-13 11:28
 * @copyright 2019
 */
import { couponList, couponReceive } from '@/api/userInfo';
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import moment from '@/common/moment';
export default {
	components: {
		rfLoadMore
	},
	data() {
		return {
			couponList: [],
			type: null,
			loadingType: 'more',
			page: 1,
			loading: true,
			moneySymbol: this.moneySymbol,
			errorInfo: ''
		};
	},
	filters: {
		time(val) {
			return moment(val * 1000).format('YYYY-MM-DD HH:mm');
		}
	},
	onLoad(options) {
		this.type = options.type;
		this.initData();
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.page = 1;
		this.couponList.length = 0;
		this.getCouponList('refresh');
	},
	// 加载更多
	onReachBottom() {
  if (this.loadingType === 'nomore') return;
		this.page++;
		this.getCouponList();
	},
	methods: {
		// 数据初始化
		initData() {
			this.getCouponList();
		},
		// 获取收货地址列表
		async getCouponList(type) {
			await this.$http
				.get(`${couponList}`, {
					page: this.page
				})
				.then(r => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
					this.couponList = [...this.couponList, ...r.data];
				})
				.catch(err => {
					this.couponList.length = 0;
					this.errorInfo = err;
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
				});
		},
		// 获取优惠券
		navTo(route) {
			this.$mRouter.push({ route });
		}
	}
};
</script>
<style lang="scss">
.info {
	display: flex;
	width: 100%;
	 justify-content: space-between;
}
</style>
