<template>
  <view></view>
</template>
 
<script>
    let mainActivity = null;
    let broadcastReceiver = null;
    let intentFilter = null;
    // 关键点2：防重复触发标志
    let isProcessingScan = false;
 
export default {
  data() {
    return {};
  },
  created() {
    // 组件创建时，只在安卓环境下初始化
    if (uni.getSystemInfoSync().platform === 'android'){
      this.initScanner();
    }
  },

  beforeDestroy() {
    // 关键点3：组件销毁前，务必注销监听！这是避免内存泄漏和重复监听的铁律。
    this.stopScanner();
  },

  methods: {
    initScanner() {
    // 1. 获取当前安卓环境的“主舞台”（Activity）
    mainActivity = plus.android.runtimeMainActivity();
    
    // 2. 创建“广播过滤器”，告诉系统我们想听什么“频道”
    const IntentFilter = plus.android.importClass('android.content.IntentFilter');
    intentFilter = new IntentFilter();
    

    // 不同PDA的广播Action不同，需要查设备文档或设置菜单
    intentFilter.addAction("com.sunmi.scanner.ACTION_DATA_CODE_RECEIVED"); //Summi
    // 示例2：Seuic Action  Mexxen
    intentFilter.addAction("com.android.server.scannerservice.broadcast");

    
    // 3. 创建“广播接收器”，并定义“听到广播后做什么”（onReceive）
    const context = plus.android.importClass('android.content.Context');
    broadcastReceiver = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
        onReceive: (context, intent) => {
            // 防重复处理
            if (isProcessingScan) {
                return;
            }
            isProcessingScan = true;
            // 设置一个短时间后重置标志，例如150毫秒
            setTimeout(() => { isProcessingScan = false; }, 150);
            
            // 4. 从Intent中提取扫码数据
            // ！！！这里的数据Key也需要根据PDA型号调整 ！！！
            plus.android.importClass(intent); // 引入intent类，才能调用其方法
            
            let finalBarcode  = '';
           // 尝试多个可能的Key
            const possibleKeys = [
                'data',  //summi
                'scannerdata',   //mexxen seuic
                'value',          
                'scan_result'     
            ];

          // 尝试从不同的Key中获取数据，适配不同设备
            for (let key of possibleKeys) {
                const data = intent.getStringExtra(key);
                if (data) {
                    finalBarcode = data;
                    break;
                }
            }

            // 5. 如果获取到数据，通过全局事件总线发射出去
            if (finalBarcode ) {
                console.log('激光扫码原始数据:', finalBarcode );
                // 使用uni.$emit，这是一个跨页面的轻量级事件通信方案
                uni.$emit('onLaserScanResult', { data: finalBarcode  });
            }
            }
        });
      
        // 6. 正式注册监听器
        mainActivity.registerReceiver(broadcastReceiver, intentFilter);
        console.log('激光扫码监听器已注册');
    },
    
    stopScanner() {
        // 注销监听，释放资源
        if (mainActivity && broadcastReceiver) {
            try {
                mainActivity.unregisterReceiver(broadcastReceiver);
                console.log('激光扫码监听器已注销');
                broadcastReceiver = null;
                intentFilter = null;
            } catch (e) {
                console.warn('注销广播接收器时发生错误:', e);
            }
        }
    }
  }
};
</script>