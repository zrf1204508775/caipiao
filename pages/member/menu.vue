<template>
	<view>
		<view class="cate-section margin-lr-sl">
			<view class="cate-item" v-for="(item,index) in navs" :key='index' @click="purchase(item)">
				<image :src="item.src"></image>
				<text class="margin-top-sm block">{{item.title}}</text>
			</view>
			
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return{
			/* navs:[] */
		}
	},
	onLoad() {
		
	},
	props:['navs'],
	methods: {
		purchase(item){
			if(item.url){
				uni.navigateTo({
					url:item.url
				})
			}else{
				this.$api.msg('功能开发中...')
			}
		},
		
	},
	
}
</script>

<style lang="scss">
.cate-section{
	// width: 100%;
	height: auto;
	// margin: 0 auto;
	background-color: -white;
	border-radius: 10upx;
	display: flex;
	flex-wrap: wrap;
	padding-top: 20upx;
	.cate-item{
		width: 25%;
		text-align: center;
		margin-bottom: 20upx;
		image{
			width: 100upx;
			height: 100upx;
			margin: 0 auto;
			display: block;
			border-radius: 50%;
		}
	}
}
</style>
