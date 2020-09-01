<template>
	<view class="">
		<!-- 顶部信息 -->
		<view class="HomeTop">
			<view class="logoView">
				<!-- logo -->
				<img class="logo" src="/static/index/logo.jpg" alt="" />
			</view>
			<view class="inputView">
				<input class="textinput" @confirm="toSearch" v-model="userSearch" style="center" type="text" placeholder="寻找商品" />
			</view>
		</view>

		<!-- 顶部导航  scroll-view -->
		<view class="tabs">
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
				<view class="uni-tab-item" :id=index :data-fid=item.id  v-for="(item,index) in title" :key="index" @click="titles">
					<text :class="selectId==index?'uni-tab-item-title  uni-tab-item-title-active':'uni-tab-item-title'">
						{{item.catename}}
					</text>
				</view>
			</scroll-view>
		</view>
		<!-- 推荐轮播图 -->
		<view class="">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000">
				<swiper-item v-for="(item,index) in banner" :key="index">
					<view class="swiper-item">
						<image :src=item.img mode=""></image>
					</view>
				</swiper-item>

			</swiper>
		</view>

		<!-- 功能导航开始 -->
		<!-- 功能导航 -->
		<view class="FunctNavCon">
			<view class="FunctNavLi">
				<image src="../../static/index/xiaohuoban.png" alt class="FunImg" />
				<p>限时抢购</p>
			</view>
			<view class="FunctNavLi">
				<image src="../../static/index/jifentixicopy.png" alt class="FunImg" />
				<p>积分商城</p>
			</view>
			<view class="FunctNavLi">
				<image src="../../static/index/lianxiwomen.png" alt class="FunImg" />
				<p>联系我们</p>
			</view>
			<view class="FunctNavLi" @click="toCates">
				<image src="../../static/index/-shangpinfenlei-gai.png" alt class="FunImg" />
				<p>商品分类</p>
			</view>
		</view>

		<!-- 推荐部分 未写 -->
		<view class="HotGoods">
			<!-- 热推左侧 -->
			<view class="HotLeft">
				<view class="LimitedContent">
					<image class="LimitedImg" src="../../static/index/xianshi.jpg" alt />
					<label class="Limited">限时秒杀</label>
				</view>
				<p class="LimitedTitle">每天零点场，好货秒不停</p>
				<!-- 倒计时 -->
				<view class="LimitTimeAll">
					<label class="LimitTime">{{times[0]}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{times[1]}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{times[2]}}</label>
					<label class="Seckill">秒杀</label>
				</view>
				<image src="../../static/index/goods2.jpg" class="LimitedgoodsImg" alt="">
			</view>

			<!-- 热推右侧 -->
			<view class="HotRight">
				<!-- 右侧顶部部分 -->
				<view class="HotTop">
					<view class="HomeTopInfo">
						<view class="HomeTopInfoOne">
							<label class="BrandNew">品牌上新</label>
							<label class="Discount">折</label>
						</view>
						<view class="HomeTopRobbig">
							<label>每日九点，抢大牌</label>
						</view>
					</view>
					<!-- <div> -->
					<view class="Cloth">
						<image src="../../static/index/goods1.jpg" alt="">
					</view>

					<!-- </div> -->
				</view>
				<!-- 右侧底部 -->
				<view class="HotBottom">
					<view class="HotBottomLeft">
						<view class="HotBottomLeftInfo">
							<label class="HotBottomLeftInfoTitle">每日十件</label>
							<label class="HotBottomLeftInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomLeftImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
					<view class="HotBottomRight">
						<view class="HotBottomRightInfo">
							<label class="HotBottomRightInfoTitle">每日十件</label>
							<label class="HotBottomRightInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomRightImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 轮播图2 -->
		<div class="Swiper2">
			<image class="Swiper2Img" src="../../static/index/swiper1.jpg" alt />
		</div>

		<!-- 底部商品列表 -->
		<view class="products">
			<!-- 商品标签 -->
			<view class="tags">
				<view :class="num=='0'?'tag_list active_tag_list':'tag_list'" id="0" @click="selectGoods">
					<label for="">热门推荐</label>
				</view>
				<view :class="num=='1'?'tag_list active_tag_list':'tag_list'" id="1" @click="selectGoods">
					<label for="" >发现好货</label>
				</view>
				<view :class="num=='2'?'tag_list active_tag_list':'tag_list'" id="2" @click="selectGoods">
					<label for="">只看专场</label>
				</view>
			</view>
			<!-- 标签对应的商品 -->
			<view class="tags_product">
				<view class="product" v-for="(item,index) in indexGoods[num].content" :key="item.id" >
					<view class="GoodsLeft">
						<image class="GoodsImg" :src=imgUrl+item.img alt />
					</view>
					<view class="GoodsCont">
						<view class="GoodConTit">{{item.goodsname}}</view>
						<view class="GoodsPrice">{{"￥"+item.price}}</view>
						<view class="yimai">已售8000件</view>
						<view class="Immed" :id=item.id @click="toDetail">立即抢购</view>
					</view>
				</view>
				

			</view>
		</view>
	</view>
</template>

<script>
	import {
		getBanner,
		baseUrl,
		getCates,
		getSeckill,
		getindexGoods,
		getCate
	} from "../../utils/request.js"
	import {format} from "../../utils/time.js"
	export default {
		data() {
			return {
				banner: [],
				title: [],
				selectId: "0",
				times:["00","00","00"],
				indexGoods:[],
				imgUrl:baseUrl,
				num:0,
				userSearch:""
			}
		},
		methods: {
			//顶部导航栏选中样式
			titles(e) {
				this.selectId = e.currentTarget.id;
				let id = e.currentTarget.dataset.fid;
				uni.navigateTo({
					url:"../product/product?id="+id,
				})
			},
			//底部分类选中样式
			selectGoods(e){
				this.num = e.currentTarget.id
			},
			toCates(){
				uni.navigateTo({
					url:"../classify/classify"
				})
			},
			//去详情页
			toDetail(e){
				let id = e.currentTarget.id
				uni.navigateTo({
					url:"../details/details?id="+id
				})
			},
			//去搜索页面
			toSearch(){
				uni.navigateTo({
					url:"../product/product?name="+this.userSearch
				})
			},
		},
		onShow() {
			this.userSearch = ""
		},
		onLoad() {
			//加载轮播图
			getBanner().then(res => {
					this.banner = res.data.list
					this.banner.forEach(item => {
						item.img = baseUrl + item.img
					})
				}),
			//点击title
			getCate().then(res => {
					this.title = res.data.list
				})
			//商品分类	
			getindexGoods().then(res=>{
				this.indexGoods = res.data.list
			})
			//限时秒杀
			getSeckill().then(res=>{
				let time = res.data.list[0].endtime
				setInterval(()=>{
					this.times = format(time).split(":")
				},1000)
			})
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/index.css");
</style>
