export const baseUrl = "http://localhost:3000"

//获取banner图
export const getBanner = () => {
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + "/api/getbanner",
			success:res=>{
				resolve(res)
			},fail:res=>{
				reject(res)
			}
		})
	})
}
//获取首页分类
export const getCate = () => {
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + "/api/getcate",
			success:res=>{
				resolve(res)
			},fail:res=>{
				reject(res)
			}
		})
	})
}
//获取首页全部分类
export const getCates = () => {
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + "/api/getcates",
			success:res=>{
				resolve(res)
			},fail:res=>{
				reject(res)
			}
		})
	})
}
//获取首页商品
export const getindexGoods = () => {
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + "/api/getindexgoods",
			success:res=>{
				resolve(res)
			},fail:res=>{
				reject(res)
			}
		})
	})
}
//获取第一分类
export const getcategoods = (params) => {
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + "/api/getcategoods",
			data:params,
			success:res=>{
				resolve(res)
			},fail:res=>{
				reject(res)
			}
		})
	})
}
//获取一级分类下的所有商品分页

export const getcategoodPage = (params) => {
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + "/api/getcategoodPage",
			data:params,
			success:res=>{
				resolve(res)
			},fail:res=>{
				reject(res)
			}
		})
	})
}
//首页获取限时秒杀
export const getSeckill = () => {
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + "/api/getseckill",
			success:res=>{
				resolve(res)
			},fail:res=>{
				reject(res)
			}
		})
	})
}
//获取一个商品信息
export const getGoodsinfo = (data={})=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + "/api/getgoodsinfo",
			data,
			success:res=>{
				resolve(res)
			},fail:res=>{
				reject(res)
			}
		})
	})
}
//获取购物车列表
export const cartList = (data={})=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + "/api/cartlist",
			data,
			header:{
				authorization:uni.getStorageSync("userInfo").token
			},
			success:res=>{
				resolve(res)
			},fail:res=>{
				reject(res)
			}
		})
	})
}
//添加到购物车
export const cartAdd = (data={})=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + "/api/cartadd",
			data,
			header:{
				authorization:uni.getStorageSync("userInfo").token
			},
			success:res=>{
				resolve(res)
			},fail:res=>{
				reject(res)
			}
		})
	})
}
//修改购物车
export const cartEdit = (data={})=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + "/api/cartedit",
			data,
			header:{
				authorization:uni.getStorageSync("userInfo").token
			},
			success:res=>{
				resolve(res)
			},fail:res=>{
				reject(res)
			}
		})
	})
}
//删除购物车
export const cartDelete = (data={})=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + "/api/cartdelete",
			data,
			header:{
				authorization:uni.getStorageSync("userInfo").token
			},
			success:res=>{
				resolve(res)
			},fail:res=>{
				reject(res)
			}
		})
	})
}
//发送验证码
export const getSms = (data={})=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + "/api/sms",
			data,
			success:res=>{
				resolve(res)
			},fail:res=>{
				reject(res)
			}
		})
	})
}
//发送登录
export const sendLogin = (data={})=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + "/api/wxlogin",
			data,
			success:res=>{
				resolve(res)
			},fail:res=>{
				reject(res)
			}
		})
	})
}
//提交订单
export const orderAdd = (params,idstr)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + "/api/orderadd",
			data:{
				params:params,
				idstr
			},
			header:{
				authorization:uni.getStorageSync("userInfo").token
			},
			success:res=>{
				resolve(res)
			},fail:res=>{
				reject(res)
			}
		})
	})
}
//验证token
export const checktoken = ()=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + "/api/checktoken",
			header:{
				authorization:uni.getStorageSync("userInfo").token
			},
			success:res=>{
				resolve(res)
			},fail:res=>{
				reject(res)
			}
		})
	})
}
//查看订单
export const orders = (data)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + "/api/orders",
			data,
			header:{
				authorization:uni.getStorageSync("userInfo").token
			},
			success:res=>{
				resolve(res)
			},fail:res=>{
				reject(res)
			}
		})
	})
}
//搜索商品
export const search = (data)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + "/api/search",
			data,
			success:res=>{
				resolve(res)
			},fail:res=>{
				reject(res)
			}
		})
	})
}