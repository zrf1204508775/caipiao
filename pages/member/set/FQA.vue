<template>
	<view>
		<cu-custom bgColor="bg_black text-white" :isBack="true"><block slot="backText"></block><block slot="content">常见问题</block></cu-custom>
		<view class="padding-sm box">
			<view class="text-red">1.如何领奖?</view>
			<view>单注100万元以下奖金直接打到您的注册账户，可以随时消费和提现；奖金只允许注册账号领取，不可以其他形式代领。如果您中了大奖，系统会自动将奖金转入注册账号。</view>
			<view class="text-red">2.如何充值?</view>
			<view>登录后在主页面右下角点击“我的”进入界面，点击页面中间的“充值“，进入充值界面，选择充值方式：网上银行、支付宝充值、微信充值等，输入充值金额即可。</view>
			<view class="text-red">3、如何提现?</view>
			<view>登录后在主页面右下角点击“我的”进入界面，点击页面中间的“提现”，进入“提现界面“，按照提示操作即可完成提现，实时到账。</view>
			<view class="text-red">4.如何购彩？</view>
			<view>登录后在“购彩”选择您想购买的彩种和投注号码，确认支付。购买成功后，您的投注将自动生成订单，可以在主页面右下方“我的”中查看您的购彩记录，如您中奖，奖金将自动派发到您的账户中。</view>
			<view class="text-red">5.如何跟别人合资买彩票？</view>
			<view>合买是由多人共同出资购买彩票，按照出资比例分享奖金的投注方式。您可以在“合买”中挑选发起人战绩优秀、号码靠谱的方案进行跟单。方案中奖后按认购方案的比例分享奖金。
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
		}
	},
	onLoad(options) {
		
	},
	onShow() {
		
	},
	methods:{
		
	}
}
</script>

<style lang="scss">
.box{
	line-height: 46rpx;
}
</style>
