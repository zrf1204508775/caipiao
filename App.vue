<script>
	import Vue from 'vue'
	import {mapState,mapMutations} from 'vuex';
	export default {
		computed:{
			...mapState(['token'])
		},
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif       
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			
			let that = this
			uni.getStorage({//获得保存在本地token //更新登陆状态
				key: 'token',  
				success:(res) => {  
					console.log('App.vue 获取缓存成功  -------------------------',res)
					let dataInfo = {
						token: res.data.token
					}
					console.log('token',dataInfo)
					uni.request({
						url: that.webUrlN+'/getlogin.aspx',
						method:'POST',
						header: {
							"Content-Type": "application/x-www-form-urlencoded",
							//"Token":that.token.token
						},
						data:{
							Token:dataInfo.token
						},
						success: (res) => {
							console.log('Token------------',dataInfo.token)
							console.log('res',res)
							if(Number(res.data.status) == 0){
								that.logout()
							}
						},
						fail: (error) => {
							//this.$api.msg(error.data.info)
						}
					})
					
					
					that.login(dataInfo)
					
				}, fail:(res)=>{
					//获取本地缓存失败
					that.logout();
					console.log('获取token本地缓存失败')
				}
			})
			
			
		},
		
		methods: {
			...mapMutations(['login','logout'])
		},
		onShow: function() {
			console.log('App Show')
			/* uni.showModal({
				content:'有新的资源更新是否立即更新!',
				confirmText:'更新',
				success:function(res){
					if (res.confirm) {
						uni.showLoading({
							title: '更新中……'
						})
						uni.downloadFile({
							url:'baicu.com',
							success: downloadResult => { //下载成功
								uni.showModal({
									title: '',
									content: '更新成功，确定现在重启吗？',
									confirmText: '重启',
									confirmColor: '#EE8F57',
									success: function(res) {
										if (res.confirm) {
											plus.runtime.install( //安装
												downloadResult.tempFilePath, {
													force: true
												},
												function() {
													// uni.showToast('更新成功，重启中');
													uni.showToast({
														title: '更新成功，重启中',
														duration: 2000
													});
													plus.runtime.restart();
												},
												function(e) {
													uni.showToast({
														title: '更新失败',
														duration: 2000
													});
												}
											);
										}
									}
								});
							},
							complete: () => {
								uni.hideLoading();
							},
							fail: () => {
								console.log("更新失败");
								uni.hideLoading();
							}
						})
					}
				}
			}) */
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "static/iconfont/iconfont.css";
	@import "uview-ui/index.scss";
	.box-shadow{
		box-shadow: 0 0 5px #888888;
	}
	.u-more::before{
		border-bottom: 0px solid #d4d4d4 !important;
	}
	.bg_black{
		background-color: #30373f;
	}
	.radius_top_left{
		border-top-left-radius: 16rpx;
	}
	.radius_top_right{
		border-top-right-radius: 16rpx;
	}
	/*边框*/
	.b-b:after,
	.b-t:after {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		transform: scaleY(.5);
		border-bottom: 1px solid #E4E7ED;
	}
	.b-b:after {
		bottom: 0;
	}
	
	.b-t:after {
		top: 0;
	}
	.xtht{
		height: var(--status-bar-height);
	}
	
	.scrollbox{
		.uni-scroll-view, .uni-scroll-view-content{
			height: auto !important;
		}
	}
	.text-hong{
		color: #fb60a7;
	}
	.text-zi{
		color: #9c1de6;
	}
	.text-lan{
		color: #2b7dd9;
	}
	.bg-hong{
		background: #fb60a7 !important;
	}
	.bg-zi{
		background: #9c1de6 !important;
	}
	.bg-lan{
		background: #2b7dd9 !important;
	}
	.bg_hei{
		background-color: #30373f !important;
	}
	.prize {
		.u-grid-item-box{
			padding: 10px 0 !important;
		}
		
	}
	/* 合买份数 */
	.parter{
		.u-icon-plus,.u-icon-minus{
			height: 60rpx !important;
		}
		.u-number-input{
			width: 140rpx !important;
			height: 60rpx !important;
		}
	}
</style>
