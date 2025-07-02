<template>
	<view class="coupon-center">

			<view class="rf-header-screen">
				<view class="rf-screen-top">
					<view class="rf-top-item rf-icon-ml" :class="[tabIndex==0? `text-${themeColor.name} rf-bold`:'']" data-index="0" @tap="screen">
						<text>{{selectedName}}</text>
						<text class="iconfont" :class="tabIndex==0?'iconshang':'iconxia'"></text>
					</view>
					<view class="rf-top-item" :class="[tabIndex == 1?`text-${themeColor.name} rf-bold`:'']" @tap="screen" data-index="1">
						<text>{{ selectedGroupName }}</text>
						<text class="iconfont" :class="tabIndex==1?'iconshang':'iconxia'"></text>
					</view>
					<!--下拉选择列表--综合-->
					<view class="rf-dropdownlist" :class="[selectH>0?'rf-dropdownlist-show':'']" :style="{height:selectH+'upx'}">
						<view class="rf-dropdownlist-item rf-icon-middle" :class="[item.selected?'rf-bold':'']" v-for="(item,index) in dropdownList" :key="index" @tap.stop="dropdownItem" :data-index="index">
							<text class="rf-ml rf-middle">{{item.name}}</text>
							<text class="iconfont icongouxuan" :class="'text-' + themeColor.name" v-if="item.selected"></text>
						</view>
					</view>
					<view class="rf-dropdownlist-mask" :class="[selectH>0?'rf-mask-show':'']" @tap.stop="hideDropdownList"></view>
				</view>
			</view>
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

		<rf-empty
			:info="errorInfo || '暂无患者信息'"
			v-if="couponList.length === 0 && !loading"
		></rf-empty>
		<!--页面加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
</template>

<script>

import { couponList } from '@/api/userInfo';
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import {selectList, groupList} from './infoList.js'

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
			errorInfo: '',
			selectH: 0,
			dropdownList: [],
			selectedName: "其他筛选",
			selectedGroupName: "患者分组",
			tabIndex: 0,
			selectList,
			groupList
		};
	},
	filters: {

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
		hideDropdownList() {
			this.selectH = 0
		},
		screen(e) {
			let index = parseInt(e.currentTarget.dataset.index, 10);
			if (index === 0) {
				this.dropdownList = this.selectList
			} else if (index === 1) {
				this.dropdownList = this.groupList
			} else if (index === 2) {

			} else if (index === 3) {

			}
			this.selectH = this.dropdownList.length * 80;
			this.tabIndex = index;
		},

		dropdownItem(e) {
			let index = parseInt(e.currentTarget.dataset.index, 10);
			let arr = this.dropdownList;
			for (let i = 0; i < arr.length; i++) {
				if (i === index) {
					arr[i].selected = true;
				} else {
					arr[i].selected = false;
				}
			}
			this.dropdownList = arr;
			if(this.tabIndex===0){
				this.doctorAdviceList = arr
				this.selectedAdviceName = arr[index].name;
			}else if(this.tabIndex===1){
				this.periodList = arr
				this.selectedPeriodName = arr[index].name;
			}
			this.selectH = 0;
		},
		// 获取收货地址列表
		async getCouponList(type) {
			const res = await this.$http
				.get("/api/ward/2901/inpatients")
				
             console.log(11111111, res)
			 if(res){
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.loadingType = res.length === 10 ? 'more' : 'nomore';
					this.couponList = res;
			 }
				// .then(r => {
				// 	console.log(11111111)
				// 	this.loading = false;
				// 	if (type === 'refresh') {
				// 		uni.stopPullDownRefresh();
				// 	}
				// 	this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
				// 	this.couponList = [...this.couponList, ...r.data];
				// })
				// .catch(err => {
				// 	console.log(34343434)
				// 	this.couponList.length = 0;
				// 	this.errorInfo = err;
				// 	this.loading = false;
				// 	if (type === 'refresh') {
				// 		uni.stopPullDownRefresh();
				// 	}
	
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
	.rf-dropdownlist {
		width: 100%;
		position: absolute;
		background: $color-white;
		border-bottom-left-radius: 24upx;
		border-bottom-right-radius: 24upx;
		overflow: hidden;
		box-sizing: border-box;
		padding-top: 10upx;
		padding-bottom: 26upx;
		left: 0;
		top: 88upx;
		visibility: hidden;
		transition: all 0.2s ease-in-out;
		z-index: 99;
		.icongouxuan {
			font-size: $font-lg;
			line-height: 88upx;
		}
	}
	.rf-dropdownlist-show {
		visibility: visible;
	}
	.rf-dropdownlist-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: -1;
		transition: all 0.2s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}
	.rf-mask-show {
		opacity: 1;
		visibility: visible;
	}
	.rf-dropdownlist-item {
		color: #333;
		height: 70upx;
		font-size: 28upx;
		padding: 0 40upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.rf-header-screen {
		width: 100%;
		background: $color-white;
		position: fixed;
		top: 45px;
		z-index: 99;
		.rf-screen-top,
		.rf-screen-bottom {
			border: none;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28upx;
			color: #333;
		}
		.rf-screen-top {
			height: 88upx;
			line-height: 88upx;
			position: relative;
			background: $color-white;
		}
		.rf-top-item {
			height: 28upx;
			line-height: 28upx;
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			.iconfont {
				font-size: $font-lg + 4upx;
				font-weight: 500;
			}
		}
		.rf-screen-bottom {
			height: 100upx;
			padding: 0 30upx;
			box-sizing: border-box;
			font-size: 24upx;
			align-items: center;
			overflow: hidden;
		}
		.rf-bottom-text {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.rf-bottom-item {
			flex: 1;
			width: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 12upx;
			box-sizing: border-box;
			margin-right: 20upx;
			white-space: nowrap;
			height: 60upx;
			border-radius: 40upx;
		}
		.rf-bottom-item:last-child {
			margin-right: 0;
		}
		.rf-bold {
			font-weight: bold;
		}
		.rf-active {
			color: $base-color;
		}
		.rf-ml {
			margin-left: 6upx;
		}

		.rf-middle {
			vertical-align: middle;
		}
	}
	.sub-list {
		margin-top: 100upx;
	}

</style>