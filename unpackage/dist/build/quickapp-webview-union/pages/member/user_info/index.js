(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/member/user_info/index"],{"0367":function(e,t,n){"use strict";(function(e){n("f533");o(n("66fd"));var t=o(n("4eb2"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("8adf")["createPage"])},"33b9":function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}));var o={uModal:function(){return n.e("uview-ui/components/u-modal/u-modal").then(n.bind(null,"c23a"))}},r=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.userShow=!1},e.e1=function(t){e.QShow=!0})},a=[]},"4eb2":function(e,t,n){"use strict";n.r(t);var o=n("33b9"),r=n("5eec");for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);n("7f79");var u,c=n("f0c5"),i=Object(c["a"])(r["default"],o["b"],o["c"],!1,null,"730d83db",null,!1,o["a"],u);t["default"]=i.exports},5688:function(e,t,n){},"5eec":function(e,t,n){"use strict";n.r(t);var o=n("8504"),r=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=r.a},"7f79":function(e,t,n){"use strict";var o=n("5688"),r=n.n(o);r.a},8504:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("2f62");function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c={data:function(){return{userData:{},userShow:!1,userName:"",QShow:!1}},computed:a({},(0,o.mapState)(["hasLogin","userInfo","token"])),onLoad:function(e){},onShow:function(){this.getuser()},onReady:function(){},created:function(){},methods:a({getuser:function(){var t=this,n=this;e.request({url:n.webUrlN+"/getinfo.aspx",method:"POST",data:{},header:{"Content-Type":"application/x-www-form-urlencoded",Token:n.token.token},success:function(e){if(1==Number(e.data.status)){t.userData=e.data;var n=e.data;console.log("dataInfo",n),t.setuser(n)}}})},confirmName:function(){var t=this,n=this;console.log(typeof n.model.addressId.toString()),e.request({url:n.webUrlN+"/upinfo.aspx",method:"POST",data:{nickname:n.userData.nickname,qq:n.userData.qq,p:"user"},header:{"Content-Type":"application/x-www-form-urlencoded",Token:this.token.token},success:function(e){1==e.data.status&&(n.$api.msg(e.data.info),t.getuser())}})},ChooseImage:function(){var t=this;e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(n){t.userData.avatar=n.tempFilePaths[0],console.log(n.tempFilePaths);var o=n.tempFilePaths;e.uploadFile({url:t.webUrlN+"/upload.aspx",header:{Token:t.token.token},filePath:o[0],name:"File1",formData:{runat:"server"},success:function(e){console.log(e),t.getuser()}})}})}},(0,o.mapMutations)(["login","logout","setuser"]))};t.default=c}).call(this,n("8adf")["default"])}},[["0367","common/runtime","common/vendor"]]]);