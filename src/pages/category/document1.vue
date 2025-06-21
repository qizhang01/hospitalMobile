<template>
	<view>
		<view class="input-box">
        <input
            @tap.stop=""
            disabled={false}
            :value="hotSearchDefault || '请输入关键字'"
            style="color:#888;"
            placeholder-style="color:#ccc;"
        />
		</view>
        <uni-section title="单选" type="line">
			<view class="uni-px-5 uni-pb-5">
				<uni-data-checkbox v-model="radio1" :localdata="sex"></uni-data-checkbox>
			</view>
		</uni-section>
		<uni-section title="多选"  type="line">
			<view class="uni-px-5 uni-pb-5">
				<uni-data-checkbox multiple v-model="checkbox1" :localdata="hobby"></uni-data-checkbox>
			</view>
		</uni-section>
		<uni-section title="更多样式 - tag"  type="line">
			<view class="uni-px-5 uni-pb-5">
				<uni-data-checkbox mode="tag" multiple v-model="checkbox2" :localdata="hobby"></uni-data-checkbox>
			</view>
		</uni-section>
		<!--加载动画-->
		<!-- <rfLoading isFullScreen :active="loading"></rfLoading> -->
		<!-- 规格-模态层弹窗 -->
	</view>
</template>

<script>
import uniDataSelect from '@dcloudio/uni-ui/lib/uni-data-select/uni-data-select.vue'
import uniSection from '@dcloudio/uni-ui/lib/uni-section/uni-section.vue'
import uniDataCheckbox from '@dcloudio/uni-ui/lib/uni-data-checkbox/uni-data-checkbox.vue'
export default {
	components: {
uniDataCheckbox,
uniSection,
uniDataSelect,
	},
	data() {
		return {
			hotSearchDefault: '',
			radio1: 0,
			checkbox1: [0],
			checkbox2: [0],
			sex: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}, {
					text: '未知',
					value: 2
				}],
				hobby: [{
					text: '足球',
					value: 0
				}, {
					text: '篮球',
					value: 1
				}, {
					text: '游泳',
					value: 2
				}],
		};
	},
	computed: {
	},
	filters: {

	},
	// 每次页面显示 执行该方法
	onLoad() {

	},
	methods: {

	}
};
</script>
<style lang="scss">
    page {
        background-color: $color-white;
    }
    .input-box {
		height: 60upx;
		position: relative;
		display: flex;
		align-items: center;
		margin: 10upx 20upx;

		input {
			flex: 1;
			height: 60upx;
			background-color: #f5f5f5;
			padding-left: 28upx;
			border-radius: 30upx;
			color: #888;
			font-size: 28upx;
		}
	}
</style>
