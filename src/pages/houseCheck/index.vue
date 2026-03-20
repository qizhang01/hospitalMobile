<template>
	<view class="container">
        <view class="group" @tap.stop="handleClick1">
            <image
                class="portrait"
                src="/static/tab-home-blue.png"
                mode="aspectFit"
            ></image>
            <text>体征待测</text>
        </view>
        <view class="group" @tap.stop="handleClick2">
            <image
                class="portrait"
                src="/static/tab-cate-blue.png"
                mode="aspectFit"
            ></image>
            <text>病区巡视</text>
        </view>
        <view class="group" @tap.stop="handleClick3">
            <image
                class="portrait"
                src="/static/tab-notify-blue.png"
                mode="aspectFit"
            ></image>
            <text>病区巡视记录</text>
        </view>
	</view>
</template>

<script>
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import { mapMutations } from 'vuex';
import {formatTime} from '@/utils/util.js'
import {abnormalList} from './option.js'

let timer=null
export default {
	components: {
		rfLoadMore,
	},
	data() {
		return {
            nowTime: '',
            checked: true,
            checkedText: '正常',
            value: '',
            abnormalList,
            isNormal: true,
		};
	},
    computed: {
    },

    onShow() {

    },

	onLoad(options) {
		this.onSetInterval();
	},

    onHide() {

    },

    onUnload() {

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
            timer =setInterval(() => {
                this.nowTime = formatTime(new Date())
            }, 1000);
        },

        clearTimer() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
		},
        handleClick1(){

        },

        handleClick2(){
            uni.navigateTo({
                url: '/pages/houseCheck/houseCheckAction/action'
            })
        },
        handleClick3(){
            uni.navigateTo({
                url: '/pages/houseCheck/houseCheckRecord/record'
            })
        }
	}
};
</script>
<style lang="scss">

page {
    background: white;
}

.container {
    display: flex;
    justify-content: space-around;
}
.group {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.portrait {
    display: flex;
    flex-direction: column;
    width: 100upx;
    height: 100upx;
}
</style>