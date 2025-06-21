<template>
  <view>
    <uni-section title="是否可清除已选项" type="line">
      <uni-data-select
        v-model="value"
        :localdata="range"
        @change="change"
        :clear="false"
      ></uni-data-select>
    </uni-section>
  </view>
</template>

<script>
import uniDataSelect from '@dcloudio/uni-ui/lib/uni-data-select/uni-data-select.vue'
import uniSection from '@dcloudio/uni-ui/lib/uni-section/uni-section.vue'
import uniCard from '@dcloudio/uni-ui/lib/uni-card/uni-card.vue'
  export default {
		name: 'document2',
    components: {
        uniDataSelect,
        uniSection,
        uniCard
		},
    data() {
      return {
        value: 1,
        range: [],
      };
    },
    mounted() {
      this.range=[
          { value: 0, text: "篮球" },
          { value: 1, text: "足球" },
          { value: 2, text: "游泳" },
        ]
    },
    methods: {
      change(e) {
        console.log("e:", e);
      },
    },
  };
</script>

<style lang="scss">
  .text {
    font-size: 12px;
    color: #666;
    margin-top: 5px;
  }

  .uni-px-5 {
    padding-left: 10px;
    padding-right: 10px;
  }

  .uni-pb-5 {
    padding-bottom: 10px;
  }
</style>
