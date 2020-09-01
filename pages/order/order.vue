]<template>
	<view>
		<uni-search-bar radius="100" bgColor="#ffff"></uni-search-bar>
		<view class="list">
			<view class="row" v-for="(item,index) in userOrder" :key="item.id">
				<view class="products" v-for="(i,j) in item.child" :key="j">
					<view class="imagebox">
						<image :src="imgUrl+i.img" mode="widthFix"></image>
						<text>{{i.goodsname}}</text>
					</view>

				</view>
				<view class="info">
					<text space="nbsp">总计{{item.countnumber}}商品 </text>
					<text>应付金额 ￥{{item.countmoney}}</text>
				</view>
			</view>
		</view>
		<view class="tishi" v-if="userOrder.length<1">
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import {
		orders,
		baseUrl,
		checktoken
	} from "../../utils/request.js"
	import {
		timeOut
	} from "../../utils/utils.js"
	export default {
		components: {
			uniSearchBar
		},
		data() {
			return {
				userOrder: [],
				imgUrl: baseUrl
			}
		},
		onLoad(e) {
			checktoken().then(res => {
				if (res.data.code === 403) {
					uni.showToast({
						title: "请登录",
						icon: "none",
						success: res => {
							timeOut("../send/send")
						}
					})
				} else {
					let uid = uni.getStorageSync("userInfo").uid
					orders({
						uid: uid
					}).then(res => {
						if (res.data.code === 200) {
							this.userOrder = res.data.list
						}
					})
				}
			})

		}

	}
</script>
<style>
	.row {
		margin: 10rpx 20rpx;
		/* height: 240rpx; */
		border: 1rpx solid #AAAAAA;
		border-radius: 30rpx;
	}

	.imagebox {
		float: left;
		margin: 10rpx;
	}

	.products {
		overflow: hidden;
	}

	image {
		width: 160rpx;
		margin-left: 10rpx;
	}

	.info {
		/* position: absolute;
		top: 180rpx;
		right: 50rpx; */
		display: flex;
		justify-content: space-between;
		font-size: 25rpx;
		/* width: 340rpx; */
		padding: 20rpx;
		text-align: right;
	}

	.info text:nth-of-type(2) {
		color: red;
	}

	.info text:nth-of-type(3) {
		font-size: 20rpx;
		color: #AAAAAA;
	}

	.tishi {
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
