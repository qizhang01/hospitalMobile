<template>
    <view class="container">
        <view class="coupon-center">
            <view>排药操作: {{ $store.state.scanCode}}</view>
            <view class="header-text">
                <text>排药 - 加药 - 执行</text>
            </view>
            <scroll-view>
                <view
                    class="progress-info"
                    v-for="(item, index) in medicines"
                    :key="index"
                >
                    <text>{{ item.order_name }}</text>
                    <text>{{ item.quantity }}{{ item.unit }}</text>
                </view>
                <view class="center patient-info" v-if="patientInfo">
                    <text class="item">{{ patientInfo.Name }} |</text>
                    <text class="item">{{ patientInfo.BedNo }}床 |</text>
                    <text class="item">{{ patientInfo.PhysiSexName }} |</text>
                    <text class="item">{{ getAgeByBirthdate(patientInfo.BirthDate) }} |</text>
                    <text>MRN {{ patientInfo.Mrn }}</text>
                </view>
            </scroll-view>
        </view>
        <view class="operate-group">
            <text>可继续扫描或者继续排药</text>
            <button type="primary" class="confirm-button" @tap.stop="operate">排药</button>
        </view>

        <rfLoading isFullScreen :active="loading"></rfLoading>
    </view>
</template>

<script>
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import { mapMutations, mapState } from 'vuex';
import {taskUrl} from '@/api/login'

export default {
	components: {
		rfLoadMore,
	},
	data() {
		return {
           patientInfo:  null,
           medicines: [],
           loading: true
		};
	},
    computed: {
        ...mapState(['cachePatientsList']),
    },
    
    onShow() {
        this.getInfo()
    },

	onLoad(options) {

	},

    beforeUnmount() {

	},

	methods: {
		...mapMutations(['setPatientInfo']),

        async getInfo(){
            this.loading = true
            const res = await this.$http.get(taskUrl + '?code=00219664382025010608003')
            if(res){
                this.patientInfo = this.cachePatientsList.filter(item=> item.PatientId==res.inpatient)[0]
                this.medicines = res.medicines
                this.loading = false
            }
        },

        getAgeByBirthdate(birthDate){
            if(birthDate){
                const today = new Date()
                return today.getFullYear() - Number(birthDate.slice(0,4))
            }else {
                return ''
            }
        },

        operate(){

        }

	}
};
</script>
<style lang="scss">

page {
    background: white;
    height: 100%;
}

.tip-text {
    color: grey;
}
.header-text {
    text-align: center;
    padding: 20upx 0;
}

.progress-info,
.drug-info {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid gray;
    height: 90upx;
    padding: 0 30upx;
    align-items: center;
}

.patient-info {
    display: flex;
    border-bottom: 1px solid gray;
    height: 90upx;
    padding: 0 30upx;
    align-items: center;
    .item {
        margin-right: 10upx;
    }
}
.progress-info {
    background-color: rgb(105, 98, 98, 0.3);
}
.container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 98%;
}
.operate-group {
    text-align: center;
}
</style>