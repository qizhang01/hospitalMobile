<template>
  <view>
    <!-- 引入扫码组件，它像后台服务一样静默运行 -->
    <scan-code />
    <!-- 你的页面UI -->
    <view>扫描结果：{{ scanResult }}</view>
  </view>
</template>

<script>
import ScanCode from '@/components/scan-code/scan-code.vue';

export default {
  components: { ScanCode },
  data() {
    return {
      scanResult: ''
    };
  },
  onShow() {
    // 页面显示时，开始监听激光扫码事件
    this.listenToLaserScan();
  },
  onHide() {
    // 页面隐藏时，移除监听，避免不可见页面还响应事件
    this.removeLaserScanListener();
  },
  onUnload() {
    // 页面卸载时，也必须移除监听
    this.removeLaserScanListener();
  },
  methods: {
    listenToLaserScan() {
      // 监听全局事件
      uni.$on('onLaserScanResult', this.handleLaserResult);
    },
    removeLaserScanListener() {
      // 移除监听
      uni.$off('onLaserScanResult', this.handleLaserResult);
    },
    handleLaserResult(res) {
      const rawData = res.data;
      this.scanResult = `激光扫码: ${rawData}`;
      // 在这里调用你的业务处理函数，比如解析JSON、查询数据库等
      this.processScannedCode(rawData);
    },
    processScannedCode(code) {
      // 统一的扫码后处理逻辑
      console.log('进行业务处理:', code);
      // TODO: 你的业务逻辑
    }
  }
};
</script>