<template>
	<view class="coupon-center">
			<view class="rf-header-screen">
				<view class="rf-screen-top">
					<view class="rf-top-item rf-icon-ml">
						<text>{{ nowTime }}</text>
					</view>
					<view class="rf-top-item">
						<text>病房巡视</text>
					</view>
					<view class="rf-dropdownlist-mask" @tap.stop="handleClick">
                        <text>病区巡视记录</text>
                    </view>
				</view>
			</view>
			<view class="sub-list valid">
                <view class="rf-dropdownlist-mask" @tap.stop="handleClick">
                    <text>高香弟</text>
                </view>

                <view class="rf-dropdownlist-mask" @tap.stop="handleClick">
                    <text>101床|男|72|MRN1985167</text>
                </view>
                <view class="uni-list-cell uni-list-cell-pd">
                    <view class="uni-list-cell-db">{{ checkedText }}</view>
                    <switch checked @change="switchChange"/>
			    </view>
                <button type="primary">页面主操作 Normal</button>
                 
                <view class="rf-dropdownlist-mask" @tap.stop="handleClick">
                    <button
                        class="row"
                        v-for="(item, index) in abnormalList"
                        :key="index"
                        @tap.stop="handleButtonClick(item)"
                    >
                        
                    </button>
                </view>

                <view class="uni-form-item uni-column">
                    <input class="uni-input" confirm-type="search" placeholder="请输入其他异常状态" />
                </view>
                <view class="rf-dropdownlist-mask">
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

export default {
	components: {
		rfLoadMore
	},
	data() {
		return {
            nowTime: '',
            checked: true,
            checkedText: '正常'
		};
	},
    computed: {
    },
	onLoad(options) {
		// this.type = options.type;
		// this.initData();
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

		handleClick(item){
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

        },
        handleButtonClick(item){

        }
	}
};
</script>
<style lang="scss">


</style>