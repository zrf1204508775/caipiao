<template>
	<view>
		<cu-custom bgColor="bg_black text-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">客服</block>
		</cu-custom>
		<u-gap height="20" bg-color="#f5f5f5"></u-gap>
		<view class="padding-lr-sm height100 flex align-center bg-yeq-page" v-if="kedata.data">
			<image src="../../../static/my/QQ.png" class="width50" mode="widthFix"></image>
			<text class="padding-left-xs">QQ客服：{{kedata.data[0].value}}</text>
		</view>
		<u-gap height="20" bg-color="#f5f5f5"></u-gap>
		<view class="padding-lr-sm height100 flex align-center bg-yeq-page" v-if="kedata.data">
			<image src="../../../static/my/weixin.png" class="width50" mode="widthFix"></image>
			<text class="padding-left-xs">微信客服：{{kedata.data[2].value}}</text>
		</view>
	</view>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default{
	data(){
		return{
			kedata:{}
		}
	},
	computed:{
		...mapState(['token'])
	},
	onLoad(options) {
		
	},
	onShow() {
		this.getkefu()
	},
	methods:{
		getkefu(){
			uni.request({
				url: this.webUrlN+'/getkefu.aspx',
				method:'POST',
				data:{},
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Token":this.token.token
				},
				success: (res) => {
					
					if(Number(res.data.status) == 1){
						this.kedata = res.data
						console.log('res.data',this.kedata)
					}
					
				}
			})
		}
	}
}
</script>

<style lang="scss">
	
</style>
