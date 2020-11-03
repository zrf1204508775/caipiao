<template>
	<view class="pageHeight">
		<cu-custom class="text-white" bgColor="bg_black text-white" :isBack="true"><block slot="backText"></block><block slot="content">我的投注</block></cu-custom>
		<mescroll-body class="" ref="mescrollRef" @init="mescrollInit" :style="[{minHeight:'calc(100% - '+CustomBar+'px'}]" :down="downOption" :up="upOptions" @down="downCallback" @up="upCallback(false)">
				<mescroll-empty :option="empty" v-if="dataList.length==0"></mescroll-empty>
				<view class="bg-white flex flex-wrap justify-between margin-bottom-sm" v-for="(item,index) in dataList" :key="index" @click="detail(item)">
					<view class="width-100 text-df u-border-bottom flex align-center justify-between padding-sm ">
						<view class="flex-sub">
							<text class="text-bold text-black">{{item.cpTitle}}</text>
							<text class="margin-left-xs text-hong">￥{{item.amount}}</text>
							<view class="padding-top-xs ">第{{item.expect}}期</view>
						</view>
						<view class="flex flex-wrap justify-end">
							<!-- <u-button type="primary" hover-class="none" :custom-style="style2" size="mini">进行中</u-button> -->
							<view class="status" v-if="item.status == 0">进行中</view>
							<view class="status" :class="(item.status == 1)?'status2':''" v-if="item.status == 1">已中奖</view>
							<view class="status" :class="(item.status == -1)?'status3':''" v-if="item.status == -1">未中奖</view>
							<view class="status" :class="(item.status == -2)?'status3':''" v-if="item.status == -2">已撤销</view>
							<view class="status" :class="(item.status == 9)?'status2':''" v-if="item.status == 9">开奖中</view>
							<view class="padding-top-xs text-hong width-100 text-right jine">{{(item.status == 1)?'':''}}</view>
						</view>
					</view>
					<view class="width-100 padding-sm flex align-center">
						<text class="iconfont icon-lishi margin-right-xs"></text>
						<view class="flex-sub">{{item.gettime}}</view>
						<text class="iconfont icon-xiaojiantou"></text>
					</view>
				</view>
			
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
	import {mapState,mapMutations} from 'vuex';
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components:{MescrollMixin,MescrollEmpty},
		data() {
			return {
				CustomBar: this.CustomBar,
				downOption: {//下拉刷新配置
					auto: false //是否在初始化后,自动执行downCallback;
				},
				upOptions:{//上拉加载配置
					page:{
						num : 0 ,
						pageNum : 10 ,
						time : null
					},
					auto:true,//是否在初始化完毕之后自动执行一次上拉加载
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
				dataList: [],
				prams:{
					page:0,
					pageNum:10
				}
			}
		},
		computed:{
			...mapState(['hasLogin','userInfo','token'])
		},
		methods: {
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
					url: that.webUrlN+'/getbetlist.aspx',
					method:'POST',
					data:that.prams,
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"Token":that.token.token
					},
					success: (res) => {
						if(res.data.status == 1){
							if(that.dataList.length==0){
								that.dataList = res.data.orderdetailinfo
							}else{
								that.dataList = that.dataList.concat(res.data.orderdetailinfo)
							}
							
							if(type){
								that.dataList = res.data.orderdetailinfo
							}
							
							if(that.dataList.length == res.data.total){
								more = false
							}else{
								more = true
								that.prams.page+=1
							}
							
							that.mescroll.endSuccess(this.prams.pageNum, more); //必传参数(当前页的数据个数, 是否有下一页true/false)				
							
						}
					},
					fail: (error) => {
						
					}
				})
			},
			detail(item){
				uni.navigateTo({
					url:'/pages/member/betinfo/betinfoDetail?orderId='+item.orderId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
page{
	height: 100%;
}
.pageHeight{
	height: 100%;
}
.status{
	width: 110rpx;
	padding: 4rpx 0rpx;
	background: #2b7dd9;
	border-radius: 8rpx;
	color: white;
	display: flex;
	align-items: center;
	justify-content:center;
	font-size: 24rpx;
}
.status2{
	background: #fb60a7;
}
.status3{
	background: #808080;
}
.icon-xiaojiantou{
	font-size: 38rpx;
}
.jine{
	min-width: 120rpx;
	min-height: 40rpx;
}
/*说明*/
.notice{
	font-size: 30upx;
	padding: 40upx 0;
	border-bottom: 1upx solid #eee;
	text-align: center;
}
/*展示上拉加载的数据列表*/
.news-li{
	font-size: 32upx;
	padding: 32upx;
	border-bottom: 1upx solid #eee;
}
.news-li .new-content{
	font-size: 28upx;
	margin-top: 10upx;
	margin-left: 20upx;
	color: #666;
}
</style>
