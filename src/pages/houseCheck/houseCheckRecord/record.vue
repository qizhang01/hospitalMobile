<template>
	<view class="coupon-center">
        <view class="rf-header-screen">
            <view class="rf-screen-top">
                <view class="rf-top-item rf-icon-ml" :class="[tabIndex==0? `text-${themeColor.name} rf-bold`:'']" data-index="0" @tap="screen">
                    <text>{{selectedTimeName}}</text>
                    <text class="iconfont" :class="tabIndex==0?'iconshang':'iconxia'"></text>
                </view>
                <view class="rf-top-item" :class="[tabIndex == 1?`text-${themeColor.name} rf-bold`:'']" @tap="screen" data-index="1">
                    <text>{{ selectedGroupName }}</text>
                    <text class="iconfont" :class="tabIndex==1?'iconshang':'iconxia'"></text>
                </view>
                <!--下拉选择列表--综合-->
                <view class="rf-dropdownlist" :class="[selectH>0?'rf-dropdownlist-show':'']">
                    <view class="rf-dropdownlist-item rf-icon-middle" :class="[item.selected?'rf-bold':'']" v-for="(item,index) in typeList" :key="index" @tap.stop="dropdownItem" :data-index="index" v-if="tabIndex==1">
                        <text class="rf-ml rf-middle">{{item.name}}</text>
                        <text class="iconfont icongouxuan" :class="'text-' + themeColor.name" v-if="item.selected"></text>
                    </view>
                    <periodSelect :buttonList="dateList" v-if="tabIndex==0" @handleSelect ="handleSelect"  @period-button-click="handlePeriodButtonClick"></periodSelect>
                </view>
                <view class="rf-dropdownlist-mask" :class="[selectH>0?'rf-mask-show':'']" @tap.stop="hideDropdownList"></view>
            </view>
        </view>
        <scroll-view scroll-y="true" class="patient-list_container">
            <view class="line-header" :class="[`bg-${themeColor.name}`]"">
                <text style="width: 50px; text-align: center;">姓名</text>
                <text style="width: 50px; text-align: center;">年龄</text>
                <text style="width: 100px; text-align: center;">护理级别/MRN</text>
                <text style="width: 50px; text-align: center;">状态</text>
                <text style="width: 50px; text-align: center;">操作</text>
            </view>
            <lineCell v-for="(item, index) in patientList" :key="index" :patientObj="item"></lineCell>
            <rf-empty
                info="暂无患者信息"
                v-if="patientList.length === 0 && !loading"
            ></rf-empty>
        </scroll-view>
	</view>
</template>

<script>
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import { mapMutations, mapState } from 'vuex';
import {typeList, dateList} from './option.js'
import periodSelect from '@/pages/lifeSignQuery/components/periodSelect.vue';
import lineCell from '../../coms/lineCell.vue';
import {getInspectRecordUrl} from '@/api/login'

let cacheList = []
export default {
    computed: mapState(['cachePatientsList']),
    components: {
        lineCell,
        rfLoadMore,
        periodSelect
    },
	data() {
		return {
            loadingType: 'nomore',
			loading: false,
			selectH: 0,
			selectedTimeName: "今日",
			selectedGroupName: "全部",
			tabIndex: 0,
            typeList,
            dateList,
            patientList: [],
		};
	},


    onShow() {
        this.getInspectList()
    },

	onLoad(options) {

	},

    onHide() {

    },

    onUnload() {

    },
    
    beforeUnmount() {

	},

	methods: {
		navTo(route) {
			// this.$mRouter.push({ route });
		},

		hideDropdownList() {
			this.selectH = 0
		},
        
        getInspectList(){
            const userInfo = uni.getStorageSync('userInfo');
            Promise.all(userInfo.wards.map(item=>this.$http.get(getInspectRecordUrl(item.id))))
            .then(data=>{

                let mergeList= data.flat().map(item=>{
                    const filterItem = this.cachePatientsList.filter(el=>{
                        return el.PatientId == item.inpatient
                    })
                    if(filterItem.length>0){
                        return {
                            ...item,
                            ...filterItem[0],
                        }
                    }else {
                        return item
                    }
                })
                this.patientList = mergeList
                cacheList = mergeList
            })
        },


		screen(e) {
			let index = parseInt(e.currentTarget.dataset.index, 10);
			this.selectH = 1;
			this.tabIndex = index;
		},

		dropdownItem(e) {
			let index = parseInt(e.currentTarget.dataset.index, 10);
			let arr = this.typeList;
			for (let i = 0; i < arr.length; i++) {
				if (i === index) {
					arr[i].selected = true;
                    this.selectedGroupName = arr[i].name
				} else {
					arr[i].selected = false;
				}
			}

			this.typeList = arr;
			this.selectH = 0;
            this.patientList = cacheList.filter(item=>{
                if(this.selectedGroupName=='正常'){
                    return item.state=='NORMAL'
                }else if(this.selectedGroupName=='异常'){
                    return item.state=='ABNORMAL'
                }else {
                    return item
                }
            })
		},

        handleSelect(){
            this.selectH = 0;
        },

        handlePeriodButtonClick(item){
            this.dateList = this.dateList.map(el=>{
                if(el.id==item.id){
                    return {
                        ...el,
                        selected: true
                    }
                }else {
                    return {...el, selected: false}
                }
            })
        }
	}
};
</script>
<style lang="scss">

    page {
        height: 100%;
        background: white;
    }
    .patient-list_container {
        padding-top: 80upx;
    }
    .line-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-left: 16upx;
        padding-right: 16upx;
    }
	.rf-dropdownlist {
		width: 100%;
		position: absolute;
		background: $color-white;
		border-bottom-left-radius: 24upx;
		border-bottom-right-radius: 24upx;
		overflow: hidden;
		box-sizing: border-box;
		padding-top: 10upx;
		padding-bottom: 26upx;
		left: 0;
		top: 88upx;
		visibility: hidden;
		transition: all 0.2s ease-in-out;
		z-index: 99;
		.icongouxuan {
			font-size: $font-lg;
			line-height: 88upx;
		}
	}
	.rf-dropdownlist-show {
		visibility: visible;
        max-height: 900upx;
	}
	.rf-dropdownlist-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: -1;
		transition: all 0.2s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}
	.rf-mask-show {
		opacity: 1;
		visibility: visible;
	}
	.rf-dropdownlist-item {
		color: #333;
		height: 70upx;
		font-size: 28upx;
		padding: 0 40upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.rf-header-screen {
		width: 100%;
		background: $color-white;
		position: fixed;
		// top: 45px;
		z-index: 99;
		.rf-screen-top
		{
			border: none;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28upx;
			color: #333;
			height: 70upx;
			line-height: 70upx;
			position: relative;
			background: $color-white;
		}

		.rf-top-item {
			height: 28upx;
			line-height: 28upx;
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			.iconfont {
				font-size: $font-lg + 4upx;
				font-weight: 500;
			}
		}
		.rf-bold {
			font-weight: bold;
		}

		.rf-ml {
			margin-left: 6upx;
		}

		.rf-middle {
			vertical-align: middle;
		}
	}
</style>