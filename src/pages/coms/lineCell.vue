<template>
	<view class="line-cell">
        <view class="line-cell_column">
            <text class="cell">{{patientObj.BedNo}}</text>
            <text class="cell">{{patientObj.Name}}</text>
        </view>
        <view class="line-cell_column">
            <text class="cell">{{patientObj.PhysiSexName}}</text>
            <text class="cell">{{patientObj.Age}}</text>
        </view>
        <view class="line-cell_column">
            <text class="cell">{{ patientObj.nursing_class }}级</text>
            <text class="cell">{{patientObj.Mrn}}</text>
        </view>
        <view class="line-cell_column" @tap="handleOnTap">
            <text v-if="patientObj.state" :class="{ 'text-blue': patientObj.state=='NORMAL' }">
                {{ patientObj.state=='NORMAL'? '正常': patientObj.remark }}
            </text>
            <text v-else class="text-red-color">未巡视</text>
        </view>
        <view class="line-cell_column" @tap.stop="handleOnTap">
            <text class="iconfont iconyou"></text>
        </view>
    </view>
</template>

<script>
	export default {
        props: {
            patientObj: {
                type: Object,
                default: {}
            },
        },
		components: {

		},
		data() {
			return {

			};
		},

		methods: {

            handleOnTap(){
                if(!this.patientObj.state){
                    uni.navigateTo({
                        url: `/pages/houseCheck/houseCheckAction/action?patientInfo=${JSON.stringify(this.patientObj)}`
                    })
                }
            }
        }
	};
</script>
<style lang="scss">
	page {
		background-color: $page-color-base;
	}
.line-cell {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid gray;
    padding-left: 16upx;
    padding-right: 16upx;
}
.line-cell_column {
    display: flex;
    flex-direction: column;
    align-items: center;
    .cell {
        width: 110upx;
        text-align: center;
    }
}
</style>
