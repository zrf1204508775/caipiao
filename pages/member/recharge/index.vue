<template>
	<view>
		<cu-custom bgColor="bg_black text-white" :isBack="true"><block slot="backText"></block><block slot="content">充值</block></cu-custom>
		
		<!-- <view class="padding-lr-sm height100 flex align-center bg-yeq-page justify-between">
			<view class="flex align-center flex-sub" @click="$api.navTo('/pages/member/recharge/wy?type=1&title=网银',1)">
				<image class="width60 height60" src="../../../static/my/pay_icon_01.png"></image>
				<view class="margin-left-sm">网银</view>
			</view>
			<text class="iconfont icon-xiaojiantou"></text>
		</view> -->
		<u-line color="#e9e9e9" />
		<view class="padding-lr-sm height100 flex align-center bg-yeq-page justify-between" @click="$api.navTo('/pages/member/tkefu/index',1)">
			<view class="flex align-center flex-sub">
				<image class="width60 height60" src="../../../static/my/kefu.png"></image>
				<view class="margin-left-sm">联系客服</view>
			</view>
			<text class="iconfont icon-xiaojiantou"></text>
		</view>
		<!-- <u-line color="#e9e9e9" />
		<view class="padding-lr-sm height100 flex align-center bg-yeq-page justify-between" @click="$api.navTo('/pages/member/recharge/wy?type=2&title=支付宝',1)">
			<view class="flex align-center flex-sub">
				<image class="width60 height60" src="../../../static/my/pay_icon_05.png"></image>
				<view class="margin-left-sm">支付宝</view>
			</view>
			<text class="iconfont icon-xiaojiantou"></text>
		</view> -->
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
.icon-xiaojiantou{
	font-size: 36rpx;
}
</style>
