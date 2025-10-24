<template>
	<view class="patient-info-list">
        <block v-for="(item, index) in list" :key="index">
           <patientInfoCard ></patientInfoCard>
        </block>
	</view>
</template>


<script>
import patientInfoCard from './patientInfoCard.vue';

export default {
	name: 'rfProductList',
	props: {
        list: {
            type: Array,
            default: []
        },
	},
	components: {
		patientInfoCard
	},
	data() {
		return {

		};
	},

	methods: {

	}
};
</script>


<style>

</style>