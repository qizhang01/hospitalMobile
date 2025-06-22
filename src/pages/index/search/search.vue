<template>
	<view class="rf-search">
		<view class="search-box">
			<mSearch
				class="mSearch-input-box"
				:mode="2"
				button="inside"
				:placeholder="hotSearchDefault || '请输入关键字'"
				@search="doSearch(false)"
				@confirm="doSearch(false)"
				v-model="keyword"
			></mSearch>
		</view>
	</view>
</template>
<script>
import mSearch from '@/components/rf-search/rf-search';
export default {
	data() {
		return {
			keyword: '',
			oldKeywordList: [],
			hotKeywordList: [],
			keywordList: [],
			forbid: 'iconai47',
			isShowKeywordList: false,
			hotSearchDefault: '',
			type: null // 搜索类型
		};
	},
	onLoad(options) {
		this.initData(options);
	},
	components: {
		mSearch
	},
	methods: {
		async initData(options) {

		},
		blur() {
			uni.hideKeyboard();
		},
		// 加载历史搜索,自动读取本地Storage
		loadOldKeyword() {
			uni.getStorage({
				key: 'OldKeys',
				success: res => {
					let OldKeys = JSON.parse(res.data);
					this.oldKeywordList = OldKeys;
				}
			});
		},
		// 顶置关键字
		setkeyword(data) {

		},
		// 清除历史搜索
		oldDelete() {
			uni.showModal({
				content: '确定清除历史搜索记录？',
				success: res => {
					if (res.confirm) {
						this.oldKeywordList = [];
						uni.removeStorage({ key: 'OldKeys' });
					}
				}
			});
		},

		// 执行搜索
		doSearch(key) {
			key = key || this.keyword || this.defaultKeyword;
			this.keyword = key;
			this.saveKeyword(key); // 保存为历史
			if (this.type === 'order') {
				this.$mRouter.push({ route: `/pages/order/search?keyword=${key}` });
			} else {
				this.$mRouter.push({ route: `/pages/product/list?keyword=${key}` });
			}
		},
		// 保存关键字到历史记录
		saveKeyword(keyword) {
			uni.getStorage({
				key: 'OldKeys',
				success: res => {
					let OldKeys = JSON.parse(res.data);
					let findIndex = OldKeys.indexOf(keyword);
					if (findIndex === -1) {
						OldKeys.unshift(keyword);
					} else {
						OldKeys.splice(findIndex, 1);
						OldKeys.unshift(keyword);
					}
					// 最多10个纪录
					OldKeys.length > 10 && OldKeys.pop();
					uni.setStorage({
						key: 'OldKeys',
						data: JSON.stringify(OldKeys)
					});
					this.oldKeywordList = OldKeys; // 更新历史搜索
				},
				fail: () => {
					let OldKeys = [keyword];
					uni.setStorage({
						key: 'OldKeys',
						data: JSON.stringify(OldKeys)
					});
					this.oldKeywordList = OldKeys; // 更新历史搜索
				}
			});
		}
	}
};
</script>
<style lang="scss">
.rf-search {
	.search-box {
		width: 100%;
		background-color: rgb(242, 242, 242);
		padding: 15upx 2.5%;
		display: flex;
		justify-content: space-between;

		.mSearch-input-box {
			width: 100%;
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
	.iconfont {
		font-size: $font-lg + 12upx;
	}
}
</style>
