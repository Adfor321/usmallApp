<template>
	<view class="container">
		<view class="top">
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0" v-for="(item,index) in userCart" :key=item.id>
				<view class="cartInfo">
					<!-- 购物车商品信息 -->
					<view class="cartInfochild">
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							<switch type="checkbox" :data-ind=index :checked=item.check :id=item.id @change="state" />
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common">
							<image :src=imgUrl+item.img mode=""></image>
						</view>

						<!-- 信息 -->
						<view class="cartInfo_info">
							<label for="" style="font-size: 26rpx;">{{item.goodsname}}</label>
							<label for="" style="font-size: 24rpx; color: #ccc;">规格：黑色</label>
							<label for="" style="color: red;">￥{{item.price}}</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label for="" :data-sum=item.num :data-type="1" :data-ind=index :id=item.id @click="editNum" :disabled=editState>-</label>
								<label for="">{{item.num}}</label>
								<label for="" :data-sum=item.num :data-type="2" :data-ind=index :id=item.id @click="editNum">+</label>
							</view>
						</view>
					</view>
				</view>
				<view class="cartDel"><label for="" :id=item.id @click="del">删除</label></view>
			</scroll-view>
		</view>

		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch type="checkbox" :checked=allChecks @change="allChecked" />
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">
					总计：
					<label style="color: red;">{{allprice}}</label>
				</view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3" @click="checkOut">
				<!-- 被选中的商品的个数 -->
				<label>去结算({{goodsSelect}}件)</label>
			</view>
		</view>
		<view v-if="noList">购物车空空如也</view>
	</view>
	
</template>

<script>
	import {
		cartList,
		baseUrl,
		cartEdit,
		cartDelete,
		checktoken
	} from "../../utils/request.js"
	import {timeOut} from "../../utils/utils.js"
	export default {
		data() {
			return {
				userCart: [],
				imgUrl: baseUrl,
				editState:true,
				noList:false
			}
		},
		computed: {
			allChecks() {
				if(this.noList){
					return false
				}else{
					return this.userCart.every(item => item.check)
				}
			},
			allprice() {
				return this.userCart.reduce((pre,cur)=>{
					if(cur.check){
						return pre+cur.price*cur.num
					}else{
						return pre
					}
				},0)
			},
			goodsSelect(){
				return this.userCart.reduce((pre,cur)=>{
					if(cur.check){
						return pre+cur.num
					}else{
						return pre
					}
				},0)
			}
		},
		methods: {
			//单选商品
			state(e) {
				let index = e.currentTarget.dataset.ind
				this.userCart[index].check = e.detail.value
				if(e.detail.value){
					this.userCart[index].checked = 1
				}else{
					this.userCart[index].checked = 0
				}
			},
			//全选
			allChecked(e) {
				this.userCart = this.userCart.map(item => {
					item.check = e.detail.value
					return item
				})
				if(e.detail.value){
					this.userCart = this.userCart.map(item => {
						item.checked = 1
						return item
					})
				}else{
					this.userCart = this.userCart.map(item => {
						item.checked = 0
						return item
					})
				}
			},
			//修改数量
			editNum(e){
				//加减类型
				let type = String(e.currentTarget.dataset.type)
				let index = e.currentTarget.dataset.ind
				let id = e.currentTarget.id
				let checked = 0
				//判断是加或减
				if(e.currentTarget.dataset.sum>1||type!="1"){
					this.editState = false
					if (type == "1") {
							this.userCart[index].num -= 1
					} else {
						this.userCart[index].num += 1
					}
					if(this.userCart[index].check){
						checked = 1
					}else{
						checked = 0
					}
					cartEdit({id:id,num:this.userCart[index].num,checked:checked}).then(res=>{
						if(res.data.code === 200){
							this.editState = true
						}
					})
				}else{
					this.editState = false
					uni.showToast({
						title:"不能再少了",
						icon:"none",
						duration:1000
					})
				}
			},
			//删除列表项
			del(e){
				let id = e.currentTarget.id
				uni.showModal({
					title:"你确定要删除吗？",
					success:result=>{
						if(result.confirm){
							cartDelete({id:id}).then(res=>{
								if(res.data.code===200){
									uni.showToast({
										title:"删除成功",
										icon:"success",
										duration:1000
									})
									this.getUserCart()
								}else{
									uni.showToast({
										title:res.data.msg,
										icon:"success",
										duration:1000
									})
								}
							})
						}
					}
				})
			},
			//获取购物车列表
			getUserCart(){
				let uid = uni.getStorageSync("userInfo").uid
				cartList({
					uid: uid
				}).then(res => {
					if(res.data.list!=null){
						this.userCart = res.data.list.map((item,index) => {
							if(this.userCart.length&&this.userCart&&this.userCart.some(olditem=>{
								if(olditem.id===item.id){
									item.check == olditem.check
								}
								return olditem.id === item.id
							})){
								
							}else{
								item.check = false
							}
							this.noList = false
							return item
							
						})
					}else{
						this.userCart = []
						this.noList = true
					}
					
				})
			},
			//提交
			checkOut(){
				let userGoods = []
				let realCheck = this.userCart.some(item=>{
					return item.check
				})
				if(realCheck){
					this.userCart.forEach(item=>{
						if(item.check){
							userGoods.push(item)
						}
					})
				}else{
					uni.showToast({
						title:"您尚未选中商品",
						icon:"none"
					})
				}
				uni.setStorageSync("userGoods",userGoods)
				uni.navigateTo({
					url:"../confirm/confirm"
				})
			}
			
		},
		onShow(){
			checktoken().then(res=>{
				if(res.data.code===403){
					uni.showToast({
						title:"请先登录后再查看",
						icon:"none",
						duration:2000,
						success:res=>{
							timeOut("../send/send")
						}
					})
				}else{
					this.getUserCart()
				}
			})
		}
	};
</script>

<style>
	@import url('../../common/css/cart.css');

	.cartInfo_image_img {
		width: 120rpx;
		height: 120rpx;
	}
</style>
