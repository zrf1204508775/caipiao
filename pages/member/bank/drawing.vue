<template>
	<view>
		<cu-custom bgColor="bg_black text-white" :isBack="true"><block slot="backText"></block><block slot="content">提现</block></cu-custom>
		<view class="padding-lr-sm height120 flex align-center bg-yeq-page justify-between" @click="$api.navTo('/pages/member/bank/index',1)">
			<view class="margin-left-sm" v-if="userData.code">
				<view class="margin-bottom-xs">{{userData.bankname}}</view>
				<view>{{userData.code}}</view>
			</view>
			<view v-else>
				<view class="margin-bottom-xs">未绑定银行卡</view>
				<view>请先绑卡</view>
			</view>
			<text class="iconfont icon-xiaojiantou"></text>
		</view>
		<u-gap height="20" bg-color="#f1f1f1"></u-gap>
		<view class="padding-left-sm bg-yeq-page">
			<view class="padding-tb-sm">提现金额</view>
			<view class="flex text-xxl align-center padding-tb-lg u-border-bottom text-hong">
				<text class="text-xxl">￥</text>
				<input class="input margin-left-sm text-xxl" type="number" v-model="money"  placeholder="提现金额" placeholder-class="placeholder" />
			</view>
			<view class="flex align-center justify-between height100">
				<view class="flex-sub u-border-right">可用金额 <text class="text-bold text-lg">￥{{userData.money}}</text></view>
				<view class="padding-lr-sm height100 flex align-center text-lan" @click="all">全部提现</view>
			</view>
		</view>
		<button class="add-btn bg-lan" @click="submit">确定提现</button>
		<view class="text-disble text-center">预计30分钟后到账</view>
		<view class="text-disble padding-sm">
			提现要求: 你需要充值余额, 并完成投注任务.
		</view>
		<view class="text-disble padding-lr-sm padding-top-sm">
			1、提现处理时间每天10：00-22：00 ，每日可提款三次。
		</view>
		<view class="text-disble padding-lr-sm padding-top-sm">
			2、每笔最低提款金额为100元，最高无限制；当您的账户资金低于100元时，则无法进行提款。
		</view>
		<view class="text-disble padding-lr-sm padding-top-sm">
			3、 为了防止恶意套现行为，充值即需消费充值金额和赠送金额的百分之百才能提款。
		</view>
		<view class="text-disble padding-lr-sm padding-top-sm">
			4、如果提现银行卡信息有误将会导致提现不成功；金额将立即退回本站账户。若因个人原因填错他人银行卡信息及真实姓名提现转出成功，将无法退还。
		</view>
		<view class="text-disble padding-lr-sm padding-top-sm">
			5、不支持提现到信用卡及第三方支付（如微信、财付通等）。
		</view>
		<view class="text-disble padding-sm">
			6、提现预计到帐时间：在银行处理无任何意外的情况下， 提现提交后10分钟内到账。若您的提款30分钟未到账，请及时联系在线客服 ，最终解释权归本网站所有 。
		</view>
	</view>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default{
	data(){
		return{
			userData:{},
			money:'',
			ye:10,
		}
	},
	computed:{
		...mapState(['hasLogin','userInfo','token'])
	},
	onLoad(options) {
		console.log(this.token)
	},
	onShow() {
		this.getuser()
	},
	methods:{
		submit(){
			if(!this.userData.code){
				this.$api.msg('请先绑卡')
				return
			}
			if(this.money<100 || this.money == ''){
				this.$api.msg('最少提现100元')
				return
			}
			if(this.money>this.userData.money){
				this.$api.msg('余额不足')
				return
			}
			uni.request({
				url: this.webUrlN+'/setoutmoney.aspx',
				method:'POST',
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Token":this.token.token
				},
				data:{
					code:this.userData.code,
					money:this.money
				},
				success: (res) => {
					this.$api.msg(res.data.info)
					if(Number(res.data.status == 1)){
						this.money = ''
						this.getuser()
					}
				}
			})
		},
		all(){
			this.money = this.userData.money
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
						/* if(!this.userData.code || this.userData.code == ""){
							this.$api.navTo('/pages/member/bank/index',1)
						} */
					}
					
				}
			})
		},
	}
}
</script>

<style lang="scss" scoped>
.icon-xiaojiantou{
	font-size: 36rpx;
}
.u-border-right::after{
	border-color:#000;
}
.text-disble{
	color:#b3b3b3;
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
	//background-color:#ea7316;
	border-radius: 10upx;
	//box-shadow: 1px 2px 5px #e60000;		
}
</style>
