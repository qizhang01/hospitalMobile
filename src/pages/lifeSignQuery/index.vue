<template>
	<view class="rf-index">
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
                    <buttonGroup :buttonList="typeOption" v-if="dropdownIndex==1" ></buttonGroup>
                    <periodSelect :buttonList="timeOption" v-else="dropdownIndex==2" @handleSelect ="handleSelect"></periodSelect>
				</view>
				<view class="rf-dropdownlist-mask" :class="[selectH>0?'rf-mask-show':'']" @tap.stop="hideDropdownList"></view>
				<!--下拉选择列表--综合-->
			</view>
		</view>
        <scroll-view scroll-y="true" style="padding: 90upx 0upx;">
            <card v-for="(item, index) in dataList" :key="index" :infomation="item"></card>
        </scroll-view>
		<!--页面加载动画-->
		<!-- <rfLoading isFullScreen :active="loading"></rfLoading> -->
	</view>
</template>

<script>
    import card from './lifeSignCard.vue'
    import buttonGroup from './components/buttonGroup.vue'
    import periodSelect from './components/periodSelect.vue';
    import {mockData, typeOption, timeOption} from './data'
	import { mapMutations } from 'vuex';
	export default {
		components: {
            card,
            buttonGroup,
            periodSelect
		},
		data() {
			return {
                dataList: mockData,
                typeOption,
                timeOption,
				loading: true,
				scrollTop: 0,
                selectedType: '按时间',
                selectedTypeItem: '近三天',
                selectH: 0,
                dropdownIndex: 0,
                tabIndex: 1,
                inpatient: ''
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},

        onLoad(options){
            this.inpatient = options.inpatient
            if(options.inpatient){
                const dates = this.getDatesByDaylong(3)
                const fromTime = `${dates[dates.length -1]}T00:00:00+08:00`
                const toTime = `${dates[0]}T00:00:00+08:00`
                this.getVitalByPatientId(options.inpatient, fromTime, toTime)
            }
        },
        
		onShow() {

		},


		// 下拉刷新
		onPullDownRefresh() {

		},
		// 加载更多
		onReachBottom() {

		},
		methods: {
			// 通用跳转
			navTo(route) {
				this.$mRouter.push({ route });
			},

            selectQueryType(){
                this.selectH = 1
                this.dropdownIndex = 1
            },
    
            selectOther(){
                this.selectH = 1
                this.dropdownIndex = 2
            },

            selectTypeItem(){
                this.selectH = 1
                this.dropdownIndex = 3
            },

            handleSelect(date){
                let fromTime, toTime
                if(typeof date ==='number'){
                    const dates = this.getDatesByDaylong(date)
                    fromTime = `${dates[dates.length -1]}T00:00:00+08:00`
                    toTime = `${dates[0]}T00:00:00+08:00`
                    this.selectedTypeItem = this.getOptionTextByNumber(date)
                }else {
                    fromTime = date.startDate? `${date.startDate}T00:00:00+08:00`: null
                    toTime = date.endDate? `${date.endDate}T00:00:00+08:00`: null
                }
                this.getVitalByPatientId(this.inpatient, fromTime, toTime)

                this.selectH=0
            },

            async getVitalByPatientId(id, fromTime, toTime){
                let url = ''
                if(fromTime&&toTime){
                    url = `/api/vital?inpatient=${id}&from=${encodeURIComponent(fromTime)}&to=${encodeURIComponent(toTime)}`
                }else if(fromTime){
                    url = `/api/vital?inpatient=${id}&from=${encodeURIComponent(fromTime)}`
                }else {
                    url = `/api/vital?inpatient=${id}&to=${encodeURIComponent(toTime)}`
                }
                const res = await this.$http
                    .get(url)
                if(res){
                    this.dataList = this.parseData(res)
                }
            },
            
            parseData(res){
                const result = []
                const map = new Map()
                res.forEach(item=>{
                    const key = item.planned_time.slice(0,13)
                    if(map.get(key)){
                        map.set(key, [...map.get(key), item])
                    }else {
                        map.set(key, [item])
                    }
                })
                map.forEach((v,key)=>{
                    result.push(v)
                })
                return result
            },

            getDatesByDaylong(dayLong) {
                let currentDate = new Date();
                let dates = [];
                for (let i=0; i<dayLong; i++){
                    let date = new Date();
                    date.setDate(currentDate.getDate() -i);
                    dates.push(date);
                }
                return dates.map(item=> `${item.getFullYear()}-${this.get2Digtal(item.getMonth()+1)}-${this.get2Digtal(item.getDate())}`);
            },

            get2Digtal(month){
                if(month<10){
                    return `0${month}`
                }
                return `${month}`
            },

            getOptionTextByNumber(number){
                const obj = timeOption.filter(item=>item.value==number)
                return obj[0].name
            }
        }
    }
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
</style>
