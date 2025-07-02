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
	config.header = {
		...config.header,
		API_KEY: "bpQ7]qnAzwe1,HQ74Zt4V(cRf2v[m,",
	};
	return config;
});


http.interceptor.request(
	config => {
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);


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
