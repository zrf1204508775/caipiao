(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/member/index"],{"54f1":function(e,t,n){},6408:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("2f62");function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=function(){n.e("pages/member/menu").then(function(){return resolve(n("490e"))}.bind(null,n)).catch(n.oe)},s=function(){n.e("components/list-cell").then(function(){return resolve(n("857c"))}.bind(null,n)).catch(n.oe)},a=function(){n.e("common/vendor").then(function(){return resolve(n("f7e1"))}.bind(null,n)).catch(n.oe)},f={mixins:[a],components:{menus:c,listCell:s,MescrollMixin:a},data:function(){return{CustomBar:136,cusheight:this.CustomBar,downOption:{use:!0,auto:!0,native:!1,autoShowLoading:!1,isLock:!1,offset:80,inOffsetRate:1,outOffsetRate:.2,bottomOffset:20,minAngle:45,bgColor:"#30373f",textColor:"#fff",textInOffset:"下拉刷新",textOutOffset:"释放更新",textLoading:"加载中 ..."},upOption:{use:!1},customStyle1:{backgroundColor:"#fb60a7",padding:"0 30rpx",color:"#fff8f3"},customStyle2:{backgroundColor:"#2b7dd9",padding:"0 30rpx",color:"#fff8f3"},addNewTip:"确定要退出登录么",addNewShow:!1,userData:{},navs:[{src:"../../static/my/me_01.png",title:"我的投注",url:"/pages/member/betinfo/index"},{src:"../../static/my/me_02.png",title:"账单明细",url:"/pages/member/bill/index"},{src:"../../static/my/me_03.png",title:"签到福利",url:"/pages/member/point_signin"},{src:"../../static/my/me_04.png",title:"联系客服",url:"/pages/member/tkefu/index"}]}},computed:u({},(0,o.mapState)(["hasLogin","userInfo","token"])),onLoad:function(t){var n=this;n.hasLogin||e.reLaunch({url:"/pages/member/public/login"});var o=e.createSelectorQuery().in(n).select("#headcontent");setTimeout((function(){o.fields({size:!0,scrollOffset:!0},(function(e){console.log("得到节点信息"+JSON.stringify(e)),console.log("节点的宽为"+e.width),console.log("节点信息",e.height),n.CustomBar=e.height})).exec()}),500)},onShow:function(){this.getuser()},methods:u(u({},(0,o.mapMutations)(["login","logout","setuser"])),{},{downCallback:function(){var e=this;setTimeout((function(){e.mescroll.endSuccess()}),500)},upCallback:function(e){var t=this,n=!0;setTimeout((function(){n=!1,t.mescroll.endSuccess(1,n)}),500)},getuser:function(){var t=this,n=this;e.request({url:n.webUrlN+"/getinfo.aspx",method:"POST",data:{},header:{"Content-Type":"application/x-www-form-urlencoded",Token:n.token.token},success:function(e){if(1==Number(e.data.status)){t.userData=e.data;var n=e.data;console.log("dataInfo",n),t.setuser(n)}}})},navTo:function(t,n){2==n&&this.$api.msg("功能开发中"),1==n&&e.navigateTo({url:t})}})};t.default=f}).call(this,n("8adf")["default"])},"6dce":function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return o}));var o={uLineProgress:function(){return n.e("uview-ui/components/u-line-progress/u-line-progress").then(n.bind(null,"34be"))},uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"6660b"))}},r=function(){var e=this,t=e.$createElement;e._self._c},u=[]},"8ed7":function(e,t,n){"use strict";n.r(t);var o=n("6dce"),r=n("c54f");for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);n("a423");var i,c=n("f0c5"),s=Object(c["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);t["default"]=s.exports},a423:function(e,t,n){"use strict";var o=n("54f1"),r=n.n(o);r.a},c54f:function(e,t,n){"use strict";n.r(t);var o=n("6408"),r=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=r.a},c847:function(e,t,n){"use strict";(function(e){n("f533");o(n("66fd"));var t=o(n("8ed7"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("8adf")["createPage"])}},[["c847","common/runtime","common/vendor"]]]);