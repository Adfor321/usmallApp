<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<view :class="selectId==index?'left_list activeList':'left_list'" v-for="(item,index) in leftList" :id=index :key="item.id" @click="tap">
				<label for="">{{item.catename}}</label>
			</view>
		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<!-- 商品 -->
				<view class="bottom">
					<view class="bottom_list" :id=item.id v-for="(item,index) in leftList[selectId].children" :key="item.id" @click="toDetail">
						<!-- 每个最多显示6个 -->
						<view >
							<image :src=imgUrl+item.img alt="">
						</view>
						<view class="title">
							<span>{{item.catename}}</span>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	import {getCates,baseUrl,getcategoods} from "../../utils/request.js"

	export default {
		data() {
			return {
				leftList:[],
				selectId:0,
				imgUrl:baseUrl
			}
		},
		methods: {
			tap(e){
				this.selectId = e.currentTarget.id
			},
			toDetail(e){
				let id = e.currentTarget.id
				uni.navigateTo({
					url:"../details/details?id="+id
				})
			}
		},
		onLoad() {
			getCates().then(res=>{
				this.leftList = res.data.list
			})
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");
	
	/* 点击左侧导航，显示动态样式 */
	.activeList{
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}
</style>
