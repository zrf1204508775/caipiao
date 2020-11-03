<template>
	<view>
		<cu-custom bgColor="bg_black text-white" :isBack="true"><block slot="backText"></block><block slot="content">设置支付密码</block></cu-custom>
		<u-gap height="20" bg-color="#f5f5f5"></u-gap>
		<view class="row b-b">
			<text class="tit">输入旧密码</text>
			<input class="input text-black" type="password" v-model="odpw"  placeholder="输入旧密码(默认登录密码)" placeholder-class="placeholder" />
		</view>
		<u-gap height="20" bg-color="#f5f5f5"></u-gap>
		<view class="row b-b">
			<text class="tit">输入新密码</text>
			<input class="input text-black" type="password" v-model="newpw"  placeholder="6位数字" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">再次输入新密码</text>
			<input class="input text-black" type="password" v-model="agnewpw"  placeholder="6位数字" placeholder-class="placeholder" />
		</view>
		
		
		<button class="add-btn bg-lan" @click="submit">确定修改</button>
		
	</view>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default{
	data(){
		return{
			odpw:'',
			newpw:'',
			agnewpw:''
		}
	},
	onLoad() {
		
	},
	onShow() {
		//this.getUser()
	},
	computed:{
		...mapState(['hasLogin','userInfo','token'])
	},
	methods:{
		submit(){
			let that = this
			if(!that.odpw){
				that.$api.msg('请输入旧密码')
				return
			}
			if(!that.newpw){
				that.$api.msg('请输入新密码')
				return
			}
			if(that.agnewpw != that.newpw){
				that.$api.msg('两次密码不一致')
				return
			}
			uni.request({
				url: that.webUrlN+'upinfo.aspx',
				method:'POST',
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Token":that.token.token
				},
				data:{
					type:2,
					pw:that.newpw,
					oldpw:this.odpw,
					p:'pay'
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
	}
}
</script>

<style lang="scss">
.add-btn{
	/* position: fixed;
	left: 30upx;
	right: 30upx;
	bottom: 16upx; */
	z-index: 95;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 40rpx 40rpx;
	height: 80upx;
	font-size: 32upx;
	color: #fff;
	background-color:#fb2828;
	border-radius: 10upx;
	//box-shadow: 1px 2px 5px #fb2828;		
}
.modifyAvatar{
	position: absolute;
	width: 100%;
	left: 0;
	bottom: 0;
	background: rgba(0,0,0,0.6);
	color: white;
	text-align: center;
	font-size: 24upx;
	height: 40%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.row{
	display: flex;
	align-items: center;
	position: relative;
	padding:0 30upx;
	min-height: 100upx;
	background: #fff;
	.tit{
		flex-shrink: 0;
		min-width: 220upx;
		font-size: 30upx;
		color: $font-color-dark;
		margin-right: 10upx;
	}
	.input{
		flex: 1;
		font-size: 30upx;
	}
	.icon-shouhuodizhi{
		font-size: 36upx;
		color: $font-color-light;
	}
}
.list-cell{
	display:flex;
	align-items:baseline;
	padding: 20upx $page-row-spacing;
	line-height:60upx;
	position:relative;
	background: #fff;
	justify-content: center;
	&.log-out-btn{
		margin-top: 40upx;
		background-color: #81b334;
		.cell-tit{
			color: white;
			text-align: center;
			margin-right: 0;
		}
	}
	&.cell-hover{
		background:#fafafa;
	}
	&.b-b:after{
		left: 30upx;
	}
	&.m-t{
		margin-top: 16upx; 
	}
	.cell-more{
		align-self: baseline;
		font-size:$font-lg;
		color:$font-color-light;
		margin-left:10upx;
	}
	.cell-tit{
		min-width: 180upx;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		margin-right:10upx;
	}
	.cell-tip{
		font-size: $font-base;
		color: $font-color-light;
	}
	switch{
		transform: translateX(16upx) scale(.84);
	}
}
</style>
