<template>
	<view class="content">
		<view class="mix-list-cell" :class="border?'u-border-bottom':''" @click="eventClick" hover-class="cell-hover"  :hover-stay-time="50">
			<text v-if="icon" class="iconfont cell-icon" :style="[{color: iconColor,}]" :class="icon"></text>
			<text class="cell-tit clamp">{{title}}</text>
			<text v-if="tips" class="cell-tip text-cut" style="max-width: 50%;">{{tips}}</text>
			<text class="cell-more iconfont" :class="'icon-xiaojiantou'"></text>
		</view>

	</view>
</template>
 
<script>
	/**
	 *  简单封装了下， 应用范围比较狭窄，可以在此基础上进行扩展使用
	 *  比如加入image， iconSize可控等
	 */
	export default {
		data() {
			return {
				
			}
		},
		props: {
			icon: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: '标题'
			},
			tips: {
				type: String,
				default: ''
			},
			navigateType: {
				type: String,
				default: 'right'
			},
			border: {
				type: Boolean,
				default: true
			},
			hoverClass: {
				type: String,
				default: 'cell-hover'
			},
			iconColor: {
				type: String,
				default: '#414141'
			}
		},
		methods: {
			eventClick(){
				this.$emit('eventClick');
			}
		},
	}
</script>

<style lang='scss'>

	.icon .mix-list-cell.b-b:after{
		/* left: 90upx; */
	}
	.mix-list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx 0;
		margin: 0 30upx;
		line-height:60upx;
		position:relative;
		
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}

		.cell-icon{
			align-self:center;
			width:56upx;
			max-height:60upx;
			font-size:38upx;
		}
		.cell-more{
			align-self: center;
			font-size:30upx;
			color:$font-color-base;
			margin-left:$uni-spacing-row-sm;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base;
			color: #222;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-sm+2upx;
			color: $font-color-light;
		}
	}
</style>
