<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src=imgUrl+list.img>
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{list.goodsname}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{list.price}}</label>
				<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
			</view>
		</view>

		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
					<label class="jian" id="1" @click="goodsEdit">-</label>
					<label class="zhi">{{num}}</label>
					<label class="jia" id="2" @click="goodsEdit">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label>规格</label>
					<view class="threed3i1" v-for="(item,index) in list.specsattr" :key="index">{{item}}</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<!-- 需要处理图片自适应问题 -->
			<view v-html="list.description">

			</view>
		</view>

		<view class="productEval">
			<view class="eval">商品评价</view>
			<view>
				<label class="evalUsername">小李白</label>
				<label class="evalUsertitle">效果很好，物流到位，下次继续来</label>
				<view class="evalImage">
					<image src="../../static/detail/pingjia1.jpg" />
					<image src="../../static/detail/pingjia2.jpg" />
					<image src="../../static/detail/pingjia3.jpg" />

				</view>
				<label class="evalTime">2020-01-13</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" @click="toCart">加入购物车</button>
			<button class="footbtn2">立即购买</button>
		</view>
	</view>
</template>
<script>
	import {
		baseUrl,
		getGoodsinfo,
		cartAdd,
		checktoken
	} from "../../utils/request.js"
	import {
		timeOut
	} from "../../utils/utils.js"
	export default {
		data() {
			return {
				list: {},
				imgUrl: baseUrl,
				num: 1
			}
		},
		onLoad(e) {
			let id = e.id;
			getGoodsinfo({
				id: id
			}).then(res => {
				let result = res.data.list[0]
				//规格属性
				let arr = result.specsattr.split(",")
				result.specsattr = arr
				this.list = result
			})
		},
		methods: {
			//修改物品数量
			goodsEdit(e) {
				if (e.currentTarget.id == "1") {
					if (this.num > 1) {
						this.num -= 1
					} else {
						this.num = 1
					}
				} else {
					this.num += 1
				}
			},
			//加入购物车
			toCart() {
				let id = String(this.list.id)
				let uid = uni.getStorageSync("userInfo").uid
				checktoken().then(res => {
					console.log(res)
					if (res.data.code === 403) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000,
							success: res => {
								timeOut("../send/send")
							}
						})
					} else {
						let num = this.num
						cartAdd({
							uid: uid,
							goodsid: id,
							num: num
						}).then(res => {
							uni.showToast({
								title: "加入成功",
								icon: 'success'
							})
						})
					}
				})

			}
		}
	}
</script>
<style>
	@import url("../../common/css/details.css");
</style>
