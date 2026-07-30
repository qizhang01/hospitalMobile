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
            <text>开始时间</text>
			<uni-datetime-picker type="date" :clear-icon="false" v-model="startDate" @maskClick="selectStartDate" />
		</view>
        <view class="date-selection">
            <text>结束时间</text>
			<uni-datetime-picker type="date" :clear-icon="false" v-model="endDate" @maskClick="selectEndDate" />
		</view>

        <button type="primary" class="confirm-button" @tap.stop="handleSelect">确定</button>
	</view>
</template>

<script>
	export default {
        props: {
            buttonList: {
                type: Array,
                default: []
            }
        },
		components: {

		},
		data() {
			return {
                startDate: null,
                endDate: null,
                selectedDayVal: 3
			};
		},
		methods: {
            handleButtonClick(item){
                this.selectedDayVal=item.value
                this.startDate = null
                this.endDate = null
                this.$emit('period-button-click', item)
            },

            handleSelect(){
                if(this.startDate||this.endDate){
                    this.$emit('handleSelect',{
                        startDate: this.startDate,
                        endDate: this.endDate
                    })
                }else if(this.selectedDayVal){
                    this.$emit('handleSelect', this.selectedDayVal)
                }
            }
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
