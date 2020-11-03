<template>
	<view class="wager">
		<!-- <cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{title}}</block>
		</cu-custom> -->
		<cu-custom bgColor="bg_black text-white" :isBack="true"><block slot="backText"></block><block slot="content">{{title}}</block>
			<block slot="right">
				<view class="action flx align-center" @click="history(lotteryTypeId)">
					<text class="text-sm">近期开奖</text>
					<text class="iconfont icon-lishi margin-left-xs"></text>
				</view>
			</block>
		</cu-custom>
		
		<view class="padding-lr-sm bg_black text-white padding-tb-lg">
			<view class="flex align-center justify-between text-color">
				<view>
					<view>第{{period}}期</view>
					<view>投注截至时间</view>
					<view class="margin-top-sm">
						<u-count-down ref="uCountDown" :timestamp="timestamp" bg-color="#000001" color="#fff" separator="colon" separator-color="#676972" @end="Downend"></u-count-down>
					</view>
				</view>
				<view>
					<view>第{{expect}}期 开奖号码</view>
					<view class="flex justify-end margin-top-sm">
						<text class="numberbg" v-for="(item,index) in numList" :key="index">{{item}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="width-100 bg_black" v-if="obj.length>0">
			<view class="bg-yeq-page radius_top_left radius_top_right">
				<view class="cu-bar solid-bottom padding-lr-sm">
					<u-section title="玩法" :sub-title="obj[objIndex].playedName" line-color="#9c1de6" sub-color="#34483d" @click="ruleShow = true"></u-section>
				</view>
			</view>
		</view>
		<view class="padding-sm bg-yeq-page" v-if="obj.length>0">
			<view class="padding-sm text-color bg-gray text-sm radius margin-top-sm">{{obj[objIndex].fullDescribe}}</view>
			
			<view v-for="(rule,ruleIndex) in obj[objIndex].playedRules" :key="ruleIndex">
				<view class="flex margin-top-sm justify-between align-center">
					<text class="bg_ws flex align-center justify-center">{{rule.itemName}}</text>
					<view>
						<text class="bg_xx" v-for="(sele,seleIndex) in rule.selectTools" :key="seleIndex" @click="xuan(sele,rule.numbers)">{{sele.name}}</text>
					</view>
				</view>

				<scroll-view scroll-x class="bg-white nav margin-top-sm" scroll-with-animation >
					<view class="list" v-for="(numb,numbIndex) in rule.numbers" :key="numbIndex" @click="optionList(numb,numbIndex,rule.numbers)">
						<text class="list1" :class="numb.active?'list1_active':''">{{numb.id}}</text>
						<view class="list1_history">{{numb.history?numb.history:'-'}}</view>
					</view>
				</scroll-view>
			</view>
			
		</view>
		
		<view class="margin-top-sm bg-yeq-page padding-tb-sm">
			<view class="flex padding-lr-sm">
				<u-button class=" margin-right-sm" hover-class="none" :custom-style="qkstyle" @click="clerAdd">清空列表</u-button>
				<u-button class="flex-sub" hover-class="none" :custom-style="tjstyle" @click="addLists">添加至投注列表</u-button>
			</view>
			<view class="bg-yeq-page radius_top_left radius_top_right">
				<view class="cu-bar padding-lr-sm">
					<u-section title="投注列表" sub-title="" :arrow="false" line-color="#9c1de6" sub-color="#34483d"></u-section>
				</view>
				<view class="radius bg-gray margin-lr-sm padding-sm text-color" style="min-height: 160rpx">
					<view v-for="(add,addIndex) in adds" :key="addIndex">
						【{{add.name}}】{{add.numberText}}
					</view>
				</view>
			</view>
		</view>
		<view class="margin-top-sm bg-yeq-page padding-tb-sm">
			<view class="flex justify-between height80 align-center u-border-bottom padding-lr-sm">
				<view class="text-bold">倍数:</view>
				<view>
					<u-number-box :disabled="(type==1)?false:true" v-model="multiple" @change="valChange" :min="1" :max="999"></u-number-box>
				</view>
			</view>
			<view class="flex justify-between height80 align-center u-border-bottom padding-lr-sm">
				<view class="text-bold">已选:</view>
				<view>
					<text>{{totalBets}}注</text>，
					<text class="text-red">{{totalBets*2}}元</text>
				</view>
			</view>
			<view class="flex justify-between height80 align-center u-border-bottom padding-lr-sm">
				<view class="text-bold">保密:</view>
				<view>
					<u-switch v-model="catchUp" active-color="#19be6b" @change="changeUp"></u-switch>
				</view>
			</view>
			<view class="flex justify-between height80 align-center padding-lr-sm" @click="bettingShow = true">
				<u-section title="投注方式" :sub-title="subTitle" :show-line="false" sub-color="#34483d"></u-section>
			</view>
		</view>
		
		<view class="margin-top-sm bg-yeq-page padding-tb-sm">
			<view class="text-red text-center" v-if="type==1">总计{{totalBets*2}}元</view>
			<view class="text-red text-center" v-else>总计{{totalBetss}}元</view>
			<button class="add-btn bg-lan" @click="submit">立即投注</button>
		</view>
		
		<!-- 玩法 -->
		<u-popup mode="bottom" :mask-close-able="false" v-model="ruleShow">
			<view class="content bg-white">
				<view class="padding-sm text-black">玩法选择</view>
				<scroll-view scroll-y="true" style="height: 700rpx;" v-if="obj.length>0">
					<view class="flex flex-wrap padding-sm zxbox">
						<view class="zxbox_item flex align-center justify-center" :class="(objActive==index)?'zxbox_item_active':''" v-for="(item,index) in obj" :key="index" @click="ruleClick(item,index)">
							{{item.playedName}}
						</view>
					</view>
				</scroll-view>
				<view class="confrim-btn flex margin-lr-sm padding-tb-sm">
					<u-button class="zxqx margin-right-sm" hover-class="none" :custom-style="qkstyle" @click="ruleQx">取消</u-button>
					<u-button class="zxsub" hover-class="none" @click="ruleConfirm">确定</u-button>
				</view>
			</view>
		</u-popup>
		
		<u-popup mode="bottom" class="bettingShow" v-model="bettingShow">
			<view class="content bg-white">
				<view class="confrim-btn margin-lr-sm padding-tb-sm margin-bottom-sm">
					<u-button class="zxz margin-bottom-sm" hover-class="none" @click="subTitle ='单买',type='1',bettingShow = false">单买</u-button>
					<u-button class="zxz" hover-class="none" @click="buyTogeter">合买</u-button>
				</view>
				<view class="confrim-btn margin-lr-sm padding-tb-sm">
					<u-button class="zxz" hover-class="none" :custom-style="customStyle" @click="bettingShow = false">取消</u-button>
				</view>
			</view>
		</u-popup>
		
		
		<u-popup mode="bottom" class="bettingShow" v-model="hemai">
			<view class="content text-sm bg-white">
				<view class="flex align-center height80 justify-between padding-lr-sm u-border-bottom">
					<view>方案标题</view>
					<view>{{title}} 第{{period}}期</view>
				</view>
				<view class="flex align-center height80 justify-between padding-lr-sm u-border-bottom">
					<view>方案金额</view>
					<view>{{totalBets*2}}元</view>
				</view>
				<view class="flex align-center height60 justify-between padding-lr-sm">
					<view>份数</view>
					<view>{{totalBets*2}}份</view>
				</view>
				<view class="flex align-center height80 justify-between padding-lr-sm u-border-bottom">
					<view>每份金额</view>
					<view>1元</view>
				</view>
				<view class="flex align-center height100 justify-between padding-lr-sm">
					<view>购买份数</view>
					<view class="flex align-center justify-end">
						<text>最低认购5%</text>
						<input class="width200 height80 u-border padding-left-xs" type="number" @input="rengou" v-model="zdrengou"/>
					</view>
				</view>
				<view class="flex align-center height100 justify-between padding-lr-sm u-border-bottom">
					<view>保底份数</view>
					<view class="flex align-center justify-end">
						<input class="width200 height80 u-border padding-left-xs"  :disabled="catchbd" type="number" v-model="baodi"  @input="baodinum"/>
						<!-- <u-number-box v-model="baodi" :disabled="catchbd" :min="1" :max="(totalBets*2) - zdrengou"></u-number-box> -->
					</view>
				</view>
				<view class="flex align-center height80 justify-between padding-lr-sm u-border-bottom">
					<view>全额保底</view>
					<view>
						<u-switch v-model="catchbd" active-color="#19be6b" @change="changebd"></u-switch>
					</view>
				</view>
				<u-gap height="20" bg-color="#f6f7f9"></u-gap>
				
				<view class="confrim-btn flex margin-lr-sm padding-tb-sm">
					<u-button class="zxqx margin-right-sm" hover-class="none" :custom-style="qkstyle" @click="hemai = false">取消</u-button>
					<u-button class="zxsub " hover-class="none" @click="qdhem">确定</u-button>
				</view>
			</view>
		</u-popup>
		
		
		<u-modal v-model="tzxinx" :title="subTitle+addNewTip" :title-style="{color: 'black',padding:'10px 0',fontWeight:'bold'}" 
			@confirm="confirmAddNew"
			:show-cancel-button="true">
			<view class="slot-content text-center padding-bottom-sm padding-lr-sm">
				<view>
					<text>{{title}} 第</text>
					<text class="text-red">{{20201006}}</text>
					<text>期</text>
				</view>
				<view class="padding-sm">
					<text>共{{totalBets}}注，</text>
					<text>合计：{{totalBets*2}}元</text>
					<!-- <view v-if="type==1">总计{{totalBets*2}}元</view>
					<view v-else>总计{{totalBetss}}元</view> -->
				</view>
			</view>
		</u-modal>
		
		<!-- <u-modal v-model="pws" :show-title="true" title="请输入支付密码" :title-style="{color: 'black',padding:'20px 0'}"
			@confirm="confirmPW"
			:show-cancel-button="true"
			ref="uModal"
			:async-close="true"
		>
			<view class="slot-content text-center padding-bottom-sm padding-lr-lg">
				<u-input v-model="pw" placeholder="请输入支付密码" :type="'password'" :border="true"/>
			</view>
		</u-modal>
		 -->
	</view>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import MD5 from '../../../uilt/md5.js'
export default{
	data(){
		return{
			lotteryTypeId:0,
			title:'',
			period:'',
			expect:'',
			ruleShow:false,//玩法选择显示
			bettingShow:false,//投注方式选择
			hemai:false,//合买弹窗选择
			subTitle:'单买',
			type:1,
			tzxinx:false,
			addNewTip:'投注信息',
			zdrengou:0,//最低认购
			baodi:0,//保底
			numList:[8,9,6],//上期开奖号码
			timestamp:0,//投注结束倒计时
			list1_history:[1,2,3,4,5,6,7,8,9,0],
			qkstyle:{
				background:'#586c6d',
				color:'#f3f4f4'
			},
			tjstyle:{
				background:'#02c4cd',
				color:'#f3f4f4'
			},
			customStyle:{
				color:'#0575ff'
			},
			multiple:1,//倍数
			catchUp:false,//保密
			catchbd:false,//全额保底
			ruleList:[
				{groupId:100111,playedFullName:"直选"}
			],
			addList:[],
			objIndex:0,//第几个玩法
			objActive:0,
			obj:[],
			adds:[],//投注列表
			totalBets:0,//总投注数
			bets:0,//未翻倍注数
			nums:[],//当前玩法选中的号码
			objList:[],
			groupList:[],//组合列表
			totalBetss:0,
			moneys:0,
			ben_qi_xia_zhu:true
		}
	},
	computed:{
		...mapState(['hasLogin','userInfo','token'])
	},
	onLoad(options) {
		this.getuser()
		this.title = options.title
		this.lotteryTypeId = options.id
		this.getplayed(this.lotteryTypeId)
		
		let a1 = [1,2]
		let a2 = [1,2,3,4]
		let qianer = []
		a1.forEach(function(item1,index1){
			a2.forEach(function(item2,index2){
				if(item1 != item2){
					qianer.push(item1+','+item2)
				}
				
			})
		})
		console.log('前2',qianer)
		
		let b1 = [1,2]
		let b2 = [1,2,3]
		let b3 = [1,2,3,4,5]
		let qiansan = []
		b1.forEach(function(item1,index1){
			b2.forEach(function(item2,index2){
				b3.forEach(function(item3,index3){
					if(item1 != item2 && item1 != item3 && item2 != item3){
						qiansan.push(item1+','+item2+','+item3)
					}
				})
			})
		})
		console.log('前3',qiansan)
		
	},
	onShow() {
		
	},
	methods:{
		numss(a,b){//任选n个数
			let m = 1;
			let n = 1
			for(let i=1; i<=b; i++){
				m*=(a.length-i+1);
				n*=i;
			}
			return m/n
			//console.log('任选',m/n)
		},
		confirmAddNew(){//提交下注
			if(!this.ben_qi_xia_zhu){
				this.$api.msg('本期已截止下注')
				return false
			}
			if(this.userInfo.money<this.moneys){
				this.$api.msg('余额不足')
				return false
			}
			this.tzxinx = false
			
			if(this.type == 1 ){
				this.moneys = this.totalBets*2
			}else{
				this.moneys = this.totalBetss
			}
			
			let data = {
				type:this.type,//单买0,合买1
				title:this.title,//彩种名字
				lotteryTypeId:this.lotteryTypeId,//彩种
				betPeriod:this.period,//期数
				//playedId:this.obj[this.objIndex].playedId,//玩法
				betlist:JSON.stringify(this.adds),//下注列表
				betMultiple:this.multiple,//倍数
				betNumber:this.totalBets,//总注数
				moneys:this.moneys,//下单总金额
				secrecy:this.catchUp,//是否保密
				betmode:this.subTitle,//投注方式
				baodi:this.baodi,//保底份数
				zdrengou:this.zdrengou,//认购份数
			}
			console.log('下单数据',data)
			uni.request({
				url: this.webUrlN+'/getbet.aspx',
				method:'POST',
				data:data,
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Token":this.token.token
				},
				success: (res) => {
					if(Number(res.data.status) == 1){
						this.clerAdd()
						this.$api.msg('投注购买成功，敬请期待开奖记录。')
					}else{
						this.$api.msg(res.data.info)
					}
				},
				fail: (error) => {
					
				}
			})
			
			
		},
		submit(){//立即下注
			if(this.adds.length>0){
				this.tzxinx = true
			}else{
				this.$api.msg('请先添加购彩方案到投注列表')
			}
		},
		getplayed(lotteryID){
			uni.request({
				url: this.webUrlN+'/getplayed.aspx',
				method:'POST',
				data:{
					lotteryID:lotteryID
				},
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Token":this.token.token
				},
				success: (res) => {
					if(Number(res.data.status) == 1){
						this.objList = res.data.playedinfo
						//this.timestamp = res.data.openTime
						this.period = res.data.period
						this.expect = res.data.expect
						this.numList =  res.data.code.split(',')
						
						var times = Date.parse(new Date())/1000
						this.timestamp = (Date.parse(res.data.openTime)/1000) -30  - times
						
						console.log(this.timestamp)
						
						
						if(this.timestamp<= 0){
							for(let i=0; i<this.numList.length; i++){
								//(你要改变的数组/对象,你要改变的位置,你要改成什么value)
								this.$set(this.numList,i,'-') //这样就能被vue监控到，更新视图    
							}
							this.ben_qi_xia_zhu = false
						}
						
						//var timestamp = Date.parse(new Date());//精确到秒
						
						if(!res.data.playedinfo){
							return false
						}
						console.log('playedinfo',this.objList)
						
						for(let i=0; i<this.objList.length; i++){
							this.objList[i].active = false
							for(let j=0; j<this.objList[i].playedRules.length; j++){
								
								this.objList[i].playedRules[j].numbers = this.objList[i].playedRules[j].numbers.split(',')
								
								//console.log(this.objList[i].playedRules[j].numbers)
								this.objList[i].playedRules[j].numbers= this.objList[i].playedRules[j].numbers.map(o=>({
									id:o,
									active:false,
									history:''
								}))
								/* for(let h=0; h<this.objList[i].playedRules[j].numbers.length; h++){
									this.objList[i].playedRules[j].numbers[h] = {id:Number(this.objList[i].playedRules[j].numbers[h]),active:false,history:''}
									
									//this.objList[i].playedRules[j].numbers[h].active = false
									//this.objList[i].playedRules[j].numbers[h].history = ''
								} */
								
								this.objList[i].playedRules[j].selectTools = this.objList[i].playedRules[j].selectTools.split(',')
								for(let n=0; n<this.objList[i].playedRules[j].selectTools.length; n++){
									this.objList[i].playedRules[j].selectTools[n] = {id:n,nametext:this.objList[i].playedRules[j].selectTools[n]}
									
									if(this.objList[i].playedRules[j].selectTools[n].nametext == 'all'){
										this.objList[i].playedRules[j].selectTools[n].id = 1
										this.objList[i].playedRules[j].selectTools[n].name = '全'
									}
									if(this.objList[i].playedRules[j].selectTools[n].nametext == 'big'){
										this.objList[i].playedRules[j].selectTools[n].id = 2
										this.objList[i].playedRules[j].selectTools[n].name = '大'
									}
									if(this.objList[i].playedRules[j].selectTools[n].nametext == 'small'){
										this.objList[i].playedRules[j].selectTools[n].id = 3
										this.objList[i].playedRules[j].selectTools[n].name = '小'
									}
									if(this.objList[i].playedRules[j].selectTools[n].nametext == 'odd'){
										this.objList[i].playedRules[j].selectTools[n].id = 4
										this.objList[i].playedRules[j].selectTools[n].name = '单'
									}
									if(this.objList[i].playedRules[j].selectTools[n].nametext == 'even'){
										this.objList[i].playedRules[j].selectTools[n].id = 5
										this.objList[i].playedRules[j].selectTools[n].name = '双'
									}
									if(this.objList[i].playedRules[j].selectTools[n].nametext == 'clear'){
										this.objList[i].playedRules[j].selectTools[n].id = 6
										this.objList[i].playedRules[j].selectTools[n].name = '清'
									}
									
								}
							}
						}
						this.objList[0].active = true//默认选择第一种玩法
						
						this.obj = this.objList
						
						console.log('objList',this.objList)
						//console.log('obj',this.playedinfo)
					}else{
						this.$api.msg(res.data.info)
					}
					
				},
				fail: (error) => {
					//this.$api.msg(error.data.message)
				}
			})
		},
		addLists(){//添加至投注列表
			let ruleLists = this.obj[this.objIndex].playedRules
			let playedId = this.obj[this.objIndex].playedId	//选中的玩法ID
			
			this.nums = []
			for(let i=0; i<ruleLists.length; i++){
				this.nums.push({name:ruleLists[i].itemName,activeId:''})
				for(let j=0; j<ruleLists[i].numbers.length; j++){
					if(ruleLists[i].numbers[j].active){
						this.nums[i].activeId = this.nums[i].activeId+','+ruleLists[i].numbers[j].id
					}
				}
			}
			console.log('当前玩法选中的号码',this.nums)
			
			this.addList = [{
				playedId:playedId,//玩法ID
				name:this.obj[this.objIndex].playedName,
				numberText:'',
				zhushu:''
			}]
			for(let i=0; i<this.nums.length; i++){//删除第一个逗号
				this.nums[i].activeId = this.nums[i].activeId.substr(1)
				this.addList[0].numberText = this.addList[0].numberText+'|'+this.nums[i].activeId
				
			}
			this.addList[0].numberText = this.addList[0].numberText.substr(1)
			
			let activeList = [{}]
			
			let MinNum = this.obj[this.objIndex]
			
			
			if(playedId == 10011101){//直选
				activeList[0] = this.nums[0].activeId.split(',')
				activeList[1] = this.nums[1].activeId.split(',')
				activeList[2] = this.nums[2].activeId.split(',')
				
				console.log('selectMinNum',ruleLists[0].selectMinNum)
				console.log('activeList',activeList[0])
				
				if(activeList[0] == '' || activeList[0].length<ruleLists[0].selectMinNum){
					this.$api.msg('个位上最少选中'+ruleLists[0].selectMinNum+'个号码')
					return false
				}
				if(activeList[1] == '' || activeList[1].length<ruleLists[1].selectMinNum){
					this.$api.msg('十位上最少选中'+ruleLists[1].selectMinNum+'个号码')
					return false
				}
				if(activeList[2] == '' || activeList[2].length<ruleLists[2].selectMinNum){
					this.$api.msg('百位上最少选中'+ruleLists[2].selectMinNum+'个号码')
					return false
				}
			}
			
			if(playedId == 10011102){//和值
				activeList[0] = this.nums[0].activeId.split(',')
				if(activeList[0] == '' || activeList[0].length<ruleLists[0].selectMinNum){
					this.$api.msg('最少选中一个号码')
					return false
				}
			}
			if(playedId == 10011103){//组三
				
				activeList[0] = this.nums[0].activeId.split(',')
				if(activeList[0] == '' || activeList[0].length<ruleLists[0].selectMinNum){
					this.$api.msg('最少选中'+ruleLists[0].selectMinNum+'个号码')
					return false
				}
			}
			
			if(playedId == 10011104){//组六
				
				activeList[0] = this.nums[0].activeId.split(',')
				if(activeList[0] == '' || activeList[0].length<ruleLists[0].selectMinNum){
					this.$api.msg('最少选中'+ruleLists[0].selectMinNum+'个号码')
					return false
				}
			}
			
			
			//任选3、4、5、6、7、8、9、10普通
			if(playedId == 10011105 || playedId == 10011106 || playedId == 10011107 || playedId == 10011108 || playedId == 10011109 || playedId == 10011110){
				activeList[0] = this.nums[0].activeId.split(',')
				if(activeList[0].length<ruleLists[0].selectMinNum){
					this.$api.msg('最少选中'+ruleLists[0].selectMinNum+'个号码')
					return false
				}
			}
			
			let zxzs = [] //选中数组
			let arrlist = []
			
			//console.log(ruleLists)
			//福彩3D直选
			if(Number(playedId) == 10011101){
				
				this.nums.forEach(function(item,index){
					arrlist.push(item.activeId.split(','))
				}); 
				arrlist[0].forEach(function(item1,index1){
					arrlist[1].forEach(function(item2,index2){
						arrlist[2].forEach(function(item3,index3){
							zxzs.push(item1+','+item2+','+item3)
						});
					});
				});
				console.log('直选投注列表',zxzs)
				console.log('直选投注注数',zxzs.length)
				
				console.log('直选投注注数totalBets',this.totalBets)
				this.totalBets = (this.totalBets+zxzs.length)*this.multiple
				this.bets = this.bets+zxzs.length
			}
			
			//福彩3D和值
			if(Number(playedId) == 10011102){
				
				this.nums.forEach(function(item,index){
					arrlist.push(item.activeId.split(','))
				});
				console.log('arrlist',arrlist)
				
				var val = ''
				for(var g = 0; g < arrlist[0].length; g++) {
					val = arrlist[0][g];
					//console.log('val',val)
					for (let i = 0; i < 10; i++) {
						for (let j = 0; j < 10; j++) {
							for (let l = 0; l < 10; l++) {
								if (i + j + l == val) {
									zxzs.push(i+','+j+','+l)
								}
							}
						}
					}
				}
				console.log('和值投注列表',zxzs)
				console.log('和值投注注数',zxzs.length)
				
				this.totalBets = (this.totalBets+zxzs.length)*this.multiple
				this.bets = this.bets+zxzs.length
			}
			//福彩3D组三
			if(Number(playedId) == 10011103){
				
				let arr2 = this.nums[0].activeId.split(',')
				let arr1 = []
				arr1 = this.groups(arr2,2);
				
				this.totalBets = (this.totalBets+arr1.length*2)*this.multiple
				this.bets = this.bets+arr1.length*2
				
				zxzs = arr1
				zxzs.length = zxzs.length*2
				console.log('组三投注列表',zxzs)
				console.log('组三投注注数',zxzs.length)
				
			}
			//福彩3D组六
			if(Number(playedId) == 10011104){
				
				let arr2 = this.nums[0].activeId.split(',')
				
				let arr1 = []
				arr1 = this.groups(arr2,3);
				console.log('arr2',arr2)
				
				this.totalBets = (this.totalBets+arr1.length)*this.multiple
				this.bets = this.bets+arr1.length
				
				zxzs = arr1
				zxzs.length = zxzs.length
				console.log('组六投注列表',zxzs)
				console.log('组六投注注数',zxzs.length)
				
			}
			
			let b = 3	//选n个数
			if(playedId == 10011105 || playedId == 10011106 || playedId == 10011107 || playedId == 10011108 || playedId == 10011109 || playedId == 10011110){//任选3普通
				
				let arr2 = this.nums[0].activeId.split(',')
				
				if(playedId == 10011106){
					b = 4
				}
				if(playedId == 10011107){
					b = 5
				}
				if(playedId == 10011108){
					b = 6
				}
				if(playedId == 10011109){
					b = 7
				}
				if(playedId == 10011110){
					b = 8
				}
				
				//console.log('b',b)
				let numLength = this.numss(arr2,b)
				console.log('numLength',numLength)
				this.totalBets = (this.totalBets+numLength)*this.multiple
				this.bets = this.bets+numLength
				
				zxzs = []
				zxzs.length = numLength
				
				console.log('任选数组',arr2)
				
			}
			
			this.addList[0].zhushu = zxzs.length
			
			if(this.adds.length>0){//赋值到投注列表
				this.adds = this.adds.concat(this.addList)
			}else{
				this.adds = this.addList
			}
			console.log('选中玩法',this.adds)
			
			//清除当前玩法选中的数字
			//this.obj[this.objIndex].playedRules 
			console.log('playedRules',this.obj[this.objIndex].playedRules)
			
			for(var i=0; i< this.obj[this.objIndex].playedRules.length; i++){
				for(var j=0; j<this.obj[this.objIndex].playedRules[i].numbers.length; j++){
					this.obj[this.objIndex].playedRules[i].numbers[j].active = false
				}
			}
			
		},
		groups(nu, groupl, result){//组选方法封装
			var result = result ? result : [];
			var nul = nu.length;
			var outloopl = nul - groupl;
			
			var nuc = nu.slice(0);
			
			var item = nuc.shift();
			item = item.constructor === Array ? item : [item];
			
			
			(function func(item,nuc){
				var itemc;
				var nucc = nuc.slice(0);
				var margin = groupl- item.length
				
				
				if( margin == 0){
					result.push(item);
					return;
				}
				if( margin == 1){
					for(var j in nuc){
						itemc = item.slice(0);
						itemc.push(nuc[j]);
						result.push(itemc);
					}			
				}		
				if( margin > 1){
					itemc = item.slice(0);
					itemc.push(nucc.shift());
					func(itemc,nucc);
		
					if(item.length + nucc.length >= groupl){
						func(item,nucc);
					}
					
				}
				
			})(item,nuc);
			
		
			if(nuc.length >= groupl){
				//console.log('result',result)
				return this.groups(nuc, groupl, result);
			}else{
				//console.log('result',result)
				return result;
			}
			
		},
		
		clerAdd(){//清空列表
			this.adds = []
			this.bets = 0
			this.totalBets = 0
			this.totalBetss = 0
			this.type = 1
			this.subTitle = '单买'
		},
		
		changeUp(){//保密
			console.log('保密: ' + this.catchUp)
		},
		changebd(){
			console.log('全额保底: ' + this.catchbd)
			if(this.catchbd){
				this.baodi = this.totalBets*2 - this.zdrengou
			}
		},
		rengou(){
			let that = this
			console.log('最低认购',that.zdrengou)
			if(Number(this.zdrengou) > that.totalBets*2){
				that.zdrengou = 0
				setTimeout(function(){
					that.zdrengou = that.totalBets*2
					//that.baodi = that.totalBets*2 - that.zdrengou
				},1)
				
			}else if(Number(that.zdrengou) < that.totalBets*2*0.05){
				setTimeout(function(){
					//that.zdrengou = that.totalBets*2*0.05
					//that.baodi = that.totalBets*2 - that.zdrengou
				},1)
				
			}else{
				//that.baodi = that.totalBets*2 - that.zdrengou
			}
		},
		baodinum(){
			let that = this
			if(that.baodi>that.totalBets*2){
				that.baodi = that.totalBets*2 - that.zdrengou
			}
			if(that.baodi<0){
				that.baodi = 0
			}
		},
		qdhem(){//确定合买
			if(Number(this.zdrengou) < this.totalBets*2*0.05){
				this.$api.msg('最低认购5%,'+this.totalBets*2*0.05+'份')
				return false
			}
			this.hemai = false
			this.subTitle = '合买'+this.zdrengou+'份，'+'保底'+this.baodi+'份'
			this.totalBetss = (Number(this.zdrengou)+Number(this.baodi))
			console.log('合买',this.totalBetss)
			
		},
		buyTogeter(){
			if(this.adds.length<1){
				this.$api.msg('请先添加购彩方案到投注列表')
				return false
			}
			this.hemai=true
			this.bettingShow = false
			this.zdrengou=Math.ceil(this.totalBets*2*0.05)
			if(this.zdrengou<1){
				this.zdrengou = 1
			}
			//this.baodi = this.totalBets*2-this.zdrengou
			this.type = 2
		},
		valChange(e) {//倍数
			console.log('倍数: ' + this.multiple)
			this.totalBets = this.bets*this.multiple
		},
		optionList(item,index,list){//选择投注球
			list[index].active = !list[index].active
		},
		ruleClick(item,index){//玩法选择
			for(let i=0; i<this.obj.length; i++){
				this.obj[i].active = false
			}
			this.objActive = index
			this.obj[this.objActive].active = true
		},
		ruleConfirm(){//确定玩法选择
		
			console.log(this.objIndex)
			this.objIndex = this.objActive
			this.ruleShow = false
		},
		ruleQx(){//取消玩法选择
			this.ruleShow = false
			this.objActive = this.objIndex
			this.obj[this.objActive].active = true
		},
		xuan(sele,list){//快捷选择封装
			console.log('sele',sele)
			let typeId = sele.id
			console.log('list',list)
			
			if(typeId == 1){//全选
				for(let i=0; i<list.length; i++){
					list[i].active = true
				}
			}
			if(typeId == 2){//大
				for(let i=0; i<list.length; i++){
					if(list[i].id>4){
						list[i].active = true
					}else{
						list[i].active = false
					}
				}
			}
			if(typeId == 3){//小
				for(let i=0; i<list.length; i++){
					if(list[i].id<=4){
						list[i].active = true
					}else{
						list[i].active = false
					}
				}
			}
			if(typeId == 4){//单
				for(let i=0; i<list.length; i++){
					if(list[i].id%2 === 1){
						list[i].active = true
					}else{
						list[i].active = false
					}
				}
			}
			if(typeId == 5){//双
				for(let i=0; i<list.length; i++){
					if(list[i].id % 2 === 0){
						list[i].active = true
					}else{
						list[i].active = false
					}
				}
			}
			if(typeId == 6){//清空
				for(let i=0; i<list.length; i++){
					list[i].active = false
				}
			}
		},
		
		
		Downend(){
			console.log('倒计时结束')
			let that = this
			for(let i=0; i<that.numList.length; i++){
				//(你要改变的数组/对象,你要改变的位置,你要改成什么value)
				that.$set(that.numList,i,'-') //这样就能被vue监控到，更新视图    
			}
			console.log(that.numList)
			that.ben_qi_xia_zhu = false
			setTimeout(function(){
				that.getplayed(that.lotteryTypeId)
				that.ben_qi_xia_zhu = true
			},30*1000)
		},
		history(lotteryTypeId){
			uni.navigateTo({
				url:'/pages/prize/history?title='+this.title+'&id='+lotteryTypeId
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
					if(Number(res.data.status) == 1){
						let dataInfo = res.data
						//console.log('dataInfo',dataInfo)
						this.setuser(dataInfo);
					}
				}
			})
		},
		...mapMutations(['setuser']),
	}
}
</script>

<style lang="scss">
	.wager{
		.u-drawer-bottom{
			background-color: inherit;
		}
	}
</style>
<style lang="scss" scoped>
.zxbox{
	.zxbox_item{
		width: 31%;
		height: 50rpx;
		background-color: #ededf1;
		color: #415249;
		margin-right: 3%;
		margin-bottom: 10rpx;
		border-radius: 4rpx;
	}
	.zxbox_item:nth-child(3n){
		margin-right: 0;
	}
	.zxbox_item_active{
		background-color: #ec6660;
		color: #fef6f6;
	}
}
.zxsub{
	background-color: #ec6660;
	color: #fef6f6;
	flex: 2;
}
.zxqx{
	background-color: #536768;
	color: #e0e3e3;
	flex: 1;
}





.list{
	width: 70rpx;
	display: inline-block;
}

.list1{
	width: 80rpx;
	height: 80rpx;
	font-size: 44rpx;
	font-weight: 600;
	border-radius: 50%;
	margin-right: 5rpx;
	margin-bottom: 8rpx;
	display: inline-block;
	line-height: 80rpx;
	text-align: center;
	/* background-image: radial-gradient(#ea6942,#ea7e50,#db5343,#ba5b47); */
	background: url(../../../static/buy_detail_02.png) no-repeat;
	background-size: 100% 100%;
	background-position: center center;
	/* background-position-y: 2rpx; */
	color: #2a3f33;
}

.list1_active{
	background: url(../../../static/buy_detail_01.png) no-repeat;
	background-size: 100% 100%;
	background-position: center center;
	background-position-y: 2rpx;
	color: white;
}
.list1_history{
	width: 70rpx;
	height: 40rpx;
	margin-right: 5rpx;
	color: #afafaf;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24rpx;
}
.bg_ws{
	width: 120rpx;
	height: 50rpx;
	font-size: 24rpx;
	color: #fff;
	background: url(../../../static/buy_detail_w.png) no-repeat;
	background-size: 100% 100%;
}
.bg_xx{
	display: inline-block;
	width: 44rpx;
	height: 44rpx;
	font-size: 24rpx;
	background: #e7eaeb;
	color: #a0a4a7;
	text-align: center;
	line-height: 44rpx;
	border-radius: 6rpx;
	margin-left: 10rpx;
}

.text-color{
	color: #8e9199;
}
.numberbg{
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	margin-right: 5rpx;
	margin-bottom: 8rpx;
	font-size: 36rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	/* background-image: radial-gradient(#ea6942,#ea7e50,#db5343,#ba5b47); */
	background: url(../../../static/buy_detail_01.png) no-repeat;
	background-size: 100% 100%;
	background-position: center center;
	background-position-y: 2rpx;
	color: white;
	//border: 1upx solid #ba5b47;
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
	margin: 50rpx 40rpx 20rpx;
	height: 80upx;
	font-size: 32upx;
	color: #fff;
	background-color:#e60000;
	border-radius: 10upx;
	//box-shadow: 1px 2px 5px #e60000;		
}
</style>
