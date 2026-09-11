<template>
    <view class="recharge">
		<view class="block">
            <uni-card  v-for="(item, index) in sheetList" :key="index" :title="item.fill_at.slice(0, 16).replace('T', ' ')"  :extra="item.fill_by">
                <text>{{ item.name }}</text>
            </uni-card>
		</view>
        <rf-empty
            :info="暂无文书信息"
            v-if="sheetList.length === 0 && !pageLoading"
        ></rf-empty>
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
.block {
	padding:10px 0px;
	margin-bottom: 4px;
}

</style>


