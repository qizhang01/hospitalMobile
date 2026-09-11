<template>
    <view class="container">
        <view class="coupon-center">
            <uni-card :is-shadow="true" style="margin: 15px 8px; padding:0px" :class="'bg-' + themeColor.name">
                <view class="" v-if="patientInfo">
                    <text class="item rf-bolder">{{ patientInfo.Name }} |</text>
                    <text class="item rf-bolder">{{ patientInfo.BedNo }}床 |</text>
                    <text class="item">{{ patientInfo.PhysiSexName }} |</text>
                    <text class="item">{{ getAgeByBirthdate(patientInfo.BirthDate) }} |</text>
                    <text>MRN {{ patientInfo.Mrn }}</text>
                </view>
            </uni-card>
            <scroll-view>
                <view
                    class="progress-info"
                    v-for="(item, index) in medicines"
                    :key="index"
                >   
                    <uni-section :title="item.steps && item.steps[0].name" type="line">
                        <uni-card :title="item.plan_time.slice(0, 16).replace('T', ' ')" :extra="item.group+''">
                                <view v-for="(el, i) in item.medicines " :key="el.id" class="single-line">
                                    <text>{{ el.order_name }}</text>
                                    <text>{{ el.quantity }}{{ el.unit }}</text>
                                </view>
                        </uni-card>
                    </uni-section>
                </view>
            </scroll-view>
        </view>

        <rfLoading isFullScreen :active="loading"></rfLoading>
    </view>
</template>

<script>
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import { mapMutations, mapState } from 'vuex';
import {taskUrl, getInpatientTasksById} from '@/api/login'

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

	onLoad(options) {
        this.patientInfo = JSON.parse(options.patientInfo)
        this.getInfo(this.patientInfo.PatientId)
	},

	methods: {
		...mapMutations(['setPatientInfo']),

        async getInfo(inpatient){
            this.loading = true
            const res = await this.$http.get(getInpatientTasksById(inpatient))
            if(res){
                this.medicines = res.reverse()
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
    padding: 16upx 0;
}

.progress-info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .topic {
        background-color: rgb(105, 98, 98, 0.2);
    }
    .single-line {
        display: flex;
        justify-content: space-between;
        padding: 6upx 20upx;
    }
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