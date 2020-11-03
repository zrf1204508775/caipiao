<template>
	<view>
		<view class="bg-yeq-page">
			<view class="cu-bar">
				<view class="action">
					<text class="cuIcon-titles" style="color: #9c1de6;"></text>
					<text class="text-black">{{title}}</text>
				</view>
			</view>
			<view class="gridbox">
				<u-grid :col="2" :border="false" :custom-style="cusStyle">
					<u-grid-item v-for="(item,index) in gridList" class="grid-item" :class="(index==(gridList.length-2))&& (index%2 ==0)?'gridbor':''" @click="purchase(item)">
						<view class="flex justify-between width-100 align-center">
							<view class="margin-left-sm">
								<view class="text_black text-df">{{item.title}}</view>
								<view class="text-df text-gray text-cut1">{{item.info}}</view>
							</view>
							<view class="margin-right-sm">
								<image class="width100 height100" :src="item.img?webUrlN+item.img:item.imgurl" mode="aspectFit"></image>
							</view>
						</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			weburl:this.webUrlN,
			cusStyle:{},
		}
	},
	props:{
		gridList:{
			type:Array,
			default:null
		},
		title:{
			type:String,
			default:''
		}
	},
	methods:{
		purchase(item){
			if(item.type == 'szc'){
				this.$api.msg('彩种开发中，敬请期待，感谢大家的信任与支持！')
				return
			}else{
				uni.navigateTo({
					url:'/pages/home/wager/index?title='+item.title+'&id='+item.name
				})
			}
		},
	}
}
</script>

<style lang="scss">
.gridbox{
	border-top: 1rpx solid #e8e8e8;
	border-bottom: 1rpx solid #e8e8e8;
	.grid-item{
		border-bottom: 1rpx solid #e8e8e8;
		border-right: 1rpx solid #e8e8e8;
	}
	.grid-item:nth-child(2n){
		border-right: none;
	}
	.grid-item:last-child{
		border-bottom: none;
	}
	.gridbor{
		border-bottom: none;
	}
}
.text_black{
	color: #000;
}
</style>
