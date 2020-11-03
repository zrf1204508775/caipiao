(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{"0621":function(t,n,a){},"117f":function(t,n,a){"use strict";var u=a("0621"),e=a.n(u);e.a},"752a":function(t,n,a){"use strict";a.r(n);var u=a("8204"),e=a.n(u);for(var c in u)"default"!==c&&function(t){a.d(n,t,(function(){return u[t]}))}(c);n["default"]=e.a},8204:function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,iswx:!0}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,n=this.CustomBar,a=this.bgImage,u="height:".concat(n,"px;padding-top:").concat(t,"px;");return this.bgImage&&(u="".concat(u,"background-image:url(").concat(a,");")),u}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},mounted:function(){},methods:{BackPage:function(){t.navigateBack({delta:1})}}};n.default=a}).call(this,a("8adf")["default"])},abb7:function(t,n,a){"use strict";var u;a.d(n,"b",(function(){return e})),a.d(n,"c",(function(){return c})),a.d(n,"a",(function(){return u}));var e=function(){var t=this,n=t.$createElement;t._self._c},c=[]},b303:function(t,n,a){"use strict";a.r(n);var u=a("abb7"),e=a("752a");for(var c in e)"default"!==c&&function(t){a.d(n,t,(function(){return e[t]}))}(c);a("117f");var o,r=a("f0c5"),i=Object(r["a"])(e["default"],u["b"],u["c"],!1,null,"172452d4",null,!1,u["a"],o);n["default"]=i.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('8adf')['createComponent'](__webpack_require__("b303"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);
