
/**
 * 统一扫码入口函数
 * @param {Object} options 配置项
 * @param {string} options.scanType - 扫码类型：'camera' | 'laser'。如果为'camera'则直接调起摄像头。
 * @param {boolean} options.onlyFromCamera - 是否仅允许从相机扫码（针对摄像头扫码）
 * @returns {Promise} 返回一个Promise，resolve扫码结果，reject错误
 */
export const startScan = (options = {}) => {
  const { scanType = 'laser', onlyFromCamera = true } = options;
  
  return new Promise((resolve, reject) => {
    if (scanType === 'camera') {
      // 调用摄像头扫码
      uni.scanCode({
        onlyFromCamera: onlyFromCamera,
        scanType: ['qrCode', 'barCode'], // 根据需要配置扫码类型
        success: (res) => {
          console.log('摄像头扫码成功:', res.result);
          resolve({ source: 'camera', data: res.result });
        },
        fail: (err) => {
          console.error('摄像头扫码失败:', err);
          reject(new Error(`摄像头扫码失败: ${err.errMsg || '未知错误'}`));
        }
      });
    } else {
      // 对于激光扫码，我们无法“主动开始”，只能等待。
      // 这里返回一个Promise，但需要外部通过监听事件来resolve它。
      // 更常见的做法是，激光扫码不通过此函数触发，而是直接由组件广播事件。
      // 因此，这里我们约定：scanType为'laser'时，此函数提示用户使用物理按键。
      console.log('请按下PDA上的激光扫码键进行扫描');
      // 可以在这里显示一个提示Toast
      uni.showToast({
        title: '请按扫描键',
        icon: 'none'
      });
      // 由于是异步事件驱动，不适合用Promise直接返回，这里我们reject，引导开发者使用事件监听模式。
      reject(new Error('激光扫码请使用物理按键触发，并监听onLaserScanResult事件'));
    }
  });
};
 
/**
 * 统一处理扫码结果的函数（示例）
 * @param {Object} scanResult - 扫码结果对象，包含source和data
 */
export const processScanResult = (scanResult) => {
  const { source, data } = scanResult;
  console.log(`收到${source}扫码结果，开始处理:`, data);
  
  // 1. 尝试解析数据（假设我们的二维码是JSON字符串）
  let parsedData = {};
  try {
    parsedData = JSON.parse(data);
  } catch (e) {
    // 如果不是JSON，按纯文本处理
    parsedData = { raw: data };
  }
  
  // 2. 根据数据内容分发到不同的业务逻辑
  // 例如，根据type字段判断
  if (parsedData.type === 'AA') {
    console.log('执行AA类型业务逻辑', parsedData.code);
    // TODO: 调用AA相关的API或页面跳转
  } else if (parsedData.type === 'BB') {
    console.log('执行BB类型业务逻辑', parsedData.code);
    // TODO: 调用BB相关的API或页面跳转
  } else {
    // 默认处理或提示
    uni.showModal({
      content: `扫描到内容: ${data}`,
      showCancel: false
    });
  }
};
