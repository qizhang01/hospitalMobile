<template>
	<view class="container">
			<view class="">
				<view class="">
					<view class="rf-top-item rf-icon-ml">
						<text>{{ nowTime }}</text>
					</view>
					<view class="">
                        <text>病区巡视记录</text>
                    </view>
                    <!-- <view>扫描结果：{{ this.$mStore.state.scanCode}}</view> -->
                    <view>扫描结果：{{ scanCode}}</view>
				</view>
			</view>
			<view class="content">
                <view class="center" @tap.stop="toggleShow">
                    <text>{{patientInfo.Name}}</text>
                </view>

                <view class="center" >
                    <text>101床|男|72|MRN1985167</text>
                </view>
                <view class="switch-content center">
                    <text class="switch-text">{{ checkedText }}</text>
                    <switch :checked="isNormal" @change="switchChange"/>
			    </view>
                <view class="button-group" v-if="!isNormal">
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
            <view class="rf-dropdownlist" :class="[isShowDetail?'rf-dropdownlist-show':'']" @tap.stop="toggleShow">
                <view class="rf-dropdownlist-item rf-underline">
                    <text class="rf-middle rf-bolder">{{ patientInfo.Name }}</text>
                    <view class="rf-middle">
                        <text class="rf-bolder rf-divider">{{patientInfo.BedNo}} 床</text>
                        <text class="rf-bolder rf-divider">72岁</text>
                        <text class="rf-bolder margin-left-2">#{{ patientInfo.Wristband }}</text>
                    </view>
                    <text class="rf-middle rf-bolder">二级</text>
                </view>
                <view class="rf-dropdownlist-item">
                    <view class="rf-group">
                        <view class="left-content">
                            <text class="rf-ml rf-middle">护理级别:</text>
                            <text class="rf-ml rf-middle">{{ patientInfo.NursingClass }}</text>
                        </view>
                        <view class="right-content">
                            <text class="rf-ml rf-middle">入院时间:</text>
                            <text class="rf-ml rf-middle">{{ patientInfo.AdmissionTime.slice(0,10) }}</text>
                        </view>
                    </view>
                    <view class="rf-group">
                        <view>
                            <text class="rf-ml rf-middle">主诊医生:</text>
                            <text class="rf-ml rf-middle">{{ patientInfo.ReceptTreatDrName }}</text>
                        </view>
                        <view>
                            <text class="rf-ml rf-middle">入住科室:</text>
                            <text class="rf-ml rf-middle">{{ patientInfo.AdmissionDeptName }}</text>
                        </view>
                    </view>

                    <view class="rf-group">
                        <view>
                            <text class="rf-ml rf-middle">医保费别:</text>
                            <text class="rf-ml rf-middle">{{ patientInfo.ChargeTypeName }}</text>
                        </view>
                        <view>
                            <text class="rf-ml rf-middle">预缴款项:</text>
                            <text class="rf-ml rf-middle">{{ patientInfo.PrePayment }}</text>
                        </view>
                    </view>
                    <view class="rf-group">
                        <view>
                            <text class="rf-ml rf-middle">费用合计:</text>
                            <text class="rf-ml rf-middle">{{ patientInfo.TotalCost }}</text>
                        </view>
                        <view>
                            <text class="rf-ml rf-middle">过敏史:</text>
                            <text class="rf-ml rf-middle">{{ }}</text>
                        </view>
                    </view>

                    <view class="rf-group">
                        <view>
                            <text class="rf-ml rf-middle">诊断:</text>
                            <text class="rf-ml rf-middle">{{ patientInfo.DiagnosisName }}</text>
                        </view>
                        <view>
                            <text class="rf-ml rf-middle">饮食:</text>
                            <text class="rf-ml rf-middle">{{ patientInfo.Diet }}</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="rf-dropdownlist-mask" :class="[isShowDetail?'rf-mask-show':'']" @tap.stop="toggleShow">
                
            </view>
	</view>
</template>

<script>
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import { mapMutations } from 'vuex';
import {formatTime} from '@/utils/util.js'
import {abnormalList} from '../option.js'
import { mapState } from 'vuex';
let timer=null
export default {
    computed: {
        ...mapState(['patientList','scanCode']),
        patientInfo(){
            return this.patientList? this.patientList[0]: {}
        }
    },
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
            isShowDetail: false,
		};
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
		// 数据初始化
		initData() {
			this.getCouponList();
		},
  
		navTo(route) {
			// this.$mRouter.push({ route });
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

        toggleShow(){
            console.log(this.patientList)
            this.isShowDetail = !this.isShowDetail
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

        async getPatientList(selectedValue="2901") {
            const id = ''
            const res = await this.$http
                .get(`/api/ward/${selectedValue}/inpatients`)
                
        }
	}
};
</script>
<style lang="scss">
	page {
		background: $page-color-base;
	}
    .container {
        padding: 30upx;
        background: white;
    }
    // page {
    //     background: white;
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
		top: 0upx;
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
        height: 600upx;
        max-height: 900upx;
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
        display: flex;
        flex-direction: column;
        padding-top: 20upx;
    }
    .rf-ml {
        margin: 20upx;
    }
    .rf-group {
        display: flex;
        justify-content: space-between;
    }
    .rf-middle {
        text-align: center;
    }
    .rf-underline {
        border-bottom: 1px solid gray;
    }
    .rf-bolder {
        font-size: 16px;
        font-weight: 500;
    }
    .rf-divider {
        border-right: 1px solid gray;
        padding: 0 10upx;
    }
    .margin-left-2 {
        margin-left: 10upx;
    }
</style>