function add0(m) {
	return m < 10 ? '0' + m : m
}

function format(endTime) {
	//date是整数，否则要parseInt转换
	let nowTime = new Date().getTime()
	var date = endTime - nowTime
	date = Math.floor(date/1000)
	var h = Math.floor(date/3600);
	var mm = Math.floor(date%3600/60);
	var s = date%3600%60;
	 var times = add0(h) + ':' + add0(mm) + ':' + add0(s);
	 return times
}
module.exports = {
	format: format,
}
