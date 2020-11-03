<template>
	<view>
		<cu-custom bgColor="bg_black text-white" :isBack="true"><block slot="backText"></block><block slot="content">银行资料</block></cu-custom>
		
		<view class="row b-b">
			<text class="tit">开户姓名</text>
			<input class="input text-black" type="text" v-model="userData.name"  placeholder="请输入开户姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">银行卡号</text>
			<input class="input text-black" type="number" v-model="userData.code"  placeholder="请输入银行卡号" placeholder-class="placeholder" />
		</view>
		
		
		<view class="row b-b">
			<text class="tit">银行名称</text>
			<input class="input text-black"  type="text" :disabled="disabled" v-model="userData.bankname"  :placeholder="disabled?'请选择银行':'请输入银行名称'" placeholder-class="placeholder" />
			<text class="bg-blue text-sm padding-lr-sm radius padding-tb-xs" @click="show = true">选择银行</text>
		</view>
		<view class="row b-b">
			<text class="tit">开户支行</text>
			<input class="input text-black" type="text" v-model="userData.address"  placeholder="请输入开户支行" placeholder-class="placeholder" />
		</view>
		
		<button class="add-btn bg-lan" @click="submit">保存</button>
		
		<u-picker mode="selector" v-model="show"  :default-selector="[defaultSelector]" :range="selector" range-key="bankname" @confirm="confirm"></u-picker>
		
	</view>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default{
	data(){
		return{
			userData:{
				bankcode:'',
				bankname:'',
				address:'',
				name:'',
				code:''
			},
			show: false,
			defaultSelector:0,//默认第一
			selector: [],
			disabled:true
		}
	},
	onLoad() {
		
	},
	onShow() {
		this.getbankr()
		this.getuser()
	},
	computed:{
		...mapState(['hasLogin','userInfo','token'])
	},
	methods:{
		...mapMutations(['login','logout','setuser']),
		submit(){
			if(this.userData.name == ''){
				this.$api.msg('请输入开户姓名')
				return
			}
			if(this.userData.code == ''){
				this.$api.msg('请输入银行卡号')
				return
			}
			if(this.userData.address == ''){
				this.$api.msg('请输入开户支行')
				return
			}
		
			uni.request({
				url: this.webUrlN+'/upinfo.aspx',
				method:'POST',
				data:{
					bankcode:this.userData.bankcode,
					bankname:this.userData.bankname,
					address:this.userData.address,
					name:this.userData.name,
					code:this.userData.code,
					p:'bank'
				},
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Token":this.token.token
				},
				success: (res) => {
					this.$api.msg(res.data.info)
					this.getuser()
				}
			})
		},
		confirm(e){
			this.defaultSelector = e[0]
			this.userData.bankname = this.selector[this.defaultSelector].bankname
			this.userData.bankcode = this.selector[this.defaultSelector].bankcode
			console.log(this.userData.bankcode)
			if(Number(this.userData.bankcode) == 99999){
				this.disabled = false
				this.userData.bankname =''
			}
		},
		getbankr(){
			uni.request({
				url: this.webUrlN+'/bank.aspx',
				method:'GET',
				data:{},
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Token":this.token.token
				},
				success: (res) => {
					console.log(res.data)
					if(Number(res.data.status) == 1){
						this.selector = res.data.data
					}
				}
			})
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
	background-color:#e60000;
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
		min-width: 180upx;
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
