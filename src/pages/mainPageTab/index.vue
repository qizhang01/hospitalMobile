<template>
	<view class="rf-index">
		<!--搜索导航栏-->
		<rf-search-bar
			@search="navToSearch"
			title="扫一扫"
			icon=""
			@tab="tabClick"
			:categoryList="[]"
			:merchantData="merchantData"
			:placeholder="hotSearchDefault"
		/>
		<view class="rf-header-screen" >
			<view class="rf-screen-top">
				<view class="rf-top-item rf-icon-ml" :class="[tabIndex==0? `text-${themeColor.name} rf-bold`:'']" @tap="selectPatientRelationship">
					<text>{{selectedPatientRelationship}}</text>
					<text class="iconfont" :class="tabIndex==0?'iconshang':'iconxia'"></text>
				</view>
				<view class="rf-top-item" :class="[tabIndex == 1?`text-${themeColor.name} rf-bold`:'']" @tap="selectOther">
					<text>{{ selectedOtherItem}}</text>
					<text class="iconfont" :class="tabIndex==1?'iconshang':'iconxia'"></text>
				</view>
				<view class="rf-top-item" :class="[tabIndex == 1?`text-${themeColor.name} rf-bold`:'']" @tap="selectPatientType">
					<text>{{ selectedPatientGroup }}</text>
					<text class="iconfont " :class="tabIndex==2?'iconshang':'iconxia'"></text>
				</view>
                <view class="addr">
                    <text class="iconfont iconsaomiao" @tap.stop="link" ></text>
                </view>
                <view class="addr">
                    <text class="iconfont iconsaomiao" @tap.stop="link" ></text>
                </view>
				<!--下拉选择列表--综合-->
				<view class="rf-dropdownlist" :class="[selectH>0?'rf-dropdownlist-show':'']">
					<view class="rf-dropdownlist-item rf-icon-middle" :class="[item.selected?'rf-bold':'']" v-for="(item,index) in dropdownList" :key="index" @tap.stop="dropdownItem(index)">
						<text class="rf-ml rf-middle">{{item.name}}</text>
						<text class="iconfont icongouxuan" :class="'text-' + themeColor.name" v-if="item.selected"></text>
					</view>
				</view>
				<view class="rf-dropdownlist-mask" :class="[selectH>0?'rf-mask-show':'']" @tap.stop="hideDropdownList"></view>
				<!--下拉选择列表--综合-->
			</view>
            <scroll-view scroll-y="true">
                <patientInfoList :list="patientInfoList"></patientInfoList>
            </scroll-view>
		</view>
        
		<!--页面加载动画-->
		<!-- <rfLoading isFullScreen :active="loading"></rfLoading> -->
		<rf-back-top :scrollTop="scrollTop"></rf-back-top>
		<!-- <rf-back-home></rf-back-home> -->
	</view>
</template>

<script>

	import rfSearchBar from '@/components/rf-search-bar';
    import patientInfoList from './patientInfoList'
	import { mapMutations } from 'vuex';
    import {patientRelationship, patientGroup} from './option.js'
	export default {
		components: {
			rfSearchBar,
            patientInfoList,
		},
		data() {
			return {
				loading: true,
				scrollTop: 0,
				hotSearchDefault: '请输入关键字',
				merchantData: {},
                selectedPatientRelationship: '所有病人',
                selectedOtherItem: '其他筛选',
                selectedPatientGroup: '患者分组',
                selectH: 0,
                dropdownIndex: 0,
                patientRelationship,
                patientGroup,
                dropdownList: [],
                tabIndex: 1,
                patientInfoList: [1,2,3,4]
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

			// 通用跳转
			navToSearch() {
				this.$mRouter.push({
					route: `/pages/mainPageTab/search/search?data=${JSON.stringify(this.search)}`
				});
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

            selectPatientRelationship(){
                this.selectH = 1
                this.dropdownIndex = 1
                this.dropdownList=this.patientRelationship
            },

            selectOther(){
                this.selectH = 1
                this.dropdownIndex = 2
            },

            selectPatientType(){
                this.selectH = 1
                this.dropdownIndex = 3
                this.dropdownList = this.patientGroup
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
        // height: 300upx;
        max-height: 900upx;
        // overflow-y: auto;
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
	.rf-attr-safearea {
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		/*padding-bottom: env(safe-area-inset-bottom);*/
	}
	.rf-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}
	.rf-attr-btnbox::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1upx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}
		/*screen*/
		.rf-header-screen {
            margin-top: 46px;
			width: 100%;
			background: $color-white;
			position: fixed;
			z-index: 99;
			.rf-screen-top,
			.rf-screen-bottom {
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
			.rf-screen-bottom {
				height: 100upx;
				padding: 0 30upx;
				box-sizing: border-box;
				font-size: 24upx;
				align-items: center;
				overflow: hidden;
			}
			.rf-bottom-text {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.rf-bottom-item {
				flex: 1;
				width: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 12upx;
				box-sizing: border-box;
				margin-right: 20upx;
				white-space: nowrap;
				height: 60upx;
				border-radius: 40upx;
			}
			.rf-bottom-item:last-child {
				margin-right: 0;
			}
			.rf-bold {
				font-weight: bold;
			}
			.rf-active {
				color: $base-color;
			}
			.rf-icon-ml .rf-icon-class {
				margin-left: 6upx;
			}
			.rf-ml {
				margin-left: 6upx;
			}
			.rf-seizeaseat-20 {
				height: 20upx;
			}
			.rf-seizeaseat-30 {
				height: 30upx;
			}
			.rf-icon-middle .rf-icon-class {
				vertical-align: middle;
			}
			.rf-middle {
				vertical-align: middle;
			}
		}
</style>
