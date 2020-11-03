<template>
	<view class="flex align-center bg-yeq-page" style="height: 100vh;">
		<cu-custom bgColor="bg_black text-white" :isBack="false"><block slot="backText"></block><block slot="content">登录</block></cu-custom>
		
		<view class="margin-lr-lg flex-sub padding-tb-lg bg-white radius box-shadow">
			<!-- <view class="height60">
				<image src="../../../static/logo.png" class="width200 height60 block margin-auto" mode="widthFix"></image>
			</view> -->
			
			<view class="height80 margin-lr-sm margin-top-sm solid_1 radius flex align-center justify-between">
				<input class="height80 padding-lr-xs flex-sub" type="text" v-model="userName" placeholder="请输入手机号/账号" />
			</view>
			<view class="height80 margin-lr-sm margin-top-sm solid_1 radius flex align-center justify-between">
				<input class="height80 padding-lr-xs flex-sub" type="password" v-model="password" placeholder="请输入密码" />
			</view>
			
			<button class="add-btn height80 bg-red margin-top-lg margin-lr-sm flex align-center justify-center text-lg" @click="Login">登录</button>
			
			<view class="flex justify-between margin-lr-sm margin-top-lg">
				<navigator url="/pages/member/public/register">注册</navigator>
				<navigator url="/pages/member/public/forgot">忘记密码?</navigator>
			</view>
			<view class="flex text-sm margin-lr-sm margin-top-lg">
				<navigator url="/pages/home/policy/agreement">
					<text>登录表示同意</text>
					<text class="text-blue">《隐私政策》</text>
				</navigator>
				<navigator url="/pages/home/policy/service_agreement">
					<text class="text-blue">《用户协议》</text>
				</navigator>
			</view>
		</view>
	</view>
</template>
<script>
import {mapMutations} from 'vuex';
export default {
	data() {
		return {
			userName:'',
			password:''
		}
	},
	onLoad(options) {
		
	},
	methods: {
		Login(){
			//var timestamp =new Date().getTime()//13位
			//var timestamp = Date.parse(new Date());//精确到秒
			let that = this
			if(!that.userName){
				that.$api.msg('请输入账号')
				return
			}
			if(!that.password){
				that.$api.msg('请输入密码')
				return
			}
			uni.showLoading({
				title: '登录中...'
			})
			uni.request({
				url: that.webUrlN+'/api.aspx',
				method:'POST',
				data:{
					user: that.userName,
					pw:that.password,
					//timestamp:timestamp
				},
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Token":''
				},
				success: (res) => {
					uni.hideLoading()
					console.log(res.data)
					if(Number(res.data.status) == 1){
						let dataInfo = {
							token: res.data.token
						}
						console.log('dataInfo',dataInfo)
						that.login(dataInfo);
						
						uni.switchTab({
							url:'/pages/home/index'
						})
					}else{
						that.$api.msg(res.data.info)
					}
					
				}
			})
		},
		...mapMutations(['login','logout']),
	},
}
</script>

<style>
/*按钮点击效果*/
.add-btn.button-hover{
	transform: translate(1upx, 1upx);
}
.checking{
	border-radius: 0 6upx 6upx 0;
	width: 160upx;
}
</style>

