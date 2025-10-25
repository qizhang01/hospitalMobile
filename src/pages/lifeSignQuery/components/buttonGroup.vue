<template>
	<view class="button-group">
        <button 
            v-for ="(item, index) in buttonList" 
            :type="item.selected? 'primary': 'default'" 
            @tap.stop="handleButtonClick" 
            size="mini"
             class="mini-btn"
            :key="index">
            {{ item.name }}
    </button>
	</view>
</template>

<script>
	export default {
        props: {
            buttonList: {
                type: Array,
                default: []
            },
        },
		components: {

		},
		data() {
			return {

			};
		},
		methods: {
            handleButtonClick(item){

            }
		}
	};
</script>
<style lang="scss">
	page {
		background-color: $page-color-base;
	}
.button-group{
    display: flex;
    flex-direction: row;
}
.mini-btn {
    height:56upx;
}
</style>
