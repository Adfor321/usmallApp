<template>
	<view>
		<view class="search">
			<icon type="search" color="white" size="10"></icon>
			<input type="text" v-model="userValue" placeholder="搜索商品" placeholder-class="placeholder" @confirm="search" />
		</view>
		<view class="list" v-if="list">
			<view class="row" v-for="(item,index) in goodsList" :key=item.id :data-id="item.id" @click="toDetail">
				<image :src=imgUrl+item.img mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>
					<text>原价￥{{item.market_price}}</text>
					<text>现价￥{{item.price}}</text>
					<text>3565评论</text>
				</view>
			</view>
		</view>
		<view class="tishi" v-else>
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import {
		getcategoodPage,
		baseUrl,
		search
	} from "../../utils/request.js"
	export default {
		data() {
			return {
				page: 1,
				size: 10,
				goodsList: {},
				imgUrl: baseUrl,
				list: false,
				userValue: ""
			}
		},
		methods: {
			//模糊搜索
			search() {
				search({keywords:this.userValue}).then(res=>{
					if(res.data.list!=null){
						this.goodsList = res.data.list
						this.list = true
					}else{
						this.goodsList = [];
						this.list = false
					}
				})
			},
			//点击去详情页
			toDetail(e){
				let id = e.currentTarget.dataset.id
				uni.navigateTo({
					url:"../details/details?id="+id,
				})
			}
		},
		onShow() {
			this.userValue = ""
		},
		onLoad(e) {
			let id = e.id
			let name = e.name;
			//如果是在首页搜索
			if(name){
				search({keywords:name}).then(res=>{
					if(res.data.list!=null){
						this.goodsList = res.data.list
						this.list = true
					}else{
						this.goodsList = [];
						this.list = false
					}
				})
			}else{
				//如果是在首页点击搜索
				getcategoodPage({
					fid: id,
					page: 1,
					size: this.size
				}).then(res => {
					this.list = true
					this.goodsList = res.data.list[1]
				})
			}
		}
	}
</script>

<style>
	.search {
		margin: 50rpx;
		height: 80rpx;
		background-color: #f26b11;
		border-radius: 80rpx;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	icon {
		margin: 0 10rpx 0 250rpx;
	}

	.placeholder {
		color: white;
		font-size: 25rpx;
	}

	.row {
		position: relative;
		margin: 10rpx 20rpx;
		height: 330rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}

	image {
		position: absolute;
		top: 0;
		left: 10rpx;
		width: 160rpx;
	}

	.info {
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
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
