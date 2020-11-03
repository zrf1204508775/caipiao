<template>
	<view>
		<cu-custom bgColor="bg_black text-white" :isBack="true"><block slot="backText"></block><block slot="content">充值</block></cu-custom>
		<view v-if="type!=3">
			<view class="flex bg-yeq-page height100 align-center padding-lr-sm text-lg">
				<view class="height flex align-center">充值金额：</view>
				<input class="flex-sub height flex align-center" v-model="number" type="number" placeholder="请输入充值金额" />
			</view>
			<view class="padding-lr-sm margin-top-sm text-gray">
				<view>温馨提示：</view>
				<view>1：最低充值金额￥50</view>
				<view>2：充值无任何手续费</view>
				<view>3：如遇充值问题请联系客服</view>
			</view>
			<button class="add-btn" @click="submit">确定充值</button>
		</view>
		<view v-else  >
			<!-- <view class="padding-lr-sm height100 flex align-center bg-yeq-page text-bold">
				<text>使用扫码支付请联系客服</text>
			</view> -->
			<!-- <u-gap height="1" bg-color="#f5f5f5"></u-gap>
			<view class="padding-lr-sm height100 flex align-center bg-yeq-page">
				<text>QQ客服：</text>
				<text class="text-lan">695817911</text>
			</view>
			<u-gap height="2" bg-color="#f5f5f5"></u-gap>
			<view class="padding-lr-sm height100 flex align-center bg-yeq-page">
				<text>微信客服：</text>
				<text class="text-lan">dgweg1548</text>
			</view> -->
			<u-gap height="20" bg-color="#f5f5f5"></u-gap>
			<view class="padding-lr-sm height100 flex align-center bg-yeq-page">
				<image src="../../../static/my/QQ.png" class="width50" mode="widthFix"></image>
				<text class="padding-left-xs">QQ客服：695817911</text>
			</view>
			<u-gap height="20" bg-color="#f5f5f5"></u-gap>
			<view class="padding-lr-sm height100 flex align-center bg-yeq-page">
				<image src="../../../static/my/weixin.png" class="width50" mode="widthFix"></image>
				<text class="padding-left-xs">微信客服：dgweg1548</text>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			title:'网银',
			type:1,
			number:''
		}
	},
	onLoad(options) {
		this.title = options.title
		this.type = options.type
	},
	onShow() {
		
	},
	methods:{
		submit(){
			if(this.number<50){
				this.$api.msg('最低充值金额￥50')
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.text-color{
	color: #2b7dd9;
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
}
</style>
