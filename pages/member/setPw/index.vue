<template>
	<view>
		<cu-custom bgColor="bg_black text-white" :isBack="true"><block slot="backText"></block><block slot="content">密码设置</block></cu-custom>
		
		<view class="icon bg-white margin-top-sm">
			<list-cell title="设置支付密码" @eventClick="navTo('/pages/member/setPw/playPW',1)"></list-cell>
			<list-cell title="重置登录密码" @eventClick="navTo('/pages/member/setPw/modify_password',1)"></list-cell>
		</view>
		
	</view>
</template>

<script>
import listCell from '@/components/list-cell.vue'
export default{
	components:{listCell},
	data(){
		return{
			
		}
	},
	onLoad(options) {
		
	},
	onShow() {
		
	},
	methods:{
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
	background-color: #ff9900;
	color: white;
	font-size: 24rpx;
}
</style>
