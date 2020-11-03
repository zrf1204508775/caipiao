<template>
	<view class="container">
		<cu-custom bgColor="bg_black text-white" :isBack="true"><block slot="backText"></block><block slot="content">签到</block></cu-custom>
		
		<view class="point-signin-header bg_point">
			<view class="flex justify-between text-white align-center">
				<view>当前连续签到：<text class="text-yellow text-bold text-lg">{{continuous}}</text>天</view>
				<view>当前积分：<text class="text-bold text-lg text-yellow">{{integral}}</text></view>
			</view>
			<view class="btn-wrapper" :class="{active:!if_signin}">
				<view class="btn flex justify-center align-center">
					<view class='signin_box flex align-center justify-center text-zi text-bold' v-if="if_signin">
						已签到
					</view>
					<view class='signin_box flex align-center justify-center text-zi text-bold' v-else @click="setsign">签到</view>
				</view>
			</view>
			<view class="notice text-sm">每天签到赠送1个积分，连续7天签到赠送3个积分，连续15天签到赠送8个积分，连续30天签到赠送28个积分，
			一个积分相当于1元，直接到账，签到满30天次日从新计算，中途间缺未签从新计算。</view>
			
		</view>
		
		<view class="calendar-wrapper padding-bottom-sm" v-if="day_list">
			<view class="calendar-month flex justify-center">
				<i class="iconfont icon-qiehuanqizuo" @click="goSearch(0)"></i>
					<span class='todata'>{{toDatas}}</span>
				<i class="iconfont icon-qiehuanqiyou" @click="goSearch(1)"></i>
			</view>
			
			<view class="calendar-title">
				<view class="item"><span>日</span></view>
				<view class="item"><span>一</span></view>
				<view class="item"><span>二</span></view>
				<view class="item"><span>三</span></view>
				<view class="item"><span>四</span></view>
				<view class="item"><span>五</span></view>
				<view class="item"><span>六</span></view>
			</view>
			
			<view class="calendar-content">
				<view v-if="day_list[0].week>0 && day_list[0].week <7">
					<view class="item" v-for="(n,nindex) in day_list[0].week" :key="nindex"></view>
				</view>
				
				<view class="item" v-for="(item,index) in day_list"  :class="{active:item.state,'pre-active':(item.day==newData) && !item.state}">
					<span>{{item.num}}</span>
				</view>
			</view>
		</view>
		<view class="point-signin-header bg_point text-sm">
			<view class="notice">所有用户充值累计满1000元起即可参与活动</view>
			<view class="notice">如发现任何团体或个人，以多开用户名的方式套取福利或彩金的，平台保留取消该团体或个人账户的权利。 </view>
		</view>
		
	</view>
</template>

<script>
import moment from '../../common/moment.min.js'
import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				search_day: '',
				newData:moment.unix(Date.parse(new Date()) / 1000).format('YYYY-MM-DD'),
				if_signin: false,
				day_list: false,
				continuous:false,
				integral:0,
				toDatas:''
			}
		},
		computed:{
			...mapState(['hasLogin','userInfo','token'])
		},
		onLoad() {
			
			console.log('当前时间',this.newData)
			var today = new Date();//new 出当前时间
			var h = today.getFullYear();//获取年
			var m = this.toTen(today.getMonth() + 1);//获取月
			var d = this.toTen(today.getDate());//获取日
			var H = this.toTen(today.getHours());//获取时
			var M = this.toTen(today.getMinutes());//获取分
			var S = this.toTen(today.getSeconds());//获取秒
			
			//return h + "-" + m + "-" + d + " " + H; //返回 年-月-日 时:分:秒
			//console.log(h + "-" + m + "-" + d+" "+H+':'+M+':'+S)
			
			this.toDatas = h+"年"+m+"月"
			this.search_day = h+'-'+m+'-'+d
			
			this.getsign(h + "-" + m)
			this.monthDay(h,m);
			
		},
		
		methods: {
			formatNum(num) {
			    let res = Number(num);
			    return res < 10 ? '0' + res : res;
			},
			// 获取当前月份数据
			monthDay(y, month) {
			    let dates = [];
			    let m = Number(month);
			    let firstDayOfMonth = new Date(y, m - 1, 1).getDay(); // 当月第一天星期几
			    let lastDateOfMonth = new Date(y, m, 0).getDate(); // 当月最后一天
			   
				//console.log(firstDayOfMonth)
				let week = 7
			    for (let j = 1; j <= lastDateOfMonth; j++) {
					week = new Date(y, m - 1,this.formatNum(j)).getDay()//周几
					if(week == 0){
						week = 7
					}
			        dates.push({
			            num: this.formatNum(j),
			            week: week,//(j % 7) + firstDayOfMonth - 1 || 7
			            //month: this.formatNum(m),
			            //year: y,
						day:y+'-'+this.formatNum(m)+'-'+this.formatNum(j),
			            //isCurM: true //是否当前月份
						state:0
			        });
			    }
				this.day_list = dates
			    //console.log('this.day_list',this.day_list)
			},
			
			toTen(num){//小于10前面加0
				if(num<10){
					return "0"+num
				}else{
					return num
				}
			},
			getsign(month){//获取当前月已经签到日期
				uni.request({
					url:this.webUrlN+'/getsign.aspx',
					method:'POST',
					data:{
						month:month
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"Token":this.token.token
					},
					success: (res) => {
						this.if_signin = res.data.today
						this.continuous = res.data.continuous
						this.integral = res.data.integral
						let data = res.data.data
						for(let j=0; j<data.length; j++){
							for(let i=0; i<this.day_list.length; i++){
								if(this.day_list[i].day == data[j].date){
									this.day_list[i].state = 1
								} 
							}
						}
						console.log(this.day_list)
					},
				})
			},
			
			
			goSearch(type) {
				
				if (type) { // 后一个月
					this.search_day = moment(this.search_day).add(1, 'months').format('YYYY-MM-DD')
				}else { // 前一个月
					this.search_day = moment(this.search_day).subtract(1, 'months').format('YYYY-MM-DD')
				}
				console.log(this.search_day)
				this.toDatas=moment(this.search_day).format('YYYY年MM月')
				
				this.monthDay(moment(this.search_day).format('YYYY'),moment(this.search_day).format('MM'));
				this.getsign(moment(this.search_day).format('YYYY-MM'))
			},
			setsign(){//签到
				uni.request({
					url:this.webUrlN+'/setsign.aspx',
					method:'POST',
					data:{},
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"Token":this.token.token
					},
					success: (res) => {
						this.$api.msg(res.data.info)
						if(Number(res.data.status) == 1){
							this.if_signin = true
							var today = new Date();//new 出当前时间
							var h = today.getFullYear();//获取年
							var m = this.toTen(today.getMonth() + 1);//获取月
							this.getsign(h + "-" + m)
							this.monthDay(h,m);
						}
						
					},
				})
			},
			
		}
	}
</script>

<style scoped lang="scss">
	page{
		height: 100%;
		background-color: #616161;
	}
	.container{
		height: 100%;
		background-color: #616161;
		overflow-y: scroll;
	}
	.bg_point{
		background-color: #616161;
	}
	.point-signin-header {
		padding: .5rem;
		text-align: center;
		padding-bottom: 1rem;
		.btn-wrapper {
			height: 4.5rem;
			width: 4.5rem;
			margin: 1rem auto;
			border-radius: 50%;
			background: #9c1de6 ;
			border: .5rem solid rgba(255, 255, 255, .5);
			overflow: hidden;
			&.active {
				.btn {
					>view {
						background: #9c1de6 ;
						color: rgba(255, 255, 255, .8);
						line-height: 3.4rem;
					}
				}
			}

			.btn {
				background: #fff;
				width: 100%;
				height: 100%;
				padding: .3rem;
				box-sizing: border-box;
				border-radius: 50%;
				.signin_box{
					border-radius: 50%;
					width: 100%;
					height: 100%;
					margin: 0 auto;
					border: 1px solid #9c1de6 ;
					box-sizing: border-box;

					.title {
						font-size: .8rem;
						color: #9c1de6 ;
						margin-top: .7rem;
					}

					.content {
						
						color: #9c1de6 
					}
				}
			}
		}

		.notice {
			
			color: #fff;
			opacity: .8
		}
	}

	.calendar-wrapper {
		background: #fff;

		.calendar-month {
			text-align: center;
			font-size: 32rpx;
			line-height: 2.5rem;
			border-bottom: 1px solid #eee;
			margin-bottom: .5rem;

			.todata {
				margin: 0 1rem;
			}

			i {
				font-size: 32rpx;
			}
		}

		.item {
			float: left;
			width: 14.28%;
			height: 90upx;
			text-align: center;
			font-size: 44rpx;
			display: flex;
			align-items: center;
			>span {
				height: 2rem;
				width: 2rem;
				line-height: 2rem;
				border-radius: 50%;
				display: block;
				margin: 0 auto;
			}

			&.pre-active {
				>span {
					border: 1px solid #9c1de6 
				}
			}

			&.active {
				>span {
					background: #9c1de6 ;
					color: #fff
				}
			}
		}

		.calendar-content,
		.calendar-title {
			overflow: hidden;
			padding: 0 .5rem;
		}

	}
</style>
