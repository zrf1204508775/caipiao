(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"545a":function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=c(o("66fd")),r=o("2f62");function c(e){return e&&e.__esModule?e:{default:e}}function u(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function l(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?u(Object(o),!0).forEach((function(t){a(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):u(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function a(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var i={onLaunch:function(){console.log("App Launch"),e.getSystemInfo({success:function(e){n.default.prototype.StatusBar=e.statusBarHeight,"android"==e.platform?n.default.prototype.CustomBar=e.statusBarHeight+50:n.default.prototype.CustomBar=e.statusBarHeight+45}});var t=this;e.getStorage({key:"token",success:function(e){console.log("App.vue 获取缓存成功  -------------------------",e);var o={token:e.data.token};console.log("token",o),t.login(o)},fail:function(e){t.logout(),console.log("获取token本地缓存失败")}})},methods:l({},(0,r.mapMutations)(["login","logout"])),onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};t.default=i}).call(this,o("8adf")["default"])},d012:function(e,t,o){},de35:function(e,t,o){"use strict";(function(e,t){o("f533");var n=l(o("66fd")),r=l(o("e6b4")),c=l(o("3f3d")),u=l(o("3751"));function l(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){f(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function f(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}n.default.use(c.default),n.default.prototype.$store=u.default;var s=function(){o.e("colorui/components/cu-custom").then(function(){return resolve(o("b303"))}.bind(null,o)).catch(o.oe)},p=function(){o.e("colorui/components/home-header").then(function(){return resolve(o("1c51"))}.bind(null,o)).catch(o.oe)};n.default.component("cu-custom",s),n.default.component("home-header",p);var d=function(t){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1500,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"none";!1!==Boolean(t)&&e.showToast({title:t,duration:o,mask:n,icon:r})},b=function(t,o){1==o&&t?e.navigateTo({url:t}):e.showToast({title:"功能研发中...",icon:"none"})};n.default.prototype.$api={msg:d,navTo:b};var m=function(){Promise.all([o.e("common/vendor"),o.e("components/mescroll-uni/mescroll-body")]).then(function(){return resolve(o("b0d8"))}.bind(null,o)).catch(o.oe)},v=function(){Promise.all([o.e("common/vendor"),o.e("components/mescroll-uni/mescroll-uni")]).then(function(){return resolve(o("e6d5"))}.bind(null,o)).catch(o.oe)};n.default.component("mescroll-body",m),n.default.component("mescroll-uni",v),n.default.prototype.webUrlN="http://154.221.25.233:8080",n.default.config.productionTip=!1,r.default.mpType="app";var g=new n.default(i({},r.default));t(g).$mount()}).call(this,o("8adf")["default"],o("8adf")["createApp"])},e6b4:function(e,t,o){"use strict";o.r(t);var n=o("f147");for(var r in n)"default"!==r&&function(e){o.d(t,e,(function(){return n[e]}))}(r);o("ebfc");var c,u,l,a,i=o("f0c5"),f=Object(i["a"])(n["default"],c,u,!1,null,null,null,!1,l,a);t["default"]=f.exports},ebfc:function(e,t,o){"use strict";var n=o("d012"),r=o.n(n);r.a},f147:function(e,t,o){"use strict";o.r(t);var n=o("545a"),r=o.n(n);for(var c in n)"default"!==c&&function(e){o.d(t,e,(function(){return n[e]}))}(c);t["default"]=r.a}},[["de35","common/runtime","common/vendor"]]]);