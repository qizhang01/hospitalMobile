/* eslint-disable */
import Request from './request';
import indexConfig from '@/config/index.config';
import mHelper from '@/utils/helper';
import store from '@/store';

const http = new Request();

// request全局参数设置
http.setConfig(config => {
	/* 设置全局配置 */
	// config.baseUrl = 'https://infusion.us.to:8443'; /* 根域名不同 */
	config.header = {
		...config.header,
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
        if(error.statusCode=='401') {
            //token失效
            uni.removeStorageSync('accessToken');
            uni.navigateTo({
                url: '/pages/login/login'
            })
        }else {
            uni.showToast({
                title: error.data.message || '请求失败',
                icon: 'none' ,
                duration: 20000
            });
            return Promise.reject(error);
        }
	}
);

export { http };
