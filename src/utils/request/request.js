/**
 * Request 1.0.6
 * @Class Request
 * @description luch-request 1.0.6 http请求插件
 * @Author lu-ch
 * @Date 2020-03-17
 * @Email webwork.s@qq.com
 * http://ext.dcloud.net.cn/plugin?id=392
 */
export default class Request {
	config = {
		baseUrl: '',
		header: {
			'content-type': 'application/json'
		},
		method: 'GET',
		dataType: 'json',
		// #ifndef MP-ALIPAY || APP-PLUS
		responseType: 'text',
		// #endif
		custom: {},
		// #ifdef MP-ALIPAY
		timeout: 30000,
		// #endif
		// #ifdef APP-PLUS
		sslVerify: true
		// #endif
	};

	static posUrl(url) {
		/* 判断url是否为绝对路径 */
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
	}


	/**
	 * @property {Function} request 请求拦截器
	 * @property {Function} response 响应拦截器
	 * @type {{request: Request.interceptor.request, response: Request.interceptor.response}}
	 */
	interceptor = {
		/**
		 * @param {Request~requestCallback} cb - 请求之前拦截,接收一个函数（config, cancel）=> {return config}。第一个参数为全局config,第二个参数为函数，调用则取消本次请求。
		 */
		request: cb => {
			if (cb) {
				this.requestBeforeFun = cb;
			}
		},
		/**
		 * @param {Request~responseCallback} cb 响应拦截器，对响应数据做点什么
		 * @param {Request~responseErrCallback} ecb 响应拦截器，对响应错误做点什么
		 */
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
		return response;
	}

	requestComFail(response) {
		return response;
	}

	/**
	 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
	 * @param { Number } statusCode - 请求响应体statusCode（只读）
	 * @return { Boolean } 如果为true,则 resolve, 否则 reject
	 */
	validateStatus(statusCode) {
		return statusCode === 200;
	}

	/**
	 * @Function
	 * @param {Request~setConfigCallback} f - 设置全局默认配置
	 */
	setConfig(f) {
		this.config = f(this.config);
	}


	async request(options = {}) {
		options.baseUrl = this.config.baseUrl;
		options.dataType = options.dataType || this.config.dataType;
		// #ifndef MP-ALIPAY || APP-PLUS
		options.responseType = options.responseType || this.config.responseType;
		// #endif
		// #ifdef MP-ALIPAY
		options.timeout = options.timeout || this.config.timeout;
		// #endif
		options.url = options.url || '';
		options.data = options.data || {};
		options.params = options.params || {};
		options.header = options.header || this.config.header;
		options.method = options.method || this.config.method;
		options.custom = { ...this.config.custom, ...(options.custom || {}) };
		// #ifdef APP-PLUS
		options.sslVerify =
			options.sslVerify === undefined
				? this.config.sslVerify
				: options.sslVerify;
		// #endif
		options.getTask = options.getTask || this.config.getTask;
		return new Promise((resolve, reject) => {
			let next = true;
			const cancel = (t = 'handle cancel', config = options) => {
				const err = {
					errMsg: t,
					config: config
				};
				reject(err);
				next = false;
			};

			const handleRe = { ...this.requestBeforeFun(options, cancel) };
			if (!next) return;
			const requestTask = uni.request({
				url: options.url,
				data: options.data,
				header: options.header,
				method: options.method,
				sslVerify: options.sslVerify,
				complete: response => {
					response.config = handleRe;
					if (this.validateStatus(response.statusCode)) {
						// 成功
						response = this.requestComFun(response);
						resolve(response);
					} else {
						response = this.requestComFail(response);
						reject(response);
					}
				}
			});
			if (handleRe.getTask) {
				handleRe.getTask(requestTask, handleRe);
			}
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
