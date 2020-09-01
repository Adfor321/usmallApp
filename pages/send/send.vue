<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="phone" maxlength="12" />
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<text v-if="isSms" @click="getSms" :disabled="isDisable">点击获取验证码</text>
				<text v-else>{{num}}</text>
			</view>
			<input type="text" v-model="userCode" placeholder="- - - -" maxlength="4" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<!--   -->
			<button type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;" @click="login">登录</button>
		</view>
		<view class="row">
			<text style="color: #006699;text-align: center;">通过微信授权登录</text>
		</view>
	</view>
</template>

<script>
	import {getSms,sendLogin} from "../../utils/request.js"
	import {timeOut} from "../../utils/utils.js"
	export default {
		data() {
			return {
				isSms:true,
				num:45,
				phone:"",
				userCode:"",
				code:"",
				isDisable:false
			}
		},
		methods:{
			//获取短信
			getSms(){
				    var phone = this.phone;
				    if(!(/^1[3456789]\d{9}$/.test(phone))){ 
						uni.showToast({
							title:"手机号格式错误",
							icon:"none",
							duration:2000,
						})
						return
				    }else{
						this.isDisable=true;
						getSms({phone:this.phone}).then(res=>{
							this.isDisable=false;
							this.code = res.data.list.code
							
						})
						this.isSms = false;
						var countdown = setInterval(()=>{
							this.num -= 1
						},1000)
						setTimeout(()=>{
							clearInterval(countdown)
							this.isSms = true
						},45000)
					}
					
				
			},
			login(){
				if(Number(this.userCode) === Number(this.code)&&this.phone!=""){
					if(this.userCode==""){
						uni.showToast({
							title:"验证码不能为空",
							icon:"none"
						})
					}else{
						sendLogin({phone:this.phone}).then(res=>{
							uni.showToast({
								title:res.data.msg,
								icon:"success",
								duration:2000,
								success:()=>{
									uni.setStorageSync("userInfo",res.data.list),
									timeOut("../index/index")
								}
							})
						})
					}
				}else{
					uni.showToast({
						title:"验证码错误",
						icon:"none"
					})
				}
			}
		}

	}
</script>

<style>
	/* 导入外部的样式文件 */
	/* @import url("../../common/css/index.css"); */
	.box {
		position: relative;
	}

	.row {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}

	.send {
		display: flex;
		justify-content: space-between;
	}

	.send text:nth-of-type(2) {
		color: #00BB00;
	}

	text {
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}

	input {
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
</style>
