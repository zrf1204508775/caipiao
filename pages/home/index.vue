<template>
	<view class="pageBody height">
		<!-- <cu-custom bgColor="bg-black" :isBack="false">
			<block slot="backText"></block>
			<block slot="content">购彩</block>
		</cu-custom> -->
		
		<view id="headcontent" class="flex align-center bg_black text-white flex-wrap headcontent ">
			<view class="xtht" :style="[{height:cusheight+'px'}]"></view>
			<view class="headbox round">
				<image class="headeImg round" :src="webUrlN+'/'+userData.img" mode="aspectFill"></image>
			</view>
			<view class="vipbox margin-left-sm flex align-center flex-wrap" style="height: 84rpx;">
				<text class="vipLv bg-zi">Lv{{userData.level}}</text>
				<view class="width-100">{{userData.user}}</view>
			</view>
			
			<view class="width-100 height100 align-center flex justify-between">
				<view>
					<text class="iconfont icon-wodeyue text-yellow"></text>
					<text class="text-yellow text-lg text-bold ye">￥{{userData.money}}</text>
				</view>
				<view>
					<u-button class="margin-lg" hover-class="none" :custom-style="customStyle1" type="primary" size="mini" @click="navTo('/pages/member/recharge/index',1)">充值</u-button>
					<u-button type="primary" hover-class="none" :custom-style="customStyle2" size="mini" @click="navTo('/pages/member/bank/drawing',1)">提现</u-button>
				</view>
			</view>
			<view class="width-100 padding-bottom-sm">
				<view class="text-sm text-gray flex justify-between">
					<text>投注任务</text>
					<text>{{userData.chongzhi-userData.xima}}/{{userData.chongzhi}}</text>
				</view>
				<u-line-progress height="6" active-color="#e4007f" inactive-color="#0f0f10" :percent="((userData.chongzhi-userData.xima)/userData.chongzhi)*100" :show-percent="false"></u-line-progress>
			</view>
		</view>
		
		<mescroll-body class="" ref="mescrollRef" @init="mescrollInit" :style="[{minHeight:'calc(100% - '+CustomBar+'px',marginTop:CustomBar+'px'}]" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
			
			<view class="width-100 bg_black"  v-if="gridList4.length>0">
				<view class="bg-yeq-page radius_top_left radius_top_right">
					<view class="cu-bar solid-bottom">
						<view class="action">
							<text class="cuIcon-titles" style="color: #9c1de6;"></text>
							<text class="text-black">大家在玩</text>
						</view>
					</view>
					<view>
						<menus :navs="gridList4"></menus>
					</view>
				</view>
			</view>
			<view class="bg-yeq-page padding-sm xxbox" v-if="winninglist.length>0">
				<view class="flex align-center">
					<view>
						<image class="width160" style="height: 84rpx" src="../../static/my/home_flipper_logo.png" mode="scaleToFill"></image>
					</view>
					<view class="margin-left-sm padding-left-sm solid_1left flex-sub flex  flex-direction justify-between">
						<swiper class="swiper" :autoplay="true" :circular="true" :vertical="true" style="height: 84rpx">
							<swiper-item v-for="(item,indexs) in winninglist" :key="indexs" class="flex align-center">
								<view class="swiper-item flex-sub flex flex-wrap align-center">
									<view class="flex justify-between align-center width-100">
										<text>{{item.username}}</text>
										<!-- <text class="text-gray">{{item.date}}</text> -->
									</view>
									<view class="flex justify-between align-center">
										<text class="text-cut1 flex-sub">{{item.remark}}</text>
										<text class="text-red margin-left-sm">喜中￥{{item.amount}}</text>
									</view>
								</view>
							</swiper-item>
						</swiper>
						
					</view>
					
				</view>
			</view>
			<view class="bg-yeq-page margin-top-sm">
				<u-swiper :list="swiperList" img-mode="aspectFill" border-radius="0" height="200"></u-swiper>
			</view>
			
			<!-- <view class="width-100 margin-top-sm" v-if="gridList1.length>0">
				<classNames :gridList="gridList1" :title="'时时彩'"></classNames>
			</view> -->
			<view class="width-100 margin-top-sm" v-if="gridList2.length>0">
				<classNames :gridList="gridList2" :title="'低频彩'"></classNames>
			</view>
			<view class="width-100 margin-tb-sm" v-if="gridList3.length>0">
				<classNames :gridList="gridList3" :title="'11选5'"></classNames>
			</view>
			<view class="width-100 margin-tb-sm" v-if="gridList3.length>0">
				<classNames :gridList="navs" :title="'数字彩'"></classNames>
			</view>
			<view class="width-100 margin-tb-sm bg-yeq-page">
				<view class="cu-bar">
					<view class="action">
						<text class="cuIcon-titles" style="color: #9c1de6;"></text>
						<text class="text-black">平台特点</text>
					</view>
				</view>
				<image class="width-100 height300" :src="bannerImg" mode="aspectFill"></image>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
import menus from "./menu.vue"
import swipers from "./swiper.vue"
import classNames from "./className.vue"
import {mapState,mapMutations} from 'vuex';
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";

import moment from "../../common/moment.min.js"
export default{
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	components:{menus,swipers,classNames,MescrollMixin},
	data(){
		return{
			CustomBar:152,//this.CustomBar
			cusheight:this.CustomBar,
			userData:{},
			customStyle1:{
				backgroundColor:'#fb60a7',
				padding:'0 30rpx',
				color:'#fff8f3'
			},
			customStyle2:{
				backgroundColor:'#2b7dd9',
				padding:'0 30rpx',
				color:'#fff8f3'
			},
			navs:[
				{
					type:'szc',
					imgurl: '../../static/sz2.png',
					title:'大乐透',
					info:'周一、三、六开奖'
				},
				{
					type:'szc',
					imgurl: '../../static/sz1.png',
					title:'双色球',
					info:'大奖属于你'
				},
				
			],
			swiperList:[
				{
					image: '../../static/2.jpg',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				},
				{
					image: '../../static/3.jpg',
					title: '身无彩凤双飞翼，心有灵犀一点通'
				},
			],
			bannerImg:'../../static/1.jpg',
			winninglist:[],
			gridList1:[],
			gridList2:[],
			gridList3:[],
			gridList4:[],
			downOption: {
				auto: true ,//是否在初始化后,自动执行downCallback; 默认true
				bgColor: "#30373f", // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
				textColor: "#fff", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
			},
			upOption:{
				use:false
			}
		}
	},
	computed:{
		...mapState(['hasLogin','userInfo','token'])
	},
	onLoad(options) {
		let that = this
		if(!that.hasLogin){
			uni.reLaunch({
				url:'/pages/member/public/login'
			})
		}
		
		let view = uni.createSelectorQuery().in(that).select("#headcontent");
		setTimeout(function(){
			view.fields({
			  size: true,
			  scrollOffset: true
			}, data => {
			  console.log("得到节点信息" + JSON.stringify(data));
			  console.log("节点的宽为" + data.width);
			  console.log('节点信息',data.height)
			  that.CustomBar = data.height
			}).exec();
		},500)
		
	},
	onShow() {
		this.getuser()
		this.getlist()
		this.getwinninglist()
		this.getAD()
		//moment(1602991720).format("YYYY-MM-DD HH:mm:ss"),
	},
	methods:{
		...mapMutations(['login','logout','setuser']),
		getAD(){
			uni.request({
				url: this.webUrlN+'/getAD.aspx',
				method:'POST',
				data:{},
				header: {},
				success: (res) => {
					console.log(res)
					this.swiperList = res.data.data1
					this.bannerImg = res.data.data2[0].image
				},
				fail: (error) => {
					//this.$api.msg(error.data.message)
				}
			})
		},
		getwinninglist(){//中奖公告
			uni.request({
				url: this.webUrlN+'/getwinninglist.aspx',
				method:'POST',
				data:{},
				header: {
					//"Content-Type": "application/x-www-form-urlencoded",
					"Token":this.token.token
				},
				success: (res) => {
					console.log(res)
					let data = res.data.data
					this.winninglist = data
				},
				fail: (error) => {
					//this.$api.msg(error.data.message)
				}
			})
		},
		
		/*下拉刷新的回调 */
		downCallback() {
			let that = this
			setTimeout(function(){
				that.getuser()
				that.mescroll.endSuccess();
			},1000)
		},
		upCallback(page) {
			let that = this
			let more = true
			setTimeout(function(){
				more = false
				that.mescroll.endSuccess(1,more);
				/* that.dataList = that.dataList.concat(that.dataList);
				console.log(that.dataList.length)
				if(that.dataList.length>=40){
					more = false
				}
				
				that.mescroll.endSuccess(that.dataList.length+1, more); //必传参数(当前页的数据个数, 是否有下一页true/false) */
			},1000)
		},
		getlist(){
			uni.request({
				url: this.webUrlN+'/list.aspx',
				method:'GET',
				data:{
					//token:"node01tyj5sj010ky1euugrwgiv1vp60219"
				},
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Token":this.token.token
				},
				success: (res) => {
					console.log(res)
					this.gridList1 = res.data.data1
					this.gridList2 = res.data.data3
					this.gridList3 = res.data.data2
					this.gridList4 = res.data.data4
					
				},
				fail: (error) => {
					//this.$api.msg(error.data.message)
				}
			})
		},
		getuser(){
			let that = this
			uni.request({
				url: that.webUrlN+'/getinfo.aspx',
				method:'POST',
				data:{},
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Token":that.token.token
				},
				success: (res) => {
					//console.log('res.data',res.data)
					if(Number(res.data.status) == 1){
						this.userData = res.data
						
						let dataInfo = res.data
						console.log('dataInfo',dataInfo)
						this.setuser(dataInfo);
					}
					
				}
			})
		},
		navTo(url,type){
			/* if(!this.hasLogin){
				url = '/pages/member/public/login?data=1';
			} */
			if(type == 2){
				this.$api.msg('功能开发中')
			}
			if(type == 1){
				uni.navigateTo({
					url
				})  
			}
		}, 
	}
}
</script>

<style lang="scss" scoped>
page{
	height: 100%;
}
.xtht{
	height: var(--status-bar-height);
}
.zindex{
	/* width: 100%;
	z-index: 99;
	position: fixed;
	top: 0; */
}
.headcontent{
	width: 100%;
	padding: 0 24rpx;
	padding-top: 22rpx;
	position: fixed;
	top: 0;//var(--status-bar-height)
	left: 0;
	z-index: 9;
	.headbox{
		height: 84rpx;
	}
	.headeImg{
		width: 84rpx;
		height: 84rpx;
	}
	.vipbox{
		height: 84rpx;
	}
}

.icon-wodeyue{
	font-size: 44rpx;
}
.ye{
	font-size: 48rpx;
}
.xxbox{
	border-top: 1upx solid #e8e8e8;
}

.radius_top_left{
	border-top-left-radius: 16rpx;
}
.radius_top_right{
	border-top-right-radius: 16rpx;
}
.pageBody{
	background-color: #f5f5f5;
}
.vipLv{
	padding: 0 16rpx;
	border-top-right-radius: 10rpx;
	border-bottom-left-radius: 10rpx;
	color: white;
	font-size: 24rpx;
}
</style>
