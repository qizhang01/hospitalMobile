import Vue from 'vue';
import Vuex from 'vuex';
import $mConstDataConfig from '@/config/constData.config';
import $mSettingConfig from '@/config/setting.config';

Vue.use(Vuex);
const ACCESSTOKEN = uni.getStorageSync('accessToken') || '';
const USER = uni.getStorageSync('user') || {};
const REFRESHTOKEN = uni.getStorageSync('refreshToken') || '';
const GLOBALCONFIG = uni.getStorageSync('globalConfig') || {};
const THEMECOLOR = uni.getStorageSync('themeColor');

const store = new Vuex.Store({
	state: {
		// 用户token
		accessToken: ACCESSTOKEN,
		// 用户信息
		userInfo: USER.member,
		// 网络状态，用于下载提醒
		networkState: 'unknown',
		globalConfig: GLOBALCONFIG,
		refreshToken: REFRESHTOKEN,
		themeColor: THEMECOLOR,
		patientInfo: {}
	},
	getters: {

		// 全局配置
		themeColor: state => {
			let theme = state.themeColor;
			if (!theme) {
				theme = $mConstDataConfig.themeList.filter((item) => item.name === ($mSettingConfig.styleType || 'rf'))[0];
			}
			return theme;
		},
		// 全局配置
		globalConfig: state => {
			return state.globalConfig;
		},
		// 获取网络状态
		networkStatus: state => {
			return state.networkState;
		},
		// 判断用户是否登录
		hasLogin: state => {
			return !!state.accessToken;
		}
	},
	mutations: {
		login(state, provider) {
			state.accessToken = provider.access_token;
			state.refreshToken = provider.refresh_token;
			state.userInfo = provider.member;
			state.user = provider;
			uni.setStorageSync('user', provider);
			uni.setStorageSync('accessToken', provider.access_token);
			uni.setStorageSync('refreshToken', provider.refresh_token);
			uni.setStorageSync('userInfo', provider.member);
		},
		logout(state) {
			state.accessToken = '';
			state.refreshToken = '';
			state.userInfo = {};
			uni.removeStorageSync('accessToken');
			uni.removeTabBarBadge({ index: $mConstDataConfig.notifyIndex });
			uni.removeTabBarBadge({ index: $mConstDataConfig.cartIndex });
			uni.removeStorageSync('refreshToken');
			uni.removeStorageSync('userInfo');
		},


		setNetworkState(state, provider) {
			state.networkState = provider;
		},

		setGlobalConfig(state, provider) {
			state.globalConfig = provider;
			uni.setStorageSync('globalConfig', provider);
		},

		setThemeColor(state, val) {
			state.themeColor = val;
			uni.setStorageSync('themeColor', val);
		},
        
		setPatientInfo(state, patientInfo){
           state.patientInfo = patientInfo;
		}
	},
	actions: {
		globalConfigChange({ commit }, info) {
			commit('setGlobalConfig', info);
		},
		networkStateChange({ commit }, info) {
			commit('setNetworkState', info);
		},
		logout({ commit }) {
			commit('logout');
		}
	}
});

export default store;
