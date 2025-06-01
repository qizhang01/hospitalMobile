<template>
	<view class="rf-product-list">
		<view class="rf-product-list-container">
			<block v-for="(item, index) in list" :key="index">
                <rf-card :patientMedicineInfo="item"></rf-card>
			</block>
		</view>
	</view>
</template>
<script>
/**
 * @des 商品列表
 *
 * @author stav stavyan@qq.com
 * @date 2020-05-15 10:49
 */
import rfCard from './card.vue';

export default {
	name: 'rfProductList',
	props: {
		list: {
			type: Array,
			default() {
				return [];
			}
		},

		bottom: {
			type: Number,
			default: 0
		}
	},
	components: {
		rfCard
	},
	data() {
		return {

		};
	},

	methods: {

		// 跳转详情
		navTo(route) {
			this.$mRouter.push({ route });
		},
		// 获取产品详情

	}
};
</script>

<style>

</style>
