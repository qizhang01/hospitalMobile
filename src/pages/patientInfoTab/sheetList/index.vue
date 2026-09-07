<template>
	<view>
        <view
            class="info"
            v-for="(item, index) in sheetList"
            :key="index"
        >   
            <uni-card :title="item.fill_at.slice(0, 16).replace('T', ' ')" :extra="item.fill_by">
                <text>{{ item.name }}</text>
            </uni-card>
        </view>
		<!--加载动画-->
		<rfLoading isFullScreen :active="pageLoading"></rfLoading>
	</view>
</template>

<script>

export default {
	data() {
		return {
			pageLoading: false,
            sheetList: []
		};
	},
	onLoad(options) {
        const patientInfo = JSON.parse(options.patientInfo)
        this.getSheetListById(patientInfo.PatientId)
	},

	methods:{
        getSheetListById(PatientId){
            this.pageLoading = true
            this.$http.get("/api/sheet?inpatient="+PatientId).then(res=>{
                this.sheetList = res
                this.pageLoading = false
            })
        }
	}
};
</script>

<style lang="scss">
page {
	background-color: #f1f1f1;
}
</style>