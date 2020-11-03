<template>
	<view class="pageHeight">
		<cu-custom class="text-white" bgColor="bg_black text-white" :isBack="true"><block slot="backText"></block><block slot="content">账单明细</block></cu-custom>
		<mescroll-body class="bg_hei" ref="mescrollRef" @init="mescrollInit" :up="upOptions" :style="[{minHeight:'calc(100% - '+CustomBar+'px'}]" :down="downOption" @down="downCallback" @up="upCallback()">
			<mescroll-empty :option="empty" v-if="dataList.length==0"></mescroll-empty>
			<view class="margin-lr-lg">
				<view class="padding-tb-sm flex align-center justify-between u-border-bottom text-white" v-for="(item,index) in dataList" :key="index">
					<view>
						<view>{{item.name}}</view>
						<view class="text-gray margin-top-sm">{{item.date}}</view>
					</view>
					<view class="text-xl text-bold text-hong">{{item.amount}}</view>
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
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				upOptions:{//上拉加载配置
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
					pageNum:20
				}
			}
		},
		computed:{
			...mapState(['hasLogin','userInfo','token'])
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				console.log(this.dataList)
				let that = this
				//that.dataList = []
				that.prams.page = 0
				this.upCallback(true)
				/* setTimeout(function(){
					that.mescroll.endSuccess();
				},1000) */
				
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(type) {
				let that = this
				let more = true
				uni.request({
					url: this.webUrlN+'/getuserecording.aspx',
					method:'POST',
					data:this.prams,
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"Token":this.token.token
					},
					success: (res) => {
						if(res.data.status == 1){
							if(that.dataList.length==0){
								that.dataList = res.data.data
							}else{
								that.dataList = that.dataList.concat(res.data.data)
							}
							if(type){
								that.dataList = res.data.data
							}
							if(that.dataList.length == res.data.total){
								more = false
							}else{
								more = true
								this.prams.page+=1
							}
							that.mescroll.endSuccess(this.prams.pageNum, more); //必传参数(当前页的数据个数, 是否有下一页true/false)						
						}
						
					},
					fail: (error) => {
						
					}
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
