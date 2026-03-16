<script>
    /* eslint-disable */
    import Vue from 'vue';
    import { verifyAccessToken } from '@/api/login'
    import { mapMutations } from 'vuex';
    let mainActivity = null;
    let broadcastReceiver = null;
    let intentFilter = null;
    // 关键点2：防重复触发标志
    let isProcessingScan = false;

export default {
	async onLaunch() {
		await this.initData();
        if (uni.getSystemInfoSync().platform === 'android'){
            this.initScanner();
            this.listenToLaserScan();
        }
	},

    onShow() {
        // 页面显示时，开始监听激光扫码事件
        // this.listenToLaserScan();
    },

    onHide() {
        // 页面隐藏时，移除监听，避免不可见页面还响应事件
        // this.removeLaserScanListener();
    },

    onUnload() {
        // 页面卸载时，也必须移除监听
        this.removeLaserScanListener();
        this.stopScanner();
    },

    mounted(){

    },

	methods: {
		...mapMutations(['setCartNum', 'setNotifyNum']),
		// 数据初始化
		async initData() {
			uni.setTabBarStyle({
				selectedColor: this.themeColor.color,
				borderStyle: 'white'
			});
			this.themeColor.tabList && this.themeColor.tabList.forEach((selectedIconPath, index) => {
				uni.setTabBarItem({
					index,
					selectedIconPath
				});
			});
			// 获取页面设置配置
			const token = uni.getStorageSync('accessToken');
			// 获取系统title高度
			await this.initSystemInfo();

			if (this.$mStore.getters.hasLogin) {

			}
		},
		// 初始化系统信息
		initSystemInfo() {
			uni.getSystemInfo({
				success(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform === 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 43;
					}
					// #endif
				}
			});
		},
		// 检验token是否有效
		async handleVerifyAccessToken (token) {
			// await this.$http.post(verifyAccessToken, { token }).then(r => {
			// 	if (!r.data.token) {
			// 				this.$mStore.commit('logout');
			// 	}}
			// );
    	},


        //
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
            console.log('进行业务处理:', code);
            // TODO: 你的业务逻辑
            uni.setStorageSync( 'scanCode', code);
            // this.$mRouter.push({
            //     route: 'pages/patientInfoTab/houseCheck/index'
            // })
            uni.navigateTo({
                url: '/pages/patientInfoTab/houseCheck/index'
            })
        },

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
<style lang="scss">
// 导入colorUI
@import '/static/css/colorui/main.css';
@import '/static/css/colorui/icon.css';
@import '/static/css/colorui/animation.css';
// 导入阿里巴巴矢量图标库
@import './static/css/iconfont/iconfont.css';
@import './static/css/reset.scss';
@import './static/css/uni.scss';
</style>
