<template>
	<view class="container">
		<!-- s收货地址 -->
		<view class="address">
			<view class="address_info">
				<label for="">收件人:{{userName}}</label>
				<label for="">{{[phone]}}</label>
			</view>
			<view class="address_res">
				收货地址：<label for="">{{adress}}</label>
			</view>
		</view>

		<!-- 商品信息 -->
		<view class="carts">

			<view class="cartsInfo" v-for="(item,index) in userGoods" :key="item.id">
				<!-- 70px -->
				<view class="carts_detail">
					<view class="carts_image">
						<image :src="imgUrl+item.img" mode=""></image>
					</view>
					<view class="carts_name">
						<view for="" style="font-size: 30rpx;">{{item.goodsname}}</view>
						<view for="" style="font-size: 26rpx; color: #C0C0C0;">规格:300</view>
					</view>
					<view class="carts_price">
						<label for="">￥ {{item.price}}</label>
					</view>
				</view>
				<!-- 50px -->
				<view class="cart_num">
					<view class="">
						购买数量：
					</view>
					<view class="">
						<label for="" class="jian" :data-sum=item.num :data-type="1" :data-ind=index :id=item.id @click="editNum"
						 :disabled=editState>-</label>
						<label for="" class="num">{{item.num}}</label>
						<label for="" class="jia" :data-sum=item.num :data-type="2" :data-ind=index :id=item.id @click="editNum">+</label>
					</view>
				</view>
				<!-- 横线 -->
				<view class="xian"></view>
			</view>

			<!-- 50px -->
			<view class="kuaidi">
				<label for="">配送方式</label>
				<label for="">XX快递</label>
			</view>
		</view>

		<!-- 优惠券 -->
		<view class="yhquan">
			<label for="">优惠券</label>
			<label for="" style="margin-right: 40rpx;">无可用</label>
		</view>
		<!-- jifen积分 -->
		<view class="jifen">
			<view class="use">
				<label for="">使用积分</label>
			</view>
			<view class="input" style="margin-right: 40rpx;">
				<input type="text" value="" placeholder="输入积分" />
				<label for="" class="input_use">使用</label>
				<label for="" class="input_keyi">可使用50积分</label>
			</view>
		</view>

		<!-- 具体详细 -->
		<view class="resDetail">
			<view class="">
				<label for="">商品金额</label>
				<label for="" style="margin-right:40rpx;color:red">￥{{allPrice}}</label>
			</view>
			<view class="">
				<label for="">运费</label>
				<label for="" style="margin-right:40rpx;color:red">+￥0.00</label>
			</view>
			<view class="">
				<label for="">优惠券</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">会员优惠</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">积分抵扣</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
		</view>
		<!-- 实付金额 -->
		<view class="sfje">
			实付金额：<label for="" style="color:red">￥{{ allPrice }}</label>
		</view>

		<!-- 确认订单按钮 -->
		<view class="btn">
			<!-- 点击提交订单按钮，发起支付请求 -->
			<button type="primary" @click="pay">提交订单</button>
		</view>
	</view>
</template>

<script>
	import {
		baseUrl,
		cartEdit,
		orderAdd
	} from "../../utils/request.js"
	import {timeOut} from "../../utils/utils.js"
	export default {
		data() {
			return {
				userGoods: [],
				userName: "YuSa",
				phone: "15837804453",
				adress: "北京市海淀区隐泉路青林菀6号楼中公优就业总部3层",
				imgUrl: baseUrl,
				editState: true
			}
		},
		methods: {
			//修改数量
			editNum(e) {
				let index = e.currentTarget.dataset.ind
				let type = String(e.currentTarget.dataset.type)
				let checked = 0
				let id = e.currentTarget.id
				if (e.currentTarget.dataset.sum > 1 || type != "1") {
					this.editState = false
					if (type == "1") {
						this.userGoods[index].num -= 1
					} else {
						this.userGoods[index].num += 1
					}
					if (this.userGoods[index].check) {
						checked = 1
					} else {
						checked = 0
					}
					cartEdit({
						id: id,
						num: this.userGoods[index].num,
						checked: checked
					}).then(res => {
						if (res.data.code === 200) {
							this.editState = true
						}
					})
				} else {
					this.editState = false
					uni.showToast({
						title: "不能再少了",
						icon: "none",
						duration: 1000
					})
				}
			},
			//提交订单
			pay() {
				let uid = uni.getStorageSync("userInfo").uid
				let addtime = new Date().getTime()
				let arr = this.userGoods.map(item => {
					return item.id
				})
				let idstr = arr.join()
				let data = {
					uid: uid,
					username: this.userName,
					userphone: this.phone,
					address: this.adress,
					countmoney: this.allPrice,
					countnumber: this.goodsNum,
					addtime: addtime
				}
				
				orderAdd(JSON.stringify(data),idstr).then(res => {
					if(res.data.code===200){
						uni.showToast({
							title:"结算完成",
							icon:"success",
							duration:2000,
							success:res=>{
								timeOut("../cart/cart")
							}
						})
					}
				})
			}
		},
		computed: {
			allPrice() {
				return this.userGoods.reduce((pre, cur) => {
					return pre + cur.price * cur.num
				}, 0)
			},
			goodsNum() {
				return this.userGoods.reduce((pre, cur) => {
					return pre + cur.num
				}, 0)
			}
		},
		onLoad() {
			this.userGoods = uni.getStorageSync("userGoods")
		}
	}
</script>
<style>
	@import url("../../common/css/confirm.css");
</style>
