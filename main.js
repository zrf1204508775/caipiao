import Vue from 'vue'
import App from './App'


// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView)

//状态管理
import store from './store'
Vue.prototype.$store = store;

/* 自定义导航栏 */
import cuCustom from './colorui/components/cu-custom.vue'
import homeHeader from './colorui/components/home-header.vue'
Vue.component('cu-custom',cuCustom)
Vue.component('home-header',homeHeader)



//统一提示方便全局修改
const msg = (title, duration=1500, mask=false, icon='none')=>{
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

//统一页面跳转方便全局修改
const navTo = (url,type)=>{
	if(type==1 && url){
		uni.navigateTo({
			url:url
		})
	}else{
		uni.showToast({
			title:'功能研发中...',
			icon:'none'
		});
	}
}
Vue.prototype.$api = {msg,navTo}


// 注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)




//线上接口
//Vue.prototype.webUrl = 'http://bcadmin.rjlnn7.cn/vip/'

//本地接口
//Vue.prototype.webUrl = 'http://106.53.89.89/cq';
Vue.prototype.webUrlN='http://154.221.25.233:8080'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
