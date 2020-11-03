import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		token:{},
		userInfo: {},
	},
	mutations: {
		
		login(state, provider) {
			state.hasLogin = true;
			state.token = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'token',  
			    data: provider  
			}) 
		},
		logout(state) {
			state.hasLogin = false;
			state.token = {};
			uni.removeStorage({  
                key: 'token'  
            })
			uni.reLaunch({
				url:'/pages/member/public/login'
			})
		},
		setuser(state,provider){
			state.userInfo = provider;
			uni.setStorage({//缓存用户信息
			    key: 'userInfo',  
			    data: provider  
			}) 
		}
	},
	actions: {
	
	}
})

export default store
