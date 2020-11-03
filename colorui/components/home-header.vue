<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">

			<view class="cu-bar bg-red search fixed justify-start flex" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">

				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				
				<view class="flex align-center logo_box padding-left-sm" v-if="logo">
					<image class="logo" :src="logo" style="width: 200upx; height: 48upx;"></image>
				</view>

				<view class="search-form radius" @click="search">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索站内资讯"
					 confirm-type="search" @confirm="confirm" v-model="title"></input>
				</view>
				<!-- <view class="action" v-if="XCX">
					<i class="iconfont text-xl icon-gouwuche relative" @click="cart">
						<view class="cu-tag badge" v-if="cartNum > 0">{{cartNum}}</view>
					</i>
				</view> -->
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				XCX:true,
				title:''
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
			logo: {
				type: [Boolean, String],
				default: false
			},
			/* cartNum: {
				type:Number,
				default:''
			} */
		},
		mounted() {
			// #ifdef MP-WEIXIN
			console.log('只在微信小程序生效---------------------')
			/* uni.navigateTo({
				url:'/pages/public/wxLogin'
			}) */
			this.XCX = false
			
			//#endif
		},
		
		methods: {
			
			confirm(){
				uni.navigateTo({
					url:'/pages/index/search/index?title='+this.title
				})
			},
			cart(){
				uni.navigateTo({
					url:'/pages/member/cart'
				})
			},
			search(){
				/* uni.navigateTo({
					url:'/pages/home/search/index'
				}) */
			},
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		}
	}
</script>

<style lang="scss" >
	.action {
		.iconfont {
			font-size: 50upx;
			width: 60upx;
			text-align: center;
		}
	}
</style>
