<template>
	<view class="coupon-center">
		<view class="coupon-list">
			<!-- 优惠券列表 -->
			<view class="sub-list valid">
				<view
					class="row"
					v-for="(item, index) in couponList"
					:key="index"
					@tap.stop="getCoupon(item)"
				>
					<view class="carrier">
						<view class="title">
							<text class="cell-title">床位号: 165</text>
						</view>
						<view class="term">
							<text>李金浩</text>
							<text class="at_least">二级</text>
						</view>
						<view class="usage">
							<text>
	                            57岁
							</text>
							<view>
								#167899
								<!-- <text class="last" v-if="item.percentage"
									>剩余{{ item.percentage }}%</text
								> -->
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
		async getCoupon(item) {
			if (this.type) return;
			// 优惠券是否可领取 is_get 0 不可领取
			if (item.is_get === 0) {
				this.$mHelper.toast('该优惠券不可领取');
				return;
			}
			await this.$http
				.post(`${couponReceive}`, {
					id: item.id
				})
				.then(() => {
					this.page = 1;
					this.couponList.length = 0;
					this.$mHelper.toast('领取成功');
					this.getCouponList();
				});
		}
	}
};
</script>
<style lang="scss"></style>
