<template>
	<view class="parter">
		<cu-custom bgColor="bg_black text-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">方案详情</block>
		</cu-custom>
		<view class="height bg_black parter_content" :style="[{height:'calc(100% - '+CustomBar+'px'}]">
			<scroll-view scroll-y class="height scrollbox radius_top_left radius_top_right">
				<view class="padding-lr-sm margin-tb-sm margin-bottom-sm">
					<view class="flex justify-between">
						<view class="flex flex-direction justify-between">
							<view class="text-bold">{{data.cpTitle}}</view>
							<view class="text-sm">
								<text>第{{data.expect}}期</text>
								<!-- <text class="text-green">-[{{data.gettime}}]</text> -->
							</view>
						</view>
						<view class="flex align-center">
							<view class="radius-50">
								<image class="radius-50 avatars" :src="webUrlN+'/'+data.img" mode="aspectFill"></image>
							</view>
							<view class="margin-left-sm flex flex-direction justify-between userName">
								<view class="vipLv bg-zi">Lv{{data.group}}</view>
								<view>{{data.username}}</view>
							</view>
						</view>
					</view>
					<view class="width-100 ">
						<u-line-progress height="6" inactive-color="#000000" active-color="#fb60a7" :percent="Math.floor((data.total-(data.total- data.amount))/data.total*10000)/100" :show-percent="false"></u-line-progress>
					</view>
					<view class="flex justify-between align-center text-df">
						<view class="flex-sub flex justify-center">
							<view class="margin-right-sm flex-twice">
								<view class="text-gray">总金额</view>
								<view class="text-red">￥{{data.total}}</view>
							</view>
							<view class="margin-right-sm flex-sub text-center">
								<view class="text-gray">每份</view>
								<view class="">￥1</view>
							</view>
							<view class="margin-right-sm flex-twice text-center">
								<view class="text-gray">剩余(份)</view>
								<view class="">{{data.total- data.amount}}</view>
							</view>
							<view class="margin-right-sm flex-sub text-center">
								<view class="text-gray">进度</view>
								<view class="">{{ Math.floor((data.total-(data.total- data.amount))/data.total*10000)/100 }}%</view>
							</view>
							<view class="margin-right-sm flex-sub text-center">
								<view class="text-gray">保底</view>
								<view class="">{{data.baodi}}</view>
							</view>
						</view>
					</view>
					<view class="width-100 padding-sm flex justify-end" v-if="user.user == data.username && data.status == 0">
						<text class="bg-lan padding-lr-sm padding-tb-xs text-white text-sm radius10" @click="cheDan">撤销订单</text>
					</view>
				</view>
				<u-gap height="20" bg-color="#f5f5f5"></u-gap>
				
				<view class="cu-bar padding-lr-sm">
					<u-section title="方案内容" :right="false" color="#58685f" :arrow="false" line-color="#fab214" sub-color="#34483d"></u-section>
				</view>
				<u-line color="#e9e9e9" />
				<view class="padding-sm padding-tb-xs text-df u-border-bottom" v-for="(item,index) in data.data">
					<view>选号：<text class="text-red text-bold text-lg">{{item.tzcode}}</text></view>
					<view class="padding-top-xs">{{item.playtitle}} {{item.itemcount}}注 {{item.itemcount*2}}元</view>
				</view>
				<u-gap height="20" bg-color="#f5f5f5"></u-gap>
				
				<view class="cu-bar padding-lr-sm">
					<u-section title="执行情况" :right="false" color="#58685f" :arrow="false" line-color="#fab214"></u-section>
				</view>
				<u-line color="#e9e9e9" />
				
				<view class="padding-lr-sm zx">
					<view class="flex height60 align-center">
						<view class="flex-twice">期号</view>
						<view class="flex-sub">倍数(倍)</view>
						<view class="flex-sub">状态</view>
					</view>
					<view class="flex height60 align-center">
						<view class="flex-twice">第{{data.expect}}期</view>
						<view class="flex-sub">{{data.beishu?data.beishu:'1'}}</view>
						<view class="flex-sub flex justify-between align-center" @click="show = true">
							<view class="text-lan" v-if="data.status == 0">进行中</view>
							<view class="text-lan" v-if="data.status == 1">已中奖</view>
							<view class="text-lan" v-if="data.status == -1">未中奖</view>
							<view class="text-lan" v-if="data.status == -2">已撤单</view>
							<view class="text-lan" v-if="data.status == 9">开奖中</view>
							<text class="iconfont icon-xiaojiantou"></text>
						</view>
					</view>
				</view>
				<u-gap height="20" bg-color="#f5f5f5"></u-gap>
				<view class="cu-bar padding-lr-sm">
					<u-section title="认购用户" :right="false" color="#58685f" :arrow="false" line-color="#fab214"></u-section>
				</view>
				<u-line color="#e9e9e9" />
				<view class="padding-lr-sm zx">
					<view class="flex height50 align-center">
						<view class="flex-sub">用户名</view>
						<view class="flex-sub">认购金额</view>
						<view class="flex-sub">所占股份</view>
						<view class="flex-sub">中奖金额</view>
					</view>
					<view class="flex height50 align-center" v-for="item in data.userlist">
						<view class="flex-sub">{{item.username}}</view>
						<view class="flex-sub">￥{{item.amount}}</view>
						<view class="flex-sub">{{ (item.amount/data.total*100).toFixed(2) }}%</view>
						<view class="flex-sub text-red">{{data.okamount?'￥'+(data.okamount*(item.amount/data.total)).toFixed(2):'--'}}</view>
					</view>
				</view>
				
			</scroll-view>
			
		</view>
		
		<u-popup v-model="show" mode="center" border-radius="10" width="86%">
			<view class="height80 flex align-center justify-center relative">
				<text>{{data.cpTitle}}(第{{data.expect}}期)</text>
				<text class="iconfont icon-shanchu" @click="show = false"></text>
			</view>
			<u-line color="#e9e9e9" />
			<view class="padding-sm">
				<view class="flex justify-between align-center height60">
					<view>倍数：</view>
					<view>{{data.beishu?data.beishu:'1'}}倍</view>
				</view>
				<view class="flex justify-between align-center height60">
					<view>认购金额：</view>
					<view>{{data.total}}元</view>
				</view>
				<view class="flex justify-between align-center height60">
					<view>状态：</view>
					<view class="text-lan" v-if="data.status == 0">进行中</view>
					<view class="text-lan" v-if="data.status == 1">已中奖</view>
					<view class="text-lan" v-if="data.status == -1">未中奖</view>
					<view class="text-lan" v-if="data.status == -2">已撤销</view>
					<view class="text-lan" v-if="data.status == 9">开奖中</view>
				</view>
				<view class="flex justify-between align-center height60">
					<view>开奖号码：</view>
					<view class="text-red text-bold text-lg">{{data.opencode?data.opencode:'--'}}</view>
				</view>
				<view class="flex justify-between align-center height60">
					<view>奖金：</view>
					<view>{{data.okamount?data.okamount+'元':'--'}}</view>
				</view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default{
	data(){
		return{
			CustomBar: this.CustomBar,
			show:false,
			orderId:'',
			data:{},
			user:{}
		}
	},
	computed:{
		...mapState(['hasLogin','userInfo','token'])
	},
	onLoad(options) {
		this.orderId = options.orderId
		this.getuser()
		this.getDetail()
	},
	onShow() {
	
	},
	methods:{
		cheDan(){
			uni.request({
				url: this.webUrlN+'/setrevoke.aspx',
				method:'POST',
				data:{
					orderId:this.data.orderId,
					type:this.data.type
				},
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Token":this.token.token
				},
				success: (res) => {
					this.$api.msg(res.data.info)
				}
			})
		},
		getDetail(){
			uni.request({
				url: this.webUrlN+'/getbetdetails.aspx',
				method:'POST',
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Token":this.token.token
				},
				data:{
					orderId:this.orderId
				},
				success: (res) => {
					let data = res.data
					var str = "";
					//var reg = /^(.).+(.)$/g;
					for(let i=0; i<data.userlist.length; i++){
						//str = data.userlist[i].username.replace(reg, "$1****$2")
						str = data.userlist[i].username.substring(0,2) +'**'
						data.userlist[i].username = str
					}
					this.data = res.data
				},
				fail: (error) => {
					
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
					if(Number(res.data.status) == 1){
						let dataInfo = res.data
						this.user = res.data
						console.log('dataInfo',dataInfo)
						this.setuser(dataInfo);
					}
					
				}
			})
		},
		...mapMutations(['setuser']),
	}
}
</script>

<style lang="scss" scoped>
page{
	height: 100%;
}
.bottomBox{
	position: fixed;
	width: 100%;
	height: 90rpx;
	z-index: 9;
	bottom:0;
	left:0;
	.zxz{
		background-color: #ec6660;
		color: #fef6f6;
		font-size: 24rpx;
		height: 60rpx;
	}
}
.parter{
	height: 100%;
	.parter_content{
		//height: calc(100% - 90rpx);
		.cu-bar{
			min-height:84rpx
		}
	}
}
.scrollbox{
	//background-color: #f5f5f5;
	background-color: #fff;
	overflow-x: hidden;
	color: #2c4135;
	
	.uni-scroll-view, .uni-scroll-view-content{
		height: auto !important;
	}
	.text-color{
		color: #58685f;
	}
	.zx{
		font-size: 24rpx;
		color: #2c4135;
	}
}
.bg_black{
	background-color: #333333;
}
.vipLv{
	padding: 0 16rpx;
	border-top-right-radius: 10rpx;
	border-bottom-left-radius: 10rpx;
	background-color: #f97221;
	color: white;
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
.icon-shanchu{
	position: absolute;
	right: 14rpx;
	color: #f97221;
}
</style>
