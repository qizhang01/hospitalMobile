export default class Request {
	config = {
		baseUrl: '/',
		header: {
			'content-type': 'application/json'
		},
		method: 'GET',
		dataType: 'json',
		// #ifdef APP-PLUS
		sslVerify: true,
		// #endif
		API_KEY: "bpQ7]qnAzwe1,HQ74Zt4V(cRf2v[m,",
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

	requestComFun(response) {

	}

	requestComFail(response) {
		
	}

	setConfig(f) {
		this.config = f(this.config);
	}


	async request(options = {}) {
		options.header = options.header || this.config.header;
		// #ifdef APP-PLUS
		options.sslVerify =
			options.sslVerify === undefined
				? this.config.sslVerify
				: options.sslVerify;
		// #endif
		return new Promise((resolve, reject) => {
			 uni.request({
				url: options.url,
				data: options.data,
				header: options.header,
				method: options.method,
				sslVerify: options.sslVerify,
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
		const options = {};
		options.params = params;
		return this.request({
			url,
			method: 'GET',
			...options
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

	// #ifndef MP-ALIPAY
	put(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'PUT',
			...options
		});
	}

	// #endif

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
