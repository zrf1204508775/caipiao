(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-member-user_info-index"],{"4eb2":function(a,e,t){"use strict";t.r(e);var s=t("52bf"),r=t("5eec");for(var n in r)"default"!==n&&function(a){t.d(e,a,(function(){return r[a]}))}(n);t("8175");var i,o=t("f0c5"),u=Object(o["a"])(r["default"],s["b"],s["c"],!1,null,"0facc99b",null,!1,s["a"],i);e["default"]=u.exports},"52bf":function(a,e,t){"use strict";t.d(e,"b",(function(){return r})),t.d(e,"c",(function(){return n})),t.d(e,"a",(function(){return s}));var s={uModal:t("c23a").default},r=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("v-uni-view",{staticClass:"bg-white text-black"},[t("cu-custom",{staticClass:"text-white",attrs:{bgColor:"bg-black",isBack:!0}},[t("template",{attrs:{slot:"backText"},slot:"backText"}),t("template",{attrs:{slot:"content"},slot:"content"},[a._v("基本资料")])],2),t("v-uni-view",{staticClass:"cu-form-group margin-top",on:{click:function(e){arguments[0]=e=a.$handleEvent(e),a.ChooseImage.apply(void 0,arguments)}}},[t("v-uni-view",{staticClass:"title"},[a._v("头像")]),t("v-uni-view",{staticClass:"flex align-center"},[t("v-uni-view",{staticClass:"cu-avatar radius-50 margin-right-xs"},[t("v-uni-image",{staticClass:"u-avatar-demo",attrs:{src:a.webUrl+a.userData.img,mode:"aspectFill"}})],1),t("v-uni-text",{staticClass:"iconfont icon-xiaojiantou"})],1)],1),t("v-uni-view",{staticClass:"cu-form-group margin-top bg-gray"},[t("v-uni-view",{staticClass:"title text-gray"},[a._v("基本信息")])],1),t("v-uni-view",{staticClass:"cu-form-group u-border-bottom",on:{click:function(e){arguments[0]=e=a.$handleEvent(e),a.userShow=!0}}},[t("v-uni-view",{staticClass:"title"},[a._v("昵称")]),t("v-uni-view",{staticClass:"flex align-center"},[t("v-uni-view",[t("v-uni-input",{staticClass:"text-right",attrs:{disabled:"disabled",placeholder:"昵称"},model:{value:a.userData.nickname,callback:function(e){a.$set(a.userData,"nickname",e)},expression:"userData.nickname"}})],1),t("v-uni-text",{staticClass:"iconfont icon-xiaojiantou"})],1)],1),t("u-modal",{attrs:{title:"修改昵称","show-cancel-button":!0},on:{confirm:function(e){arguments[0]=e=a.$handleEvent(e),a.confirmName.apply(void 0,arguments)}},model:{value:a.userShow,callback:function(e){a.userShow=e},expression:"userShow"}},[t("v-uni-view",{staticClass:"margin-lr-lg flex-sub padding-tb-lg bg-white radius"},[t("v-uni-view",{staticClass:"height80 margin-lr-sm margin-top-sm solid_1 radius flex align-center justify-between"},[t("v-uni-input",{staticClass:"height80 padding-lr-sm flex-sub",attrs:{type:"text",placeholder:"昵称"},model:{value:a.userData.nickname,callback:function(e){a.$set(a.userData,"nickname",e)},expression:"userData.nickname"}})],1)],1)],1),t("v-uni-view",{staticClass:"cu-form-group u-border-bottom",on:{click:function(e){arguments[0]=e=a.$handleEvent(e),a.QShow=!0}}},[t("v-uni-view",{staticClass:"title"},[a._v("QQ")]),t("v-uni-view",{staticClass:"flex align-center"},[t("v-uni-view",[t("v-uni-input",{staticClass:"text-right",attrs:{disabled:"disabled",placeholder:"QQ"},model:{value:a.userData.qq,callback:function(e){a.$set(a.userData,"qq",e)},expression:"userData.qq"}})],1),t("v-uni-text",{staticClass:"iconfont icon-xiaojiantou"})],1)],1),t("u-modal",{attrs:{title:"修改QQ","show-cancel-button":!0},on:{confirm:function(e){arguments[0]=e=a.$handleEvent(e),a.confirmName.apply(void 0,arguments)}},model:{value:a.QShow,callback:function(e){a.QShow=e},expression:"QShow"}},[t("v-uni-view",{staticClass:"margin-lr-lg flex-sub padding-tb-lg bg-white radius"},[t("v-uni-view",{staticClass:"height80 margin-lr-sm margin-top-sm solid_1 radius flex align-center justify-between"},[t("v-uni-input",{staticClass:"height80 padding-lr-sm flex-sub",attrs:{type:"text",placeholder:"QQ"},model:{value:a.userData.qq,callback:function(e){a.$set(a.userData,"qq",e)},expression:"userData.qq"}})],1)],1)],1)],1)},n=[]},"5eec":function(a,e,t){"use strict";t.r(e);var s=t("aab1"),r=t.n(s);for(var n in s)"default"!==n&&function(a){t.d(e,a,(function(){return s[a]}))}(n);e["default"]=r.a},"72a7":function(a,e,t){var s=t("8d09");"string"===typeof s&&(s=[[a.i,s,""]]),s.locals&&(a.exports=s.locals);var r=t("4f06").default;r("66792cf0",s,!0,{sourceMap:!1,shadowMode:!1})},8175:function(a,e,t){"use strict";var s=t("72a7"),r=t.n(s);r.a},"8d09":function(a,e,t){var s=t("24fb");e=s(!1),e.push([a.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 主题文本色 */\r\n/* 订单状态色 */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* 页面左右间距 */\r\n/* 文字尺寸 */\r\n/*文字颜色*/\r\n/* 边框颜色 */\r\n/* 图片加载中颜色 */\r\n/* 行为相关颜色 */uni-page-body[data-v-0facc99b]{height:100%;background-color:#fff}.text-right[data-v-0facc99b]{text-align:right!important}.u-form-item[data-v-0facc99b]::after{border-bottom-width:0}.cu-form-group-birthday[data-v-0facc99b]{border-bottom:none}.cu-form-group[data-v-0facc99b]{-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;border:none}.cu-avatar[data-v-0facc99b]{width:%?70?%;height:%?70?%}.u-avatar-demo[data-v-0facc99b]{width:%?70?%;height:%?70?%;-webkit-border-radius:50%;border-radius:50%}.iconfont[data-v-0facc99b]{font-size:%?40?%}',""]),a.exports=e},aab1:function(a,e,t){"use strict";var s=t("4ea4");t("99af"),t("a9e3"),t("d3b7"),t("ac1f"),t("25f0"),t("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=s(t("ade3")),n=s(t("5530")),i=t("2f62"),o={data:function(){return{userData:{},avatar:"",actionSheetShow:!1,labelPosition:"left",actionSheetList:[{text:"男"},{text:"女"},{text:"保密"}],model:{sex:"",name:"",birthday:"",address:"",addressId:["11","1101","110101"],changDesc:""},userShow:!1,userName:"",QShow:!1,changDescShow:!1,birthdayShow:!1,params:{year:!0,month:!0,day:!0,hour:!1,minute:!1,second:!1},addressShow:!1}},computed:(0,n.default)({},(0,i.mapState)(["hasLogin","userInfo","token"])),onLoad:function(a){},onShow:function(){this.getuser()},onReady:function(){},created:function(){},methods:(0,n.default)({getuser:function(){var a=this,e=this;uni.request({url:e.webUrl+"info.php",method:"POST",data:{},header:{"Content-Type":"application/x-www-form-urlencoded",Token:e.token.token},success:function(e){if(1==Number(e.data.status)){a.userData=e.data;var t=e.data;console.log("dataInfo",t),a.setuser(t)}}})},confirmName:function(){var a=this,e=this;console.log(typeof e.model.addressId.toString()),uni.request({url:e.webUrl+"upuser.php",method:"POST",data:{nickname:e.userData.nickname,qq:e.userData.qq},header:{"Content-Type":"application/x-www-form-urlencoded",Token:this.token.token},success:function(t){1==t.data.status&&(e.$api.msg(t.data.message),a.getuser())}})},confirmDesc:function(){var a=this,e=this;uni.request({url:e.webUrl+"/user/updateUserInfo",method:"GET",data:{userid:e.userData.userid,avatar:e.userData.avatar,nickname:e.userData.nickname,birthday:e.userData.birthday,gender:e.userData.gender,remark:e.userData.remark,address:e.userData.address,address_id:e.model.addressId.toString()},header:{},success:function(t){1==t.data.state&&(e.$api.msg(t.data.message),a.getuser())}})},actionSheetCallback:function(a){var e=this,t=this;uni.request({url:t.webUrl+"/user/updateUserInfo",method:"GET",data:{userid:t.userData.userid,gender:t.actionSheetList[a].text,avatar:t.userData.avatar,nickname:t.userData.nickname,birthday:t.userData.birthday,remark:t.userData.remark,address:t.userData.address,address_id:t.model.addressId.toString()},header:{},success:function(a){1==a.data.state&&(t.$api.msg(a.data.message),e.getuser())}})},birthday:function(a){var e=this;console.log(a);var t=a.year+"-"+a.month+"-"+a.day,s=this;uni.request({url:s.webUrl+"/user/updateUserInfo",method:"GET",data:{userid:s.userData.userid,avatar:s.userData.avatar,nickname:s.userData.nickname,birthday:t,gender:s.userData.gender,remark:s.userData.remark,address:s.model.address,address_id:s.model.addressId.toString()},header:{},success:function(a){1==a.data.state&&(s.$api.msg(a.data.message),e.getuser())}})},address:function(a){var e=this;this.model.address=a.province.label+" "+a.city.label+" "+a.area.label;var t=a.province.value+","+a.city.value+","+a.area.value,s=t.split(",");this.model.addressId=s,console.log(this.model.addressId);var r=this;uni.request({url:r.webUrl+"/user/updateUserInfo",method:"GET",data:{userid:r.userData.userid,avatar:r.userData.avatar,nickname:r.userData.nickname,birthday:r.userData.birthday,gender:r.userData.gender,remark:r.userData.remark,address:r.model.address,address_id:r.model.addressId.toString()},header:{},success:function(a){1==a.data.state&&(r.$api.msg(a.data.message),e.getuser())}})},ChooseImage:function(){var a=this;uni.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(e){var t;a.userData.avatar=e.tempFilePaths[0],console.log(e.tempFilePaths);var s=e.tempFilePaths;uni.uploadFile((t={url:a.webUrl+"/upimg.php",header:{},filePath:s[0],name:"file1",formData:{token:a.token.token}},(0,r.default)(t,"header",{}),(0,r.default)(t,"success",(function(e){console.log(e),a.getuser()})),t))}})},chooseAvatar:function(){var a=this;uni.chooseImage({count:9,sizeType:["original","compressed"],sourceType:["album"],success:function(e){0!=a.imgList.length?a.imgList=a.imgList.concat(e.tempFilePaths):a.imgList=e.tempFilePaths}})}},(0,i.mapMutations)(["login","logout","setuser"]))};e.default=o}}]);