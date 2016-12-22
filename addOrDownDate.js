var time = new Date();
function changeDate(date, day) {
	var reg = /^\d{4}-\d{2}-\d{2}$/,
		newDate,   
		changeNewDate, //改变之后的date（未转换）
		y, m, d;
	if(reg.test(date)) { //传入 yyyy-mm-dd
		newDate = new Date(date.replace(/-/g, '/'));
		changeNewDate = new Date(newDate.setDate(newDate.getDate() + parseInt(day)));
	} else { // 直接传入 new Date();
		changeNewDate = new Date( date.setDate( date.getDate() + parseInt(day) ) ); // setDate()是增减日期后转换成的毫秒数 
	}
	y = changeNewDate.getFullYear();
	m = changeNewDate.getMonth() > 8 ? changeNewDate.getMonth() + 1 : '0' + (changeNewDate.getMonth() + 1);
	d = changeNewDate.getDate() > 9 ? changeNewDate.getDate() : '0' + changeNewDate.getDate();
	return y + '-' + m + '-' + d
}

console.log(changeDate('2016-12-14', -1))

// setDate(), setMonth() 比较方便，不用考虑在临界值的时候的情况
// 要注意 setDate 或者 setMonth 之后返回的是设置好的 毫秒数， 再用new Date 转换成标准格式
// 
// 