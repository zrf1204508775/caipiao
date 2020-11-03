<template>
	<view class="height bg-yeq-page prize bg_hei">
		<cu-custom bgColor="bg_black text-white" :isBack="false">
			<block slot="backText"></block>
			<block slot="content">开奖公告</block>
		</cu-custom>
		
	
		<mescroll-body class="" ref="mescrollRef" @init="mescrollInit" :style="[{minHeight:'calc(100% - '+CustomBar+'px'}]" :down="downOption" @down="downCallback" :up="upOption">
			<u-grid :col="2" hover-class="none" class="radius_top_left radius_top_right width-100">
				<u-grid-item v-for="(item,index) in gridList" @click="hist(item)" class="bg_hei">
					<view class="flex justify-between width-100 align-center">
						<view class="padding-lr-sm">
							<view class="text-white">{{item.title}}</view>
							<view class="text-gray margin-top-xs">第{{item.expect}}期</view>
							<view class="margin-top-xs flex flex-wrap">
								<text class="numberbg" v-for="(num,numIndex) in item.number">{{num}}</text>
								<text class="numberbg numberbgl box-shadow" v-for="(numblue,blueIndex) in item.number_blue">{{numblue}}</text>
							</view>
						</view>
					</view>
				</u-grid-item>
			</u-grid>
		</mescroll-body>
		
		
	</view>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
export default{
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	components:{MescrollMixin},
	data(){
		return{
			loadStatus:'nomore',
			sort:'all',//all
			gridList:[
				/* {
					cq:'智利3分彩',
					describes:'20200923',
					number:[9,8,3,3,12],
					number_blue:[9],
					id:1
				} */
			],
			timer:null,
			downOption: {//下拉刷新的配置参数
				auto: false, //是否在初始化后,自动执行downCallback;
				bgColor: "#30373f", // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
				textColor: "#fff", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
				textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
				textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
				textLoading: '加载中 ...' // 加载中的提示文本
			},
			upOption:{//上拉刷新的配置参数
				use:false
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
		this.getkj()
		/* clearInterval(this.timer)
		let that = this
		that.timer = setInterval(function(){
			that.getkj()
		},1000*60) */
		
	},
	/* onPullDownRefresh() {
		this.getkj(true)
	}, */
	methods:{
		/*下拉刷新的回调 */
		downCallback() {
			let that = this
			setTimeout(function(){
				that.mescroll.endSuccess();
			},500)
		},
		hist(item){
			uni.navigateTo({
				url:'/pages/prize/history?title='+item.title+'&id='+item.cq
			})
		},
		getkj(pull){
			uni.request({
				url: this.webUrlN+'/kj.aspx',
				method:'POST',
				data:{
					sort:this.sort
				},
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Token":this.token.token
				},
				success: (res) => {
					console.log(res.data.data)
					if(res.data.status == '1'){
						let data = res.data.data
						for(let i=0; i<data.length; i++){
							data[i].number = data[i].number.split(',')
							//data[i].number_blue = data[i].number_blue.split(' ')
						}
						
						this.gridList = data
						if(pull){
							uni.stopPullDownRefresh()
							uni.showToast({title:'刷新成功',icon:'none'})
						}
					}else{
						//this.$api.msg(res.data.message)
					}
				}
			})
		}
	},
	onUnload() {
		clearInterval(this.timer)
	}
}
</script>

<style lang="scss" scoped>
page{
	height: 100%;
}

.scrollbox{
	height:calc(100% - 90rpx);
}

.numberbg{
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	margin-right: 5rpx;
	margin-bottom: 8rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32rpx;
	font-weight: bold;
	/* background-image: radial-gradient(#ea6942,#ea7e50,#db5343,#ba5b47); */
	background: url(../../static/buy_detail_01.png) no-repeat;
	background-size: 100% 100%;
	background-position: center center;
	color: white;
	//border: 1upx solid #ba5b47;
}
.numberbgl{
	background-image: radial-gradient(#0584f3, #0c92d2, #0976c5, #0976c5);
	border: 1upx solid #0976c5;
}
.u-border-left:after{
	border-left-width: 0px;
}
.u-border-top:after{
	border-top-width: 0px;
}
.bg_black{
	background-color: #333333;
}
.radius_top_left{
	border-top-left-radius: 16rpx;
}
.radius_top_right{
	border-top-right-radius: 16rpx;
}
</style>
