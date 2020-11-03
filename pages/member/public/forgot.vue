<template>
	<view class="flex align-center bg-yeq-page" style="height: 100vh;">
		<cu-custom bgColor="bg_black text-white" :isBack="true"><block slot="backText"></block><block slot="content">找回登录密码</block></cu-custom>
		
		<view class="margin-lr-lg flex-sub padding-tb-lg bg-white radius box-shadow">
			<!-- <view class="height80 margin-lr-sm margin-top-sm  radius flex align-center justify-between">
				<text>已绑定手机号:</text>
				<input class="height80 padding-lr-xs flex-sub" type="text" disabled="disabled" v-model="userData.phone" placeholder="手机号" />
			</view> -->
			
			<view class="height80 margin-lr-sm margin-top-sm solid_1 radius flex align-center justify-between">
				<input class="height80 padding-lr-xs flex-sub" type="text" v-model="phone" placeholder="手机号" />
			</view>
			<view class="height80 margin-lr-sm margin-top-sm solid_1 radius flex align-center justify-between">
				<input class="height80 padding-lr-xs flex-sub" type="password" v-model="password" placeholder="新密码" />
			</view>
			<view class="height80 margin-lr-sm margin-top-sm solid_1 radius flex align-center justify-between">
				<input class="height80 padding-lr-xs flex-sub" type="password" v-model="agPassword" placeholder="确认密码" />
			</view>
			
			<view class="height80 margin-lr-sm margin-top-sm solid_1 radius flex align-center justify-between">
				<input class="height80 padding-lr-xs" v-model="captcha" placeholder="请输入验证码"/>
				<view class="bg-red height80 flex text-df align-center padding-lr-xs checking" @click="checking" v-if="state===false">获取验证码</view>
				<view class="bg-disabled height80 text-df flex align-center padding-lr-xs checking" v-if="state===true">倒计时{{ currentTime }}s</view>
			</view>
			<button class="add-btn height80 bg-red margin-top-lg margin-lr-sm flex align-center justify-center text-lg" @click="submit">提交</button>
			
			<view class="flex justify-between margin-lr-sm margin-top-lg">				<navigator url="/pages/member/public/login">回到登录</navigator>
			</view>

		</view>
	</view>
</template>
<script>
import {mapState,mapMutations} from 'vuex';
export default {
	data() {
		return {
			phone:'',
			password:'',
			agPassword:'',
			state: false,		//是否开启倒计时
			totalTime: 60,		//总时间，单位秒
			recordingTime: 0, 	//记录时间变量
			currentTime: 0, 	//显示时间变量
			captcha:'',
			userData:{
				phone:''
			}
		}
	},
	computed:{
		...mapState(['hasLogin','userInfo','token'])
	},
	onLoad(options) {
		
		//this.getuser()
	},
	methods: {
		...mapMutations(['login','logout','setuser']),
		submit(){
			let that = this
			if(!that.phone){
				that.$api.msg('请输入手机号')
				return
			}
			if(!that.password){
				that.$api.msg('请输入新密码')
				return
			}
			if(that.password != that.agPassword){
				that.$api.msg('两次密码不一致')
				return
			}
			uni.request({
				url: that.webUrlN+'/getretrieve.aspx',
				method:'POST',
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Token":that.token.token
				},
				data:{
					type:1,
					code:that.captcha,
					pw:that.password,
					p:'pay',
					m: that.phone,
				},
				success: (res) => {
					that.$api.msg(res.data.info);
					if(Number(res.data.status) == 1){
						setTimeout(function(){
							
							uni.navigateBack()
						},1000)
					}
					
				}
			})
		},
		
		getuser(){
			let that = this
			uni.request({
				url: that.webUrlN+'getinfo.aspx',
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
						
						this.phone = this.userData.phone
						var reg = /^(\d{3})\d{4}(\d{4})$/;
						this.userData.phone = this.phone.replace(reg, "$1****$2");
						
						let dataInfo = res.data
						console.log('dataInfo',dataInfo)
						that.setuser(dataInfo);
					}
					
				}
			})
		},
		//获取验证码
		checking() {
			if(!this.phone){
				this.$api.msg('请输入手机号');
				 return
			}
			uni.request({
			    url: this.webUrlN+'/setsms.aspx',
			    method:'POST',
			    data:{
					m: this.phone,
			    },
			    header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
			    success: (res) => {
					console.log(res.data)
					if(Number(res.data.status) == 1){
						//把显示时间设为总时间
						this.currentTime = this.totalTime;
						//开始倒计时
						this.state = true;
						//执行倒计时
						this.checkingTime();
					}else{
						this.$api.msg(res.data.message);
					}
			    }
			});
			
		},
		checkingTime(){	//倒计时
			let that = this;
			//判断是否开启
			if(this.state){
				//判断显示时间是否已到0，判断记录时间是否已到总时间
				if(this.currentTime > 0 && this.recordingTime <= this.totalTime){
					//记录时间增加 1
					this.recordingTime = this.recordingTime + 1;
					//显示时间，用总时间 - 记录时间
					this.currentTime = this.totalTime - this.recordingTime;
					//1秒钟后，再次执行本方法
					setTimeout(() => { 	
						//定时器内，this指向外部，找不到vue的方法，所以，需要用that变量。
						that.checkingTime();
					}, 1000)
				}else{
					//时间已完成，还原相关变量
					this.state = false;		//关闭倒计时
					this.recordingTime = 0;	//记录时间为0
					this.currentTime = this.totalTime;	//显示时间为总时间
				}
			}else{
				//倒计时未开启，初始化默认变量
				this.state = false;
				this.recordingTime = 0;
				this.currentTime = this.totalTime;
			}
		},
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
	/* width: 160upx; */
}
</style>

<strong></strong>