import Vue from 'vue';
import Vuex from 'vuex';
import $mConstDataConfig from '@/config/constData.config';
import $mSettingConfig from '@/config/setting.config';

Vue.use(Vuex);
const ACCESSTOKEN = uni.getStorageSync('accessToken') || '';
const THEMECOLOR = uni.getStorageSync('themeColor');

const store = new Vuex.Store({
	state: {
		// 用户token
		accessToken: ACCESSTOKEN,
		// 用户信息
		userInfo: null,
		// 网络状态，用于下载提醒
		networkState: 'unknown',
		themeColor: THEMECOLOR,
		patientInfo: {},
        scanCode: '',
        patientList: [],
        supply: null
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

		// 获取网络状态
		networkStatus: state => {
			return state.networkState;
		},
		// 判断用户是否登录
		hasLogin: state => {
			return !!state.accessToken;
		},
        scanCode: state => {
			return state.scanCode;
		},

        patientInfo: state=>{
            return state.patientInfo
        },

        userInfo : state =>{
            return state.userInfo
        },

        patientList: state =>{
            return state.patientList
        },

        supply: state=>{
            return state.supply
        }
	},
	mutations: {
		login(state, provider) {
			state.accessToken = provider.token;
			state.userInfo = provider;
			uni.setStorageSync('accessToken', provider.token);
			uni.setStorageSync('userInfo', provider);
		},
		logout(state) {
			state.accessToken = '';
			state.userInfo = {};
			uni.removeStorageSync('accessToken');
			uni.removeTabBarBadge({ index: $mConstDataConfig.notifyIndex });
			uni.removeTabBarBadge({ index: $mConstDataConfig.cartIndex });

			uni.removeStorageSync('userInfo');
		},


		setNetworkState(state, provider) {
			state.networkState = provider;
		},


		setThemeColor(state, val) {
			state.themeColor = val;
			uni.setStorageSync('themeColor', val);
		},
        
		setPatientInfo(state, patientInfo){
           
           state.patientInfo = patientInfo;
		},

        setPatientList(state, patientList){
           state.patientList = patientList;
		},
        setScanCode(state, code){
            state.scanCode = code
        },
        
        setSupply(state, supply){
            state.supply = supply
        }
	},
	actions: {

		networkStateChange({ commit }, info) {
			commit('setNetworkState', info);
		},
	}
});

export default store;
