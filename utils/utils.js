export const timeOut =	function(url){
	let t = setTimeout(()=>{
		uni.reLaunch({
			url:url
		}),
		clearTimeout(t)
	},2000)
}