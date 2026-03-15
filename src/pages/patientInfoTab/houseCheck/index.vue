<template>
	<view class="coupon-center">
            <scan-code />
			<view class="">
				<view class="">
					<view class="rf-top-item rf-icon-ml">
						<text>{{ nowTime }}</text>
					</view>
					<view class="" @tap.stop="handleClick">
                        <text>病区巡视记录</text>
                    </view>
                    <view>扫描结果：{{ scanResult }}</view>
				</view>
			</view>
			<view class="content">
                <view class="center" @tap.stop="handleClick">
                    <text>高香弟</text>
                </view>

                <view class="center" @tap.stop="handleClick">
                    <text>101床|男|72|MRN1985167</text>
                </view>
                <view class="switch-content center">
                    <text class="switch-text">{{ checkedText }}</text>
                    <switch :checked="isNormal" @change="switchChange"/>
			    </view>
                <view class="button-group" @tap.stop="handleClick" v-if="!isNormal">
                    <button
                        class="row"
                        v-for="(item, index) in abnormalList"
                        :key="index"
                        size="mini"
                        @tap.stop="handleButtonClick(item)"
                    >
                        {{ item }}
                    </button>
                </view>

                <view class="center">
                    <uni-easyinput  v-model="value" focus placeholder="请输入内容" @input="input"></uni-easyinput>
                </view>
                <view class="tip-text center">
                    <text>请先扫描病人腕带</text>
                </view>
			</view>
	</view>
</template>

<script>
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import { mapMutations } from 'vuex';
import {formatTime} from '@/utils/util.js'
import {abnormalList} from './option.js'
import scanCode from '@/pages/pda/scanCode.vue'

let timer=null
export default {
	components: {
		rfLoadMore,
        scanCode
	},
	data() {
		return {
            nowTime: '',
            checked: true,
            checkedText: '正常',
            value: '',
            abnormalList,
            isNormal: true,
            scanResult: ''
		};
	},
    computed: {
    },

    onShow() {
        // 页面显示时，开始监听激光扫码事件
        this.listenToLaserScan();
    },

	onLoad(options) {
		this.onSetInterval();
	},

    onHide() {
        // 页面隐藏时，移除监听，避免不可见页面还响应事件
        this.removeLaserScanListener();
    },

    onUnload() {
        // 页面卸载时，也必须移除监听
        this.removeLaserScanListener();
    },
    
    beforeUnmount() {
		this.clearTimer();
	},

	methods: {
		...mapMutations(['setPatientInfo']),
		// 数据初始化
		initData() {
			this.getCouponList();
		},
  

		// 获取收货地址列表
		async getCouponList() {
		},

		navTo(route) {
			// this.$mRouter.push({ route });
		},

		input(){
		},

        onSetInterval(){
            timer = this.setInterval(() => {
                nowTime = formatTime(new Date())
            }, 1000);
        },

        clearTimer() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
		},
        handleClick(){

        },
        toggle(item){

        },
        switchChange() {
            this.isNormal = !this.isNormal
            if(this.isNormal){
                this.checkedText = '正常'
            }else {
                this.checkedText = '异常'
            }
        },
        handleButtonClick(item){

        },

        //
        listenToLaserScan() {
            // 监听全局事件
            uni.$on('onLaserScanResult', this.handleLaserResult);
        },

        removeLaserScanListener() {
            // 移除监听
            uni.$off('onLaserScanResult', this.handleLaserResult);
        },

        handleLaserResult(res) {
            const rawData = res.data;
            this.scanResult = `激光扫码: ${rawData}`;
            // 在这里调用你的业务处理函数，比如解析JSON、查询数据库等
            this.processScannedCode(rawData);
        },
        processScannedCode(code) {
            console.log('进行业务处理:', code);
            // TODO: 你的业务逻辑
        }
	}
};
</script>
<style lang="scss">

// .content {
//     display: flex;
//     justify-content: center;
//     flex-direction: column;
// }
page {
    background: white;
}
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16upx 0upx;
    flex-wrap: wrap;
}
.switch-text{
    margin-right: 10upx;
}
.button-group {
    display: flex;
    // justify-content: flex-start;
    flex-wrap: wrap;
    flex-direction: row;
}
.row{
    height: 54upx;
    margin-left: 10upx;
    margin-top: 10upx;
}
.tip-text {
    color: grey;
}
</style>