<template>
    <view
    >   
        <view class="life-sign_title">
            <text >{{ infomation.date }}</text>
            <text style="color: #0081ff;">{{ infomation.doctor }}</text>
        </view>
        <view class="life-sign_content">
            <text v-for="(v, key) in infomation.data" :key="key" class="life-sign_item">{{ translateObj[key] }}: {{ v }}</text>
        </view>
    </view>
</template>


<script>
import {translateObj} from './data'
export default {
	name: 'lifeSignCard',
	props: {
        infomation: Object
	},
	components: {

	},
	data() {
		return {
            translateObj
		};
	},
	filters: {

	},
	methods: {
       
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
    padding: 0upx 10upx;
}
.life-sign_content {
    display: flex;
    flex-direction: column;
}
.life-sign_item{
    height: 40upx;
    padding: 0upx 10upx;
}
</style>