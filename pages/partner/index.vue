<template>
	<view class="bg_hei height pageContent">
		<cu-custom bgColor="bg_black text-white" :isBack="false">
			<block slot="backText"></block>
			<block slot="content">合买大厅</block>
		</cu-custom>
		
		<mescroll-body class="padding-lr-sm padding-top-sm bg_hei" ref="mescrollRef" @init="mescrollInit" :style="[{minHeight:'calc(100% - '+CustomBar+'px'}]" :down="downOption" @down="downCallback" :up="upOption"  @up="upCallback(false)">
			<mescroll-empty :option="empty" v-if="list.length==0"></mescroll-empty>
			<view class="radius padding-lr-sm padding-tb-sm bg-yeq-page margin-bottom-sm" v-for="(item,index) in list" :key="index" @click="detail(item)">
				<view class="flex justify-between">
					<view class="flex flex-direction justify-between">
						<view class="text-bold">{{item.cpTitle}}</view>
						<view class="text-sm">
							<text>第{{item.expect}}期</text>
							<!-- <text class="text-green">-[{{item.stateName}}]</text> -->
						</view>
					</view>
					<view class="flex align-center">
						<view class="radius-50">
							<image class="radius-50 avatars" :src="webUrlN+'/'+item.img" mode="aspectFill"></image>
						</view>
						<view class="margin-left-sm flex flex-direction justify-between userName">
							<view class="vipLv">Lv{{item.group}}</view>
							<view>{{item.username}}</view>
						</view>
					</view>
				</view>
				<view class="width-100">
					<u-line-progress height="6" inactive-color="#000000" active-color="#fb60a7" :percent="Math.round(item.buy/item.amount * 10000) / 100" :show-percent="false"></u-line-progress>
				</view>
				<view class="flex justify-between align-center">
					<view class="flex flex-sub">
						<view class="margin-right-lg flex-twice">
							<view class="text-gray">总金额</view>
							<view class="text-red">￥{{item.amount}}</view>
						</view>
						<view class="margin-right-lg">
							<view class="text-gray">每份</view>
							<view class="">￥1</view>
						</view>
						<view class="margin-right-lg text-center flex-twice">
							<view class="text-gray">剩余(份)</view>
							<view class="">{{item.amount - item.buy}}</view>
						</view>
						<view class="margin-right-lg">
							<view class="text-gray">进度</view>
							<view class="">{{Math.round(item.buy/item.amount * 10000) / 100 + "%"}}</view>
						</view>
					</view>
					<view>
						<u-button class="margin-tb-sm" hover-class="none" :custom-style="customStyle1" type="primary" size="mini" @click="detail(item)">认购</u-button>
					</view>
				</view>
			</view>
		</mescroll-body>
		
	</view>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
export default{
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	components:{MescrollMixin,MescrollEmpty},
	data(){
		return{
			downOption: {//下拉刷新的配置参数
				auto: false, //是否在初始化后,自动执行downCallback;
				bgColor: "#30373f", // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
				textColor: "#fff", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
				textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
				textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
				textLoading: '加载中 ...' // 加载中的提示文本
			},
			upOption:{//上拉加载配置
				page:{
					num : 0 ,
					pageNum : 10 ,
					time : null
				},
				auto:false,//是否在初始化完毕之后自动执行一次上拉加载
				noMoreSize:1,//列表的总数量要大于1条才显示无更多数据,默认5条
				textLoading:'加载中 ...',
				textNoMore:'-- 没有更多 --',
				
			},
			empty:{
				use : true ,
				icon : null ,
				tip : "暂无相关数据",
				btnText : "",
				fixed: false,
				top: "100rpx",
				zIndex: 99
			},
			customStyle1:{
				backgroundColor:'#2b7dd9',
				padding:'0 44rpx'
			},
			list:[],
			prams:{
				page:0,
				pageNum:10
			}
		}
	},
	computed:{
		...mapState(['hasLogin','userInfo','token'])
	},
	onLoad(options) {
		if(!this.hasLogin){
			uni.reLaunch({
				url:'/pages/member/public/login'
			})
		}
	},
	onShow() {
		let that = this
		that.prams.page = 0
		that.upCallback(true)
		that.setrevokeall()
	},
	methods:{
		setrevokeall(){
			uni.request({
				url: this.webUrlN+'/setrevokeall.aspx',
				method:'POST',
				data:{},
				header: {
					/* "Content-Type": "application/x-www-form-urlencoded",
					"Token":this.token.token */
				},
				success: (res) => {},
				fail: (error) => {}
			})
		},
		/*下拉刷新的回调 */
		downCallback() {
			let that = this
			that.prams.page = 0
			that.upCallback(true)
		},
		upCallback(type) {//上拉加载的回调
			let that = this
			let more = true
			
			uni.request({
				url: that.webUrlN+'/getbuylist.aspx',
				method:'POST',
				data:that.prams,
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Token":that.token.token
				},
				success: (res) => {
					
					if(res.data.status == 1){
						if(that.list.length==0){
							that.list = res.data.data
						}else{
							that.list = that.list.concat(res.data.data)
						}
						
						if(type){
							that.list = res.data.data
						}
						
						if(that.list.length == res.data.total){
							more = false
						}else{
							more = true
							that.prams.page+=1
						}
						
						that.mescroll.endSuccess(that.prams.pageNum+1, more); //必传参数(当前页的数据个数, 是否有下一页true/false)	
					}
				},
				fail: (error) => {
					
				}
			})
		},
		detail(item){
			uni.navigateTo({
				url:'/pages/partner/partner_detail?orderId='+item.orderId
			})
		},
		
	}
}
</script>

<style lang="scss" scoped>
.scrollbox{
	//height:calc(100% - 90rpx);
}
.bg_black{
	background-color: #333333;
}
.vipLv{
	padding: 0 16rpx;
	border-top-right-radius: 10rpx;
	border-bottom-left-radius: 10rpx;
	background-color: #9c1de6;
	color: white;
}
page{
	height: 100%;
}
.pageContent{
	padding-bottom: 20rpx;
}
.radius{
	border-radius: 12rpx;
}
.avatars{
	width: 80rpx;
	height: 80rpx;
}
.userName{
	height: 80rpx;
	font-size: 24rpx;
}
</style>
