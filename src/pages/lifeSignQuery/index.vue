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
                    <buttonGroup :buttonList="typeOption" v-if="dropdownIndex==1"></buttonGroup>
                    <periodSelect :buttonList="timeOption" v-else="dropdownIndex==2"></periodSelect>
				</view>
				<view class="rf-dropdownlist-mask" :class="[selectH>0?'rf-mask-show':'']" @tap.stop="hideDropdownList"></view>
				<!--下拉选择列表--综合-->
			</view>
		</view>
        <scroll-view scroll-y="true">
            <lifeSignCard v-for="(item, index) in dataList" :key="index" :infomation="item"></lifeSignCard>

        </scroll-view>
		<!--页面加载动画-->
		<!-- <rfLoading isFullScreen :active="loading"></rfLoading> -->
		<rf-back-top :scrollTop="scrollTop"></rf-back-top>
		<!-- <rf-back-home></rf-back-home> -->
	</view>
</template>

<script>
    import lifeSignCard from './lifeSignCard.vue'
    import buttonGroup from './components/buttonGroup.vue'
    import periodSelect from './components/periodSelect.vue';
    import {mockData, typeOption, timeOption} from './data'
	import { mapMutations } from 'vuex';
	export default {
		components: {
            lifeSignCard,
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
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
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
			// 顶部tab点击
			tabClick({ id }) {
			},

			// 数据初始化
			initData() {

			},

			// 通用跳转
			navTo(route) {
				this.$mRouter.push({ route });
			},

			// 首页参数赋值
			initIndexData(data) {

				uni.setStorageSync('search', this.search);
				this.hotSearchDefault = data.search.hot_search_default || '请输入关键字';
				uni.setStorage({
					key: 'hotSearchDefault',
					data: data.search.hot_search_default
				});
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
				if(this.dropdownIndex===1){
					this.patientRelationship = arr
					this.selectedPatientRelationship = arr[index].name;
				}else if(this.dropdownIndex===2){

				}else if(this.dropdownIndex===3){
                    this.patientGroup = arr
					this.selectedPatientGroup = arr[index].name;
                }
				this.selectH = 0;
            }
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
