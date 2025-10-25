<template>
	<view class="coupon-center">
			<view class="">
				<view class="">
					<view class="rf-top-item rf-icon-ml">
						<text>{{ nowTime }}</text>
					</view>
					<view class="" @tap.stop="handleClick">
                        <text>病区巡视记录</text>
                    </view>
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

let timer=null
export default {
	components: {
		rfLoadMore
	},
	data() {
		return {
            nowTime: '',
            checked: true,
            checkedText: '正常',
            value: '',
            abnormalList,
            isNormal: true
		};
	},
    computed: {
    },
	onLoad(options) {
		// this.type = options.type;
		this.onSetInterval();
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

        }
	}
};
</script>
<style lang="scss">
// .coupon-center {
//     display: flex;
//     justify-content: center;
// }
// .content {
//     display: flex;
//     justify-content: center;
//     flex-direction: column;
// }
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