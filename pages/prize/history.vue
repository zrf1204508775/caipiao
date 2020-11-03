<template>
	<view>
		<cu-custom bgColor="bg_black text-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view class="historyBox" v-if="datashow">
			<view class="listhead flex justify-between align-center">
				<view class="flex-sub text-center">期号</view>
				<view class="flex-treble text-center">开奖号码</view>
				<view class="flex-sub text-center">开奖时间</view>
			</view>
			<view class="listhead flex justify-between align-center" v-for="(item,index) in obj" :key="index">
				<view class="flex-sub text-color">{{item.expect}}</view>
				<view class="flex-twice text-center">
					<view class="flex justify-center margin-top-sm">
						<text class="numberbg" v-for="(item1,index1) in item.number" :key="index1">{{item1}}</text>
					</view>
				</view>
				<view class="flex-sub text-color text-right">{{ $u.timeFormat(item.opentime, 'mm-dd hh:MM')}}</view>
			</view>
			
			<u-loadmore :status="loadStatus" bgColor="#f0f0f0" v-if="obj.length>0"></u-loadmore>
			
			<u-empty text="暂无开奖记录" mode="data" v-if="obj.length<0"></u-empty>
			
		</view>
	</view>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default{
	data(){
		return{
			CustomBar: this.CustomBar,
			title:'',
			cpId:0,
			loadStatus:'nomore',
			obj:[],
			datashow:false,
			prams:{
				page:0,
				pageNum:20
			}
		}
	},
	computed:{
		...mapState(['hasLogin','userInfo','token'])
	},
	onLoad(options) {
		this.title = options.title
		this.cpId = options.id
		uni.showLoading({
			mask:true
		})
		this.getkj()
	},
	onShow() {
		
	},
	onReachBottom() {
		console.log('到底了')
		this.loadStatus = 'loading'
		let that = this
		that.prams.page = that.prams.page+1
		that.getkj()
	},
	methods:{
		getkj(pull){
			uni.request({
				url: this.webUrlN+'/kj.aspx',
				method:'POST',
				data:{
					sort:this.cpId,
					page:this.prams.page,
					pageNum:this.prams.pageNum
				},
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Token":this.token.token
				},
				success: (res) => {
					console.log(res.data.data)
					if(res.data.status == '1'){
						this.datashow=true
						uni.hideLoading();
						let data = res.data.data
						for(let i=0; i<data.length; i++){
							data[i].number = data[i].number.split(',')
							//data[i].number_blue = data[i].number_blue.split(' ')
						}
						
						if(this.obj.length == 0){
							this.obj = data
						}else{
							this.obj = this.obj.concat(data)
						}
						if(this.obj.length == res.data.total){
							this.loadStatus = 'nomore'
						}else{
							this.loadStatus = 'more'
						}
						/* if(pull){
							uni.stopPullDownRefresh()
							uni.showToast({title:'刷新成功',icon:'none'})
						} */
					}else{
						//this.$api.msg(res.data.message)
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.historyBox{
	.listhead{
		padding: 0 20rpx;
		background-color: #30373f;
		height: 100rpx;
		color: #e0e3e6;
		font-size: 28rpx;
		border-bottom: 1upx solid #484d52;
		.text-color{
			color: #7b7e85;
		}
		.numberbg{
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			margin-right: 5rpx;
			margin-bottom: 8rpx;
			font-size: 32rpx;
			font-weight: bold;
			display: flex;
			align-items: center;
			justify-content: center;
			/* background-image: radial-gradient(#ea6942,#ea7e50,#db5343,#ba5b47); */
			background: url(../../static/buy_detail_01.png) no-repeat;
			background-size: 100% 100%;
			background-position: center center;
			background-position-y: 2rpx;
			color: white;
			//border: 1upx solid #ba5b47;
		}
	}
}
page{
	/* background-color: gray; */
}
</style>
