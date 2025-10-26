<template>
	<view class="line-cell">
        <view class="line-cell_column">
            <text class="cell">{{patientObj.bedNo}}</text>
            <text class="cell">{{patientObj.name}}</text>
        </view>
        <view class="line-cell_column">
            <text class="cell">{{patientObj.gender}}</text>
            <text class="cell">{{patientObj.age}}</text>
        </view>
        <view class="line-cell_column">
            <text class="cell">#</text>
            <text class="cell">{{patientObj.MRNumber}}</text>
        </view>
        <view class="line-cell_column">
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
