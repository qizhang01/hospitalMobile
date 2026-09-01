const getMainUrl = ()=>{
    return uni.getStorageSync('serviceAdress')
}

export default class Request {
	config = {
		header: {
			'content-type': 'application/json',
            API_KEY: "bpQ7]qnAzwe1,HQ74Zt4V(cRf2v[m,",
		},
		method: 'GET',
		dataType: 'json',
		// #ifdef APP-PLUS
		sslVerify: false,
		// #endif
	};

	interceptor = {
		request: cb => {

		},

		response: (cb, ecb) => {
			if (cb) {
				this.requestComFun = cb;
			}
			if (ecb) {
				this.requestComFail = ecb;
			}
		}
	};

	requestBeforeFun(config) {
		return config;
	}


	setConfig(f) {
		this.config = f(this.config);
	}


	async request(options = {}) {
		options.header = options.header || {...this.config.header, 'X-Access-Token': uni.getStorageSync('accessToken')};
		// #ifdef APP-PLUS
		options.sslVerify =
			options.sslVerify === undefined
				? this.config.sslVerify
				: options.sslVerify;
		// #endif
		return new Promise((resolve, reject) => {
            const mainUrl = process.env.NODE_ENV === 'development'? '': getMainUrl()
			 uni.request({
				url: mainUrl + options.url,
				data: options.data,
				header: options.header,
				method: options.method,
				sslVerify: false,
				complete: response => {

					if (response.statusCode===200) {
						// 成功
						response = this.requestComFun(response);
						resolve(response);
					} else {
						response = this.requestComFail(response);
						reject(response);
					}
				}
			});

		});
	}

	get(url, params = {}) {
		return this.request({
			url,
			method: 'GET',
			...params
		});
	}

	post(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'POST',
			...options
		});
	}


	put(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'PUT',
			...options
		});
	}


	// #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
	delete(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'DELETE',
			...options
		});
	}
	// #endif
}



// fail: function(error) {
//     uni.showToast({
//         title: '加载失败，请检查网络',
//         icon: 'none' 
//     })

//     if (error.errMsg.indexOf('network') !== -1) {
//         console.error('网络错误');
//     } else if (error.errMsg.indexOf('timeout') !== -1) {
//         console.error('请求超时');
//     } else {
//         console.error('其他错误');
//     }
// },