<template>
	<view>
        <view class="button-group">
            <button 
                v-for ="(item, index) in buttonList" 
                :type="item.selected? 'primary': 'default'"
                @tap.stop="handleButtonClick(item)"
                class="mini-btn"
                size="mini"
                :key="index">
                {{ item.name }}
            </button>
        </view>
        <view class="date-selection">
			<uni-datetime-picker type="date" :clear-icon="false" v-model="startDate" @maskClick="selectStartDate" />
		</view>

        <button type="primary" class="confirm-button">确定</button>
	</view>
</template>

<script>
	export default {
        props: {
            buttonList: {
                type: Array,
                default: []
            },
        },
		components: {

		},
		data() {
			return {
                startDate: '',
			};
		},
		methods: {
            handleButtonClick(item){

            },
            selectStartDate(){

            },
		}
	};
</script>
<style lang="scss">
	page {
		background-color: $page-color-base;
	}
.button-group{
    display: flex;
    flex-direction: row;
}
.mini-btn {
    height:56upx;
}
.date-selection {
    margin: 20upx 0upx;
}
.confirm-button {
    margin: 20upx 30upx;
}
</style>
