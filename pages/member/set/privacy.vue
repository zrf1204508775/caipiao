<template>
	<view class="bg-white height">
		<cu-custom bgColor="bg_black text-white" :isBack="true"><block slot="backText"></block><block slot="content">关于我们</block></cu-custom>
		
		<view class="headImg">
			<image class="logo" src="../../../static/logo.png" mode="aspectFit"></image>
			<view class="margin-lr-lg padding-top-lg">
				关于我们
			</view>
			<view class="margin-lr-lg content-p text-black">
				<view></view>				
				<view class="padding-lg text-center text-gray text-sm">
					<view>Copyright©2004-2020</view>
					<view>长盈 版权所有</view>
				</view>
			</view>
		</view>
		
	</view>
</template>
<script>
import {  mapState,  mapMutations  } from 'vuex';  
export default {
	data() {
		return {
			logo:''
		};
	},
	computed:{
		...mapState(['userInfo']),
	},
	onLoad() {
		
	},
	onShow() {
		
	},
	methods:{
		navTo(url){
			uni.navigateTo({
				url:url
			})
		},
		
	}
}
</script>

<style lang="scss">
page{
	height: 100%;
}
.headImg{
	.logo{
		width: 600upx;
		height: 200upx;
		margin: 20rpx auto;
		display: block;
		padding: 20rpx 100upx;
		border-bottom: 1px solid #CCCCCC;
	}
}	
.privacy{
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 80upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.content-p{
	line-height: 50upx;
}
</style>
