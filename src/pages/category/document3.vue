<template>
  <view>
    <uni-section title="名字"  type="line" padding>
        <uni-easyinput class="uni-mt-5" trim="all" v-model="inputValue" placeholder="请输入内容" @input="input"></uni-easyinput>
    </uni-section>
    <uni-section title="日期" type="line"></uni-section>
    <view class="date-picker">
			<uni-datetime-picker type="date" :clear-icon="false" v-model="single" @maskClick="maskClick" />
		</view>
  </view>
</template>

<script>
import uniDataSelect from '@dcloudio/uni-ui/lib/uni-data-select/uni-data-select.vue'
import uniSection from '@dcloudio/uni-ui/lib/uni-section/uni-section.vue'
import uniEasyinput from '@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.vue'
import uniDatetimePicker from '@dcloudio/uni-ui/lib/uni-datetime-picker/uni-datetime-picker.vue'
  export default {
		name: 'document2',
    components: {
        uniDataSelect,
        uniSection,
        uniDatetimePicker,
        uniEasyinput
		},
    data() {
      return {
        inputValue: '',
        single: '',
        range: [
          { value: 0, text: "篮球" },
          { value: 1, text: "足球" },
          { value: 2, text: "游泳" },
        ],
      };
    },
    mounted() {
    },
    methods: {
      change(e) {
        console.log("e:", e);
      },
      maskClick(e){
				console.log('maskClick事件:', e);
			},
      input(e) {
				console.log('输入内容：', e);
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
  .date-picker {
    margin-top: 10upx;
  }
</style>