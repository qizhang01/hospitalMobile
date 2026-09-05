<template>
	<view class="container">
        <view>
            <view class="rf-header-screen" >
                <view class="rf-screen-top">
                    <view class="rf-top-item rf-icon-ml" :class="[tabIndex==0? `text-${themeColor.name} rf-bold`:'']" @tap="selectQueryType">
                        <text>{{selectedType}}</text>
                        <text class="iconfont" :class="tabIndex==0?'iconshang':'iconxia'"></text>
                    </view>
                    <view class="rf-top-item" :class="[tabIndex == 1?`text-${themeColor.name} rf-bold`:'']" @tap="selectTypeItem">
                        <text>{{ selectedTypeItem}}</text>
                        <text class="iconfont" :class="tabIndex==1?'iconshang':'iconxia'"></text>
                    </view>
                    <!--下拉选择列表--综合-->
                    <view class="rf-dropdownlist" :class="[selectH>0?'rf-dropdownlist-show':'']">
                        <buttonGroup :buttonList="typeOption" v-if="dropdownIndex==1" @buttonItemClick="handleTypeClick"></buttonGroup>
                        <timeSelect :buttonList="timeOption" v-else="dropdownIndex==2" @timeItemClick="handleTimeItemClick" @buttonClick="handleButtonClick"></timeSelect>
                    </view>
                    <view class="rf-dropdownlist-mask" :class="[selectH>0?'rf-mask-show':'']" @tap.stop="hideDropdownList"></view>
                    <!--下拉选择列表--综合-->
                </view>
                <view class="line-header" :class="[`bg-${themeColor.name}`]"">
                    <text>床号/姓名</text>
                    <text>性别/年龄</text>
                    <text>MRN</text>
                    <text></text>
                </view>
            </view>
            <scroll-view scroll-y="true" class="patient-list_container">
                <lineCell v-for="(item, index) in dataList" :key="index" :patientObj="item"></lineCell>
            </scroll-view>
            <!--页面加载动画-->
            <rfLoading isFullScreen :active="loading"></rfLoading>
            <rf-back-top :scrollTop="scrollTop"></rf-back-top>
        </view>
        <view class="operate-group">
            <button type="primary" class="confirm-button" @tap.stop="refresh">
                刷新
            </button>
        </view>
        
	</view>
</template>

<script>
    import {mockData, typeOption, timeOption} from './data'
    import lineCell from './components/lineCell.vue';
    import buttonGroup from '../../lifeSignQuery/components/buttonGroup.vue';
    import timeSelect from '../../lifeSignQuery/components/timeSelect.vue';
	import { mapMutations, mapState } from 'vuex';
    import { getStandardTime } from '@/utils/util'
	export default {
        computed: mapState(['cachePatientsList']),
		components: {
            lineCell,
            buttonGroup,
            timeSelect
		},
		data() {
			return {
                dataList: [],
                typeOption,
                timeOption,
				loading: true,
				scrollTop: 0,
                selectedType: '体温待测',
                selectedTypeItem: '2:00',
                selectH: 0,
                dropdownIndex: 0,
                tabIndex: 1,
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},

		onShow() {
            this.getTempatureNoSurveyList()
		},

		// 下拉刷新
		onPullDownRefresh() {

		},
		// 加载更多
		onReachBottom() {

		},

		methods: {
			// 数据初始化
			initData() {

			},

			// 通用跳转
			navTo(route) {
				this.$mRouter.push({ route });
			},
            
            refresh(){
                this.getTempatureNoSurveyList()
            },

            getTempatureNoSurveyList(){
                this.loading = true
                const fromTime = encodeURIComponent(getStandardTime(new Date()))
                const userInfo = uni.getStorageSync('userInfo');
                
                // 获取新医嘱列表
                Promise.all(userInfo.wards.map(item=>this.$http.get(`/api/ward/${item.id}/vitals?from=${fromTime}&name=体温`)))
                .then(data=>{
                    const hasDataList = data.flat().map(item=> item.inpatient)
                    this.dataList = this.cachePatientsList.filter(item=> !hasDataList.includes(item.PatientId))
                    this.loading = false
                }).catch(err=>{
                    this.loading = false
                })
            },

            selectQueryType(){
                this.selectH = 1
                this.dropdownIndex = 1
            },

            selectTypeItem(){
                this.selectH = 1
                this.dropdownIndex = 3
            },

            handleButtonClick(payload){
                this.timeOption = this.timeOption.map(item=>{
                    if(item.id==payload.id){
                        return {
                        ...item,
                        selected: true
                        }
                    }else {
                        return {
                            ...item,
                            selected: false
                        }
                    }
                })
            },
            
            handleTimeItemClick(payload){
                this.selectedTypeItem = payload.timeItem
                this.hideDropdownList()
            },

            handleTypeClick(playLoad){
                this.selectH = 0
                this.selectedType = playLoad.name
                this.hideDropdownList()
            },

            hideDropdownList(){
                this.selectH = 0
            }
		}
	};
</script>
<style lang="scss">
	page {
		background-color: $page-color-base;
        height: 100%;
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


		/*screen*/
		.rf-header-screen {
			width: 100%;
			background: $color-white;
			position: fixed;
			z-index: 99;
			.rf-screen-top {
				border: none;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28upx;
				color: #333;
			}
			.rf-screen-top {
				height: 88upx;
				line-height: 88upx;
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
		}
        .line-header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        .patient-list_container {
            padding-top: 130upx;
            .line-header {
                height: 50upx;
                color: white;
                line-height: 50upx;
            }
            height:76vh;
        }
        .container{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
        }
</style>
