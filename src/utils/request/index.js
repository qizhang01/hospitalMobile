/* eslint-disable */
import Request from './request';
import { refreshToken } from '@/api/login';
import indexConfig from '@/config/index.config';
import mHelper from '@/utils/helper';
import store from '@/store';

const http = new Request();

// request全局参数设置
http.setConfig(config => {
	/* 设置全局配置 */
	config.baseUrl = indexConfig.baseUrl; /* 根域名不同 */
	const systemInfo = uni.getSystemInfoSync();
	const systemInfoHeaders = {
		API_KEY: "bpQ7]qnAzwe1,HQ74Zt4V(cRf2v[m,",
		'device-name': systemInfo.brand, // 设备名称
		width: systemInfo.screenWidth, // 屏幕宽度
		height: systemInfo.screenHeight, // 屏幕高度
		os: systemInfo.platform, // 客户端平台
		'os-version': systemInfo.system // 操作系统版本
	};
	config.header = {
		...config.header,
		...systemInfoHeaders
	};
	return config;
});

let isRefreshing = false;
let requests = [];
http.interceptor.request(
	config => {
		/* 请求之前拦截器 */
		// config.header['x-api-key'] = uni.getStorageSync('accessToken');
		// 单商户
		// config.header['merchant-id'] = uni.getStorageSync('merchantId') || 1;
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

// 刷新refreshToken
async function handleRefreshToken(refresh_token) {
	// const params = {};
	// params.group = mHelper.platformGroupFilter();
	// params.refresh_token = refresh_token;
	// await http.post(refreshToken, params).then(async r => {
	// 	store.commit('login', r.data);
	// 	isRefreshing = false;
	// });
}
http.interceptor.response(
	async response => {
		/* 请求之后拦截器 */
		switch (response.statusCode) {
			case 200:
				return response.data;
			case 500:
				mHelper.toast('服务器打瞌睡了');
				return Promise.reject(response.data.message);
			default:
				mHelper.toast(response.data.message);

		}
	},
	error => {
		return Promise.reject(error);
	}
);

export { http };
