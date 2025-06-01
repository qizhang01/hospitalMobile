<template>
	<view class="recharge">
		<view class="block">
			<view class="title">
				<text class="cell-title">床位号: 165</text>
				<text>李金浩</text>
				<text class="at_least">二级</text>
				<text>57岁</text>
				<text>男</text>
				<view>#167899</view>
			</view>
		</view>
		<view class="block">
			<view class="tempature">
					<image :src="appServiceQr" class="img"></image>
			        <view>体温单</view>
					<button class="button">录入</button>
					<button class = "button">查询</button>
			</view>
			<view class="document">
					<image :src="appServiceQr" class="img"></image>
			        <view>体温单</view>
					<button class="button">录入</button>
					<button class = "button">查询</button>
			</view>
			<view class="other">
                <view class="item" @tap.stop="navTo('/pages/product/list?cate_id=1423')">	
					<image :src="record2" class="img"></image>	
					<text class="button" >原始医嘱查询</text>
				</view>
				<view class="item">	
					<image :src="record2" class="img"></image>		
					<text class="button">执行明细查询</text>
				</view>
			</view>
		</view>
		<view class="block">
			<view class="timeRecord">
                 时间记录
			</view>
		</view>
		<!--加载动画-->
		<rfLoading isFullScreen :active="pageLoading"></rfLoading>
	</view>
</template>

<script>
import { memberInfo, rechargeConfigIndex } from '@/api/userInfo';
import { configList } from '@/api/basic';
import $mAssetsPath from '@/config/assets.config';
export default {
	data() {
		return {
			appServiceQr: this.$mSettingConfig.appServiceQr,
			record1: this.$mAssetsPath.tabNotifyBlue,
			record2: this.$mAssetsPath.tabNotifyBlue,
			inputAmount: 0, // 金额
			inputAmountGive: 0, // 金额
			amountList: [], // 预设3个可选快捷金额
			payType: 1, // 支付类型
			userInfo: {},
			loading: false,
			providerList: [],
			payTypeList: {},
			isWechat: this.$mPayment.isWechat(),
			pageLoading: false,
			code: ''
		};
	},
	onLoad(options) {
		this.initData(options);
			/*  #ifdef H5  */
			this.code = options.code && options.code.split(',')[options.code.split(',').length - 1];
			if (this.$mPayment.isWechat()) {
				if (!this.code) {
						const href = window.location.href;
						window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?
																appid=${this.$mConfig.weixinAppId}&
																redirect_uri=${href}&
																response_type=code&
																scope=snsapi_userinfo&
																state=STATE#wechat_redirect`;
				}
			}
			/*  #endif  */
	},
methods:{
	navTo(route) {
		this.$mRouter.push({ route });
	}
}
};
</script>

<style lang="scss">
page {
	background-color: #f1f1f1;
}
.block {
	background-color: $color-white;
	padding:10px 20px;
	margin-bottom: 4px;
}
.title {
	display: flex;
	justify-content: space-between;
	padding: 6px 0px;
}
.recharge {
//   padding:0 20px;

}
.img {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	margin-right: 4px;
}
.tempature,
.document,
.other
 {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 10px;
}
.button{
	font-size: 14px;
	height: 32px;
	line-height: 32px;
}
.item{
	display: flex;
	align-items: center;

}
</style>
