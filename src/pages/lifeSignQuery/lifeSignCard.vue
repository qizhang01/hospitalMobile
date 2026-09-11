<template>
    <view>   
        <uni-card :title="getPlanned_time(infomation[0].planned_time)" :extra="getNameByRecordBy(infomation[0].record_by)">
            <text v-for="(v, index) in infomation" :key="key" class="life-sign_item uni-body">
                {{ v.name }}: <text style="color: #0081ff; margin-left: 10upx;">{{ getValue(v) }}</text>
            </text>
        </uni-card>
    </view>
</template>


<script>
import { mapState } from 'vuex';
export default {
	name: 'lifeSignCard',
    computed: mapState(['employees']),
	props: {
        infomation: Object
	},
	components: {

	},
	data() {
		return {

		};
	},
	filters: {

	},
	methods: { 
        getValue(item){
            if(item.name=='体温'){
                return `${item.value1}(${item.text1})${item.unit}`
            }else {
                const unit = item.unit ? item.unit : ''
                return item.value1? `${item.value1}${unit}`: `${item.text1}`
            }
        },

        getPlanned_time(time) {
            return time.slice(0,16).replace('T',' ')
        },

        getNameByRecordBy(recordBy){
           return this.employees.get(recordBy).name
        }
	}
};
</script>


<style>
.life-sign_title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: darkgrey;
    height: 50upx;
    align-items: center;
    padding: 0upx 16upx;
}
.life-sign_content {
    display: flex;
    flex-direction: column;
}
.life-sign_item{
    height: 40upx;
    margin-left: 16upx;
}
</style>