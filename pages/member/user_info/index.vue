<template>
	<view class="bg-white text-black">
		<cu-custom class="bg_black text-white" bgColor="bg-black" :isBack="true"><block slot="backText"></block><block slot="content">基本资料</block></cu-custom>
		
		<view class="cu-form-group margin-top"  @tap="ChooseImage">
			<view class="title">头像</view>
			<view class="flex align-center">
				<view class="cu-avatar radius-50 margin-right-xs">
					<image class="u-avatar-demo" :src="webUrlN+'/'+userData.img" mode="aspectFill"></image>
				</view>
				<text class="iconfont icon-xiaojiantou"></text>
			</view>
		</view>
		
		<view class="cu-form-group margin-top bg-gray">
			<view class="title text-gray">基本信息</view>
		</view>
		
		<view class="cu-form-group u-border-bottom" @click="userShow = false">
			<view class="title">昵称</view>
			<view class="flex align-center">
				<view>
					<input class="text-right" disabled="disabled" v-model="userData.nickname" placeholder="昵称"/>
				</view>
				<text class="iconfont icon-xiaojiantou"></text>
			</view>
		</view>
		<u-modal v-model="userShow" title="修改昵称" :show-cancel-button="true" @confirm="confirmName">
			<view class="margin-lr-lg flex-sub padding-tb-lg bg-white radius">
				<view class="height80 margin-lr-sm margin-top-sm solid_1 radius flex align-center justify-between">
					<input class="height80 padding-lr-sm flex-sub" type="text" v-model="userData.nickname" placeholder="昵称" />
				</view>
			</view>
		</u-modal>
		
		<view class="cu-form-group u-border-bottom" @click="QShow = true">
			<view class="title">QQ</view>
			<view class="flex align-center">
				<view>
					<input class="text-right" disabled="disabled" v-model="userData.qq" placeholder="QQ"/>
				</view>
				<text class="iconfont icon-xiaojiantou"></text>
			</view>
		</view>
		<u-modal v-model="QShow" title="修改QQ" :show-cancel-button="true" @confirm="confirmName">
			<view class="margin-lr-lg flex-sub padding-tb-lg bg-white radius">
				<view class="height80 margin-lr-sm margin-top-sm solid_1 radius flex align-center justify-between">
					<input class="height80 padding-lr-sm flex-sub" type="text" v-model="userData.qq" placeholder="QQ" />
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default{
	data(){
		return{
			userData:{},
			userShow:false,
			userName:'',
			QShow:false,
		}
	},
	computed:{
		...mapState(['hasLogin','userInfo','token'])
	},
	onLoad(options) {
		
	},
	onShow() {
		this.getuser()
	},
	onReady() {
		
	},
	created() {
		
	},
	methods:{
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
					if(Number(res.data.status) == 1){
						this.userData = res.data
						let dataInfo = res.data
						console.log('dataInfo',dataInfo)
						this.setuser(dataInfo);
					}
					
				}
			})
		},
		confirmName(){//修改昵称/QQ
			let that = this
			console.log(typeof(that.model.addressId.toString()))
			uni.request({
				url: that.webUrlN+'/upinfo.aspx',
				method:'POST',
				data:{
					nickname:that.userData.nickname,
					qq:that.userData.qq,
					p:'user',
				},
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Token":this.token.token
				},
				success: (res) => {
					if(res.data.status == 1){
						that.$api.msg(res.data.info)
						this.getuser()
					}
				}
			})
		},
		ChooseImage() {
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: (res) => {
					this.userData.avatar = res.tempFilePaths[0]
					console.log(res.tempFilePaths)
					const tempFilePaths = res.tempFilePaths;
							
					 const uploadTask = uni.uploadFile({
						url: this.webUrlN+ '/upload.aspx',
						header: {
							"Token":this.token.token
						},
						filePath: tempFilePaths[0],
						name: 'File1',
						formData: {
							//"Token":this.token.token,
							//"p":"img"
							"runat":"server"
						},
						success: (uploadFileRes) => {
							console.log(uploadFileRes)
							this.getuser()
						}
					});
				}
			});
		},
		...mapMutations(['login','logout','setuser']),
	}
}
</script>

<style lang="scss" scoped>
uni-page-body{
	height: 100%;
	background-color: white;
}
.text-right{
	text-align: right !important;
}
.u-form-item::after{
	border-bottom-width: 0px;
}
.cu-form-group-birthday{
	border-bottom: none;
}
.cu-form-group{
	justify-content: space-between;
	border: none;
}
.cu-avatar{
	width: 70rpx;
	height: 70rpx;
}
.u-avatar-demo {
	width: 70rpx;
	height: 70rpx;
	border-radius: 50%;
}
.iconfont{
	font-size: 40upx;
}
</style>
