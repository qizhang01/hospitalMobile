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
            <text class="cell">#</text>
            <text class="cell">{{patientObj.Mrn}}</text>
        </view>
        <view class="line-cell_column" @tap="handleOnTap">
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
                uni.navigateTo({
                    url: `/pages/lifeSignQuery/index?inpatient=${this.patientObj.PatientId}`
                })
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
