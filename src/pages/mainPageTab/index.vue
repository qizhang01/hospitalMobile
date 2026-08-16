<template>
	<view class="coupon-center">
		<!--搜索导航栏-->
        
            <view class="rf-header-screen" >
                <view class="search-box" :class="'bg-' + themeColor.name">
                <!-- <mSearch
                    class="mSearch-input-box"
                    :mode="2"
                    button="inside"
                    placeholder="请输入关键字"
                    @search="doSearch(false)"
                    @confirm="doSearch(false)"
                    v-model="keyword"
                ></mSearch> -->
                <uni-search-bar 
                    class="mSearch-input-box"
                    placeholder="请输入关键字"
                    cancel-text="搜索"
                    cancelButton = 'always'
                    clearButton = 'always'
                    @confirm="search" 
                    :focus="true" 
                    v-model="keyword"
                    @blur="blur"
                    @cancel="cancel" 
                    @clear="clear">
                </uni-search-bar>
            </view>
			<view class="rf-screen-top">
				<view class="rf-top-item rf-icon-ml" :class="[tabIndex==0? `text-${themeColor.name} rf-bold`:'']" @tap="selectPatientRelationship">
					<text>{{selectedPatientRelationship}}</text>
					<text class="iconfont" :class="tabIndex==0?'iconshang':'iconxia'"></text>
				</view>
				<view class="rf-top-item" :class="[tabIndex == 1?`text-${themeColor.name} rf-bold`:'']" @tap="selectOther">
					<text>{{ selectedOtherItem}}</text>
					<text class="iconfont" :class="tabIndex==1?'iconshang':'iconxia'"></text>
				</view>
				<view class="rf-top-item" :class="[tabIndex == 2?`text-${themeColor.name} rf-bold`:'']" @tap="selectPatientType">
					<text>{{ selectedPatientGroup }}</text>
					<text class="iconfont " :class="tabIndex==2?'iconshang':'iconxia'"></text>
				</view>
				<!--下拉选择列表--综合-->
				<view class="rf-dropdownlist" :class="[selectH>0?'rf-dropdownlist-show':'']">
					<view class="rf-dropdownlist-item rf-icon-middle" :class="[item.selected?'rf-bold':'']" v-for="(item,index) in dropdownList" :key="index" @tap.stop="dropdownItem(index)">
						<view>
                            <text class="rf-ml rf-middle rf-margin-right-20">{{item.name}}</text>
                            <text class="rf-ml rf-middle" :class="'text-' + themeColor.name">{{ item.number }}</text>
                        </view>
						<text class="iconfont icongouxuan" :class="'text-' + themeColor.name" v-if="item.selected"></text>
					</view>
				</view>
				<view class="rf-dropdownlist-mask" :class="[selectH>0?'rf-mask-show':'']" @tap.stop="hideDropdownList"></view>
            </view>
		</view>
        <view scroll-y="true" class="rf-content">
            <patientInfoList :list="patientList"></patientInfoList>
            <rf-load-more
                :status="loadingType"
                v-if="patientList.length > 0"
            ></rf-load-more>
            <rf-empty
                :info="errorInfo || '暂无患者信息'"
                v-if="patientList.length === 0 && !loading"
            ></rf-empty>
        </view>
		<!--页面加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
		<!-- <rf-back-home></rf-back-home> -->
	</view>
</template>

<script>

	import rfSearchBar from '@/components/rf-search-bar';
    import patientInfoList from './patientInfoList'
	import { mapMutations, mapState} from 'vuex';
    import {computed} from 'vue'
    import {patientRelationship} from './option.js'
    import {taskStatesUrl, workflowsUrl, suppliesUrl, usersUrl, wardUrl} from '@/api/login'
    import mSearch from '@/components/rf-search/rf-search';
    import { getDiffDays, getStandardTime } from '@/utils/util'
    import {get2Digtal} from '@/utils/util'
    
	export default {
		components: {
			rfSearchBar,
            mSearch,
            patientInfoList,
		},
        computed: mapState(['userInfo', 'cachePatientsList']),

		data() {
			return {
				loading: true,
				scrollTop: 0,
                selectedPatientRelationship: '所有病人',
                selectedOtherItem: '其他筛选',
                selectedPatientGroup: '患者分组',
                selectH: 0,
                dropdownIndex: 0,
                patientRelationship,
                patientGroup: [],
                dropdownList: [],
                tabIndex: 1,
                patientList: [],
                loadingType: 'nomore',
                keyword: ''
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},

        onLoad(options) {
            this.getSupply();
            this.getTaskState();
            this.getUsers();
            this.getWorkflows()
            this.getPatientList();
            if(uni.getStorageSync('userInfo')){
                this.$mStore.commit('login', uni.getStorageSync('userInfo'));
            }
        },
		// 下拉刷新
		onPullDownRefresh() {

		},
		// 加载更多
		onReachBottom() {

		},
		methods: {
            ...mapMutations(['setPatientList','setSupply','setTaskState','setEmployees', 'setWorkflows']),
			// 顶部tab点击
			tabClick({ id }) {
                
			},

			// 通用跳转
			navTo(route) {
				this.$mRouter.push({ route });
			},

			// 通用跳转
			navToSearch() {
				this.$mRouter.push({
					route: `/pages/mainPageTab/search/search?data=${JSON.stringify(this.search)}`
				});
			},

            selectPatientRelationship(){
                this.selectH = 1
                this.dropdownIndex =0
                this.tabIndex = 0
                this.dropdownList=this.patientRelationship
            },

            selectOther(){
                // this.selectH = 1
                this.dropdownIndex =1
                this.tabIndex = 1
                this.dropdownList = []
            },

            selectPatientType(){
                this.selectH = 1
                this.dropdownIndex =2
                this.tabIndex = 2
                this.dropdownList = this.patientGroup
            },
            hideDropdownList() {
                this.selectH = 0
            },
            dropdownItem(index){
                let arr = this.dropdownList;
				for (let i = 0; i < arr.length; i++) {
					if (i === index) {
						arr[i].selected = true;
					} else {
						arr[i].selected = false;
					}
				}
				this.dropdownList = arr;
				if(this.dropdownIndex===0){
					this.patientRelationship = arr
					this.selectedPatientRelationship = arr[index].name;
				}else if(this.dropdownIndex===1){

				}else if(this.dropdownIndex===2){
                    this.patientGroup = arr
					this.selectedPatientGroup = arr[index].name;
                    this.filter(this.selectedPatientGroup)
                }
				this.selectH = 0;
            },
            
            filter(info){
                switch (info) {
                    case '全部标识': 
                        this.patientList = this.cachePatientsList
                        break;

                    case '新病人': 
                        this.patientList = this.cachePatientsList.filter(item=>item.isNewPatient) 
                        break;

                    case '过敏':
                        this.patientList = this.cachePatientsList.filter(item=>item.Allergy)  
                        break;

                    case '新医嘱': 
                        this.patientList = this.cachePatientsList.filter(item=>item.hasNewDoctorAdvice) 
                        break;
                    case '手术': 
                        this.patientList = this.cachePatientsList.filter(item=>item.SurgeryHistory)
                        break;

                    case '欠费': 
                        this.patientList = this.cachePatientsList.filter(item=>item.ArrearFlag) 
                        break;

                    case '发热': 
                        this.patientList = this.cachePatientsList.filter(item=>item.isHighTemperature) 
                        break;

                    case '静滴静推': 
                        this.patientList = this.cachePatientsList.filter(item=>item.ArrearFlag) 
                        break;

                    default: 
                    this.patientList = cachePatientsList
                }
            },
            async getUsers(){
                const res= await this.$http
                            .get(usersUrl)
                if(res){
                    this.setEmployees(res)
                }
            },
            async getPatientList(type="") {
                const userInfo = uni.getStorageSync('userInfo');
                
                // 获取新医嘱列表
                let newDoctorAdviceList = []
                await Promise.all(userInfo.wards.map(item=>this.$http.get(`/api/ward/${item.id}/orders?from=${encodeURIComponent(getStandardTime(new Date()))}`))).then(data => {
                    data.flat().forEach(item=>{
                       if(item){
                            newDoctorAdviceList.push(item.inpatient)
                       }
                    })
                })

                // 获取高温病人列表
                let highTemperatureList = []
                const fromTime = encodeURIComponent(getStandardTime(new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000)))
                const toTime = encodeURIComponent(getStandardTime(new Date()))
                await Promise.all(userInfo.wards.map(item=>this.$http.get(`/api/ward/${item.id}/vital?from=${fromTime}&to=${toTime}&name=体温`))).then(data => {
                    highTemperatureList = data.flat().filter(item=>Number(item.value1)>=40).map(item=>item.inpatient)
                })

                const requestArr = userInfo && userInfo.wards.map(item=>{
                    return this.$http
                            .get(`${wardUrl}/${item.id}/inpatients`)
                })

                if(requestArr){
                    this.loading = true
                    Promise.all(requestArr).then(async response=>{
                        let finishedDoctorAdviceList = []
                        await Promise.all(response.flat().map(item=>this.$http.get(this.getParams(item.PatientId))))
                            .then(data => {
                                finishedDoctorAdviceList = data.flat().map(item=>item.inpatient)
                            })

                        const result= response.flat().map(item=>({
                            ...item,
                            Age: new Date().getFullYear()- Number(item.BirthDate.substr(0,4)),
                            isNewPatient: getDiffDays(item.AdmissionWardTime) <= 3,
                            hasNewDoctorAdvice: newDoctorAdviceList.includes(item.PatientId),
                            isHighTemperature: highTemperatureList.includes(item.PatientId),
                            isFinishedDoctorAdvice: !finishedDoctorAdviceList.includes(item.PatientId)
                        }))
                        this.loading = false;
                        if (type === 'refresh') {
                            uni.stopPullDownRefresh();
                        }
                        // this.loadingType = result.length === 10 ? 'more' : 'nomore';
                        this.patientList = result;
                        this.setPatientList(result)
                        this.setPatientGroupList(result)
                    })
                }
            },
            
            getParams(id){
                const day = new Date()
                const fromTime = `${day.getFullYear()}-${get2Digtal(day.getMonth()+1)}-${get2Digtal(day.getDate())}T00:00:00+08:00`
                const toTime = `${day.getFullYear()}-${get2Digtal(day.getMonth()+1)}-${get2Digtal(day.getDate())}T23:59:59+08:00`
                return `/api/inpatient/${id}/tasks?from=${encodeURIComponent(fromTime)}&to=${encodeURIComponent(toTime)}&active=true`
            },

            async getSupply(){
                const res = await this.$http.get(suppliesUrl)
                if(res){
                    this.setSupply(res)
                }
            },
            async getWorkflows(){
                const res = await this.$http.get(workflowsUrl)
                if(res){
                    this.setWorkflows(res)
                }
            },

            async getTaskState(){
                const res = await this.$http.get(taskStatesUrl)
                if(res){
                    this.setTaskState(res)
                }
            },
            setPatientGroupList(patientList){
                const newPatientNum=  patientList.filter(item=>item.isNewPatient).length
                
                const allergyPatientNum= patientList.filter(item=>item.Allergy).length
                const ArrearFlag = patientList.filter(item=>item.ArrearFlag==1).length
                const finishNum = patientList.filter(item=>item.DischargeStatus!=='INHOSPITAL').length
                const surgeryPatientNum = patientList.filter(item=>item.SurgeryHistory).length
                const newDoctorAdviceNum = patientList.filter(item=>item.hasNewDoctorAdvice).length
                const highTemperatureNum = patientList.filter(item=>item.isHighTemperature).length

                this.patientGroup=[
                    {
                        id: 0,
                        selected: true,
                        number: '',
                        name: '全部标识'
                    },{
                        id: 1,
                        selected: false,
                        number: newPatientNum,
                        name: '新病人'
                    },{
                        id: 2,
                        selected: false,
                        number: allergyPatientNum,
                        name: '过敏'
                    },{
                        id: 3,
                        selected: false,
                        number: newDoctorAdviceNum,
                        name: '新医嘱'
                    },{
                        id: 4,
                        selected: false,
                        number: surgeryPatientNum,
                        name: '手术'
                    },{
                        id: 5,
                        selected: false,
                        number: ArrearFlag,
                        name: '欠费'
                    },{
                        id: 6,
                        selected: false,
                        number: highTemperatureNum,
                        name: '发热'
                    },{
                        id: 7,
                        selected: false,
                        number: '',
                        name: '静滴静推'
                    }
                ]
            },
			search(res) {
                const keyWord = res.value.trim()
                if(keyWord){
                    this.patientList = this.cachePatientsList.filter(item=>item.Name.includes(keyWord)||item.BedNo.includes(keyWord))
                }else {
                    this.patientList = this.cachePatientsList
                }
			},

			clear(res) {
                this.patientList = this.cachePatientsList
			},

			cancel(res) {
                this.search(res)
			},

            blur(res) {
                const keyWord = res.value.trim()
                if(keyWord){
                    this.patientList = this.cachePatientsList.filter(item=>{
                       return  item.Name.includes(keyWord)||item.BedNo.includes(keyWord)
                    })
                }else {
                    this.patientList = this.cachePatientsList
                }
			},
		}
	};
</script>
<style lang="scss">
	page {
		background-color: $page-color-base;
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
		top: 46upx;
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
        // height: 300upx;
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
    .rf-content {
        top: 146upx;
        position: absolute;
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

		/*screen*/
		.rf-header-screen {
            margin-top: 0upx;
			width: 100%;
			background: $color-white;
            position: fixed;
			z-index: 99;
			.rf-screen-top{
				border: none;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28upx;
				color: #333;
                height: 50upx;
				line-height: 50upx;
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

        .search-box {
            width: 100%;
            padding: 15upx 2.5%;
            display: flex;
            justify-content: space-between;

            .mSearch-input-box {
                width: 100%;
                padding: 0px;
                .uni-searchbar__box {
                    color: black;
                }
            }

            .input-box > input {
                width: 100%;
                height: 60upx;
                font-size: 32upx;
                border: 0;
                border-radius: 60upx;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                padding: 0 3%;
                margin: 0;
                background-color: #ffffff;
            }
        }
        .rf-margin-right-20 {
            margin-right: 20upx;
        }
</style>
