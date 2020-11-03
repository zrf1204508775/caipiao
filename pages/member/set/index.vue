<template>
	<view>
		<cu-custom bgColor="bg_black text-white" :isBack="true"><block slot="backText"></block><block slot="content">设置</block></cu-custom>
		
		<view class="icon bg-white margin-top-sm">
			<list-cell title="常见问题" @eventClick="navTo('/pages/member/set/FQA',1)"></list-cell>
			<list-cell title="关于我们" @eventClick="navTo('/pages/member/set/privacy',1)"></list-cell>
		</view>
		
		<button class="add-btn bg-lan" @click="toLogout">退出登录</button>
		<u-modal
			v-model="addNewShow" 
			:content="addNewTip" 
			:show-title='false' 
			:show-cancel-button='true'
			@confirm="confirmAddNew"
			></u-modal>
	</view>
</template>

<script>
import listCell from '@/components/list-cell.vue'
import {mapState,mapMutations} from 'vuex';
export default{
	components:{listCell},
	data(){
		return{
			addNewTip:'确定要退出登录么',
			addNewShow:false,
		}
	},
	computed:{
		...mapState(['hasLogin','userInfo','token'])
	},
	onLoad(options) {
		
	},
	onShow() {
		
	},
	methods:{
		...mapMutations(['login','logout']),
		//退出登录
		toLogout(){
			this.addNewShow = true
		},
		confirmAddNew(){
			this.logout();
			/* uni.reLaunch({
				url:'/pages/member/public/login'
			}) */
		},
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
	//box-shadow: 1px 2px 5px #e60000;		
}
</style>
