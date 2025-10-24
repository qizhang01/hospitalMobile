<template>
	<view class="recharge">
		<view class="block">
			<view class="title">
				<text class="cell-title">床位号: {{ patientInfo.bed_no }}</text>
				<text>{{ patientInfo.name }}</text>
				<text class="at_least">{{ patientInfo.admit_situation }}级</text>
				<text>{{ patientInfo.age }}岁</text>
				<text>{{ patientInfo.physi_sex_name }}</text>
				<view>#{{ patientInfo.wrist_band }}</view>
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
			        <view>文书</view>
					<button class="button">录入</button>
					<button class = "button">查询</button>
			</view>
			<view class="other">
                <view class="item" @tap.stop="navTo('/pages/patientInfoTab/originAdvice/index')">	
					<image :src="record2" class="img"></image>	
					<text class="button" >原始医嘱查询</text>
				</view>
				<view class="item" @tap.stop="navTo('/pages/patientInfoTab/involveDetail/index')">	
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
		<!-- <rfLoading isFullScreen :active="pageLoading"></rfLoading> -->
	</view>
</template>

<script>
import { memberInfo, rechargeConfigIndex } from '@/api/userInfo';
import { configList } from '@/api/basic';
import { mapState } from 'vuex';

export default {
	computed: mapState(['patientInfo']),
	data() {
		return {
			appServiceQr: this.$mSettingConfig.appServiceQr,
			record1: this.$mAssetsPath.tabNotifyBlue,
			record2: this.$mAssetsPath.tabNotifyBlue,
			pageLoading: false,
		};
	},
	onLoad(options) {

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