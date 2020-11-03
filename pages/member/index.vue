<template>
	<view class="height">
		<cu-custom bgColor="bg_black" class="text-white" :isBack="false">
			<block slot="backText"></block>
			<block slot="content">会员中心</block>
		</cu-custom>
		<view id="headcontent" :style="[{top:cusheight-1+'px'}]" class="flex align-center padding-sm padding-lr-lg bg_black text-white flex-wrap">
			<view class="round">
				<image  class="avatar round" :src="webUrlN+'/'+userData.img" mode="aspectFill"></image>
			</view>
			<view class="height120 margin-left-sm justify-between flex-sub">
				<text class="vipLv bg-zi">Lv{{userData.level}}</text>
				<view>{{userData.user}}</view>
				<view class="width-100">
					<view class="text-sm text-gray flex justify-between">
						<text>投注任务</text>
						<text>{{userData.chongzhi-userData.xima}}/{{userData.chongzhi}}</text>
					</view>
					<u-line-progress height="6" active-color="#e4007f" inactive-color="#0f0f10" :percent="((userData.chongzhi-userData.xima)/userData.chongzhi)*100" :show-percent="false"></u-line-progress>
				</view>
			</view>
			
			<view class="width-100 height100 margin-top-sm align-center flex justify-between">
				<view>
					<text class="iconfont icon-wodeyue text-yellow"></text>
					<text class="text-yellow text-xxl ye">￥{{userData.money}}</text>
				</view>
				<view>
					<u-button class="margin-lg" hover-class="none" :custom-style="customStyle1" type="primary" size="mini" @click="navTo('/pages/member/recharge/index',1)">充值</u-button>
					<u-button type="primary" hover-class="none" :custom-style="customStyle2" size="mini" @click="navTo('/pages/member/bank/drawing',1)">提现</u-button>
				</view>
			</view>
		</view>
		
		
		<mescroll-body class="mescroll-body" ref="mescrollRef" @init="mescrollInit" :style="[{minHeight:'calc(100% - '+CustomBar+'px',marginTop:CustomBar-2+'px'}]" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
			<view class="bg_black padding-top-sm">
				<view class="bg-yeq-page radius_top_left radius_top_right">
					<menus :navs="navs"></menus>
				</view>
			</view>
			<view class="icon bg-white margin-top-sm">
				<list-cell :icon="'icon-wodeqianbao'" title="银行资料" @eventClick="navTo('/pages/member/bank/index',1)"></list-cell>
				<list-cell :icon="'icon-mima'" title="密码设置" @eventClick="navTo('/pages/member/setPw/index',1)"></list-cell>
				<list-cell :icon="'icon-geren'" title="基本资料" @eventClick="navTo('/pages/member/user_info/index',1)"></list-cell>
				<list-cell :border="false" :icon="'icon-shezhi1'" title="系统设置" @eventClick="navTo('/pages/member/set/index',1)"></list-cell>
			</view>
		</mescroll-body>
		
		
		
	</view>
</template>

<script>
import menus from "./menu.vue"
import listCell from '@/components/list-cell.vue'
import {mapState,mapMutations} from 'vuex';
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
export default{
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	components:{menus,listCell,MescrollMixin},
	data(){
		return{
			CustomBar:136,//this.CustomBar
			cusheight:this.CustomBar,
			downOption: {//下拉刷新的配置参数
				use: true, // 是否启用下拉刷新; 默认true
				auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				native: false, // 是否使用系统自带的下拉刷新; 默认false; 仅mescroll-body生效 (值为true时,还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
				autoShowLoading: false, // 如果设置auto=true(在初始化完毕之后自动执行下拉刷新的回调),那么是否显示下拉刷新的进度; 默认false
				isLock: false, // 是否锁定下拉刷新,默认false;
				offset: 80, // 在列表顶部,下拉大于80upx,松手即可触发下拉刷新的回调
				inOffsetRate: 1, // 在列表顶部,下拉的距离小于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
				outOffsetRate: 0.2, // 在列表顶部,下拉的距离大于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
				bottomOffset: 20, // 当手指touchmove位置在距离body底部20upx范围内的时候结束上拉刷新,避免Webview嵌套导致touchend事件不执行
				minAngle: 45, // 向下滑动最少偏移的角度,取值区间  [0,90];默认45度,即向下滑动的角度大于45度则触发下拉;而小于45度,将不触发下拉,避免与左右滑动的轮播等组件冲突;
				bgColor: "#30373f", // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
				textColor: "#fff", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
				textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
				textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
				textLoading: '加载中 ...' // 加载中的提示文本
			},
			upOption:{
				use:false
			},
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
			addNewTip:'确定要退出登录么',
			addNewShow:false,
			userData:{},
			navs:[
				{
					src: '../../static/my/me_01.png',
					title:'我的投注',
					url:'/pages/member/betinfo/index'
				},
				{
					src: '../../static/my/me_02.png',
					title:'账单明细',
					url:'/pages/member/bill/index'
				},
				{
					src: '../../static/my/me_03.png',
					title:'签到福利',
					url:'/pages/member/point_signin'
				},
				{
					src: '../../static/my/me_04.png',
					title:'联系客服',
					url:'/pages/member/tkefu/index'
				}
			],
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
	},
	methods:{
		...mapMutations(['login','logout','setuser']),
		/*下拉刷新的回调 */
		downCallback() {
			let that = this
			setTimeout(function(){
				that.getuser()
				that.mescroll.endSuccess();
			},500)
		},
		upCallback(page) {
			let that = this
			let more = true
			setTimeout(function(){
				more = false
				that.mescroll.endSuccess(1,more);
			},500)
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

<style lang="scss">
page{
	height: 100%;
}
.mescroll-body{
	margin: 268rpx 0 0 0;
}
#headcontent{
	width: 100%;
	padding: 0 24rpx;
	padding-top: 26rpx;
	position: fixed;
	top: 0;//var(--status-bar-height)
	left: 0;
	z-index: 9;
}
.icon-wodeyue{
	font-size: 44rpx;
}
.avatar{
	width: 120rpx;
	height: 120rpx;
}
.vipLv{
	padding: 0 16rpx;
	border-top-right-radius: 10rpx;
	border-bottom-left-radius: 10rpx;
	//background-color: #ff9900;
	color: white;
	font-size: 24rpx;
}
.ye{
	font-size: 48rpx;
	font-weight: bold;
}
.add-btn{
/* 	position: fixed;
	left: 30upx;
	right: 30upx;
	bottom: 16upx; */
	z-index: 95;
	display: flex;
	align-items: center;
	justify-content: center;
	/* width: 690upx; */
	margin: 60rpx 40rpx;
	height: 80upx;
	font-size: 32upx;
	color: #fff;
	background-color:#e60000;
	border-radius: 10upx;
	//box-shadow: 1px 2px 5px #e60000;		
}
</style>
