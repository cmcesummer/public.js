$(function () {
	//隐藏向导
	$("#helpGuide").hide();
	//月度统计
	var subData;
	var currentYM = getTime();
	var currArr = currentYM.split('-');
	$("#ymTitle").text(currArr[0] + "年" + (currArr[1] < 10 ? "0" + currArr[1] : currArr[1]) + "月");
	
	$.ajax({
		url: ctx + "/financial/manualBill/getMonthlyStatistics",
		type: "post",
		data: "month=" + currArr[0] + "-" + currArr[1],
		dataType: "json", 
		success: function (data) {
			if (data.success) {
				subData = data.data;
				monthData(data);
				$("#monthOut").text("总支出：" + money(data.data.totalCost) + "元");
				$("#monthIncome").text("总收入：" + money(data.data.totalIncome) + "元");
			}
		}
	});
	
	$("#monthPrev").click(function () {
		var yearMonth = prevMonth(1);

		var ymArr = yearMonth.split('-');
		$("#ymTitle").text(ymArr[0] + "年" + (ymArr[1] < 10 ? "0" + ymArr[1] : ymArr[1]) + "月");
		$.ajax({
			url: ctx + "/financial/manualBill/getMonthlyStatistics",
			type: "post",
			data: "month=" + ymArr[0] + "-" + ymArr[1],
			dataType: "json", 
			success: function (data) {
				if (data.success) {
					subData = data.data;
					monthData(data);
					$("#monthOut").text("总支出：" + money(data.data.totalCost) + "元");
					$("#monthIncome").text("总收入：" + money(data.data.totalIncome) + "元");
				}
			}
		});
	});
	
	$("#monthNext").click(function () {
		var yearMonth = nextMonth(1);
		var ymArr = yearMonth.split('-');
		$("#ymTitle").text(ymArr[0] + "年" + (ymArr[1] < 10 ? "0" + ymArr[1] : ymArr[1]) + "月");
		$.ajax({
			url: ctx + "/financial/manualBill/getMonthlyStatistics",
			type: "post",
			data: "month=" + ymArr[0] + "-" + ymArr[1],
			dataType: "json", 
			success: function (data) {
				if (data.success) {
					subData = data.data;
					monthData(data);
					$("#monthOut").text("总支出：" + money(data.data.totalCost) + "元");
					$("#monthIncome").text("总收入：" + money(data.data.totalIncome) + "元");
				}
			}
		});
	});
	
	$(document).on('click', '.detailNum' ,function () {
		var type = $(this).siblings('.detaiType').text();
		var arrId = $(this).siblings('.detaiId').text();
		var html = "";
		if ( type == "income" ) {
			for (var i = 0; i < subData.incomeList[arrId].dailyBills.length; i++) {
				var remark;
				if (subData.incomeList[arrId].dailyBills[i].remark.length > 4) {
					remark = subData.incomeList[arrId].dailyBills[i].remark.slice(0,4) + "...";
					html += '<tr><td class="align-center">' + subData.incomeList[arrId].dailyBills[i].billDate.split(" ")[0] + '</td>'+
							 '<td class="green align-center">' + money(subData.incomeList[arrId].dailyBills[i].amount) + '</td>'+
							 '<td class="align-center"><span style="cursor:pointer" data-rel="popover" data-trigger="hover" data-placement="bottom" data-content="' + subData.incomeList[arrId].dailyBills[i].remark + '"</span>'+ remark +'</td>'+
							 '</tr>';
				} else {
					html += '<tr><td class="align-center">' + subData.incomeList[arrId].dailyBills[i].billDate.split(" ")[0] + '</td>'+
							 '<td class="green align-center">' + money(subData.incomeList[arrId].dailyBills[i].amount) + '</td>'+
							 '<td class="align-center">'+ subData.incomeList[arrId].dailyBills[i].remark + '</td>'+
							 '</tr>';
				}

			}
		} else if (type == "out") {
			for (var n = 0; n < subData.outList[arrId].dailyBills.length; n++) {
				var remark = subData.outList[arrId].dailyBills[n].remark.length > 4 ? (subData.outList[arrId].dailyBills[n].remark.slice(0,4) + "...") : subData.outList[arrId].dailyBills[n].remark;
				if (subData.outList[arrId].dailyBills[n].remark.length > 4) {
					remark = subData.outList[arrId].dailyBills[n].remark.slice(0,4) + "...";
					html += '<tr><td class="align-center">' + subData.outList[arrId].dailyBills[n].billDate.split(" ")[0] + '</td>'+
							 '<td class="red align-center">' + money(subData.outList[arrId].dailyBills[n].amount) + '</td>'+
							 '<td class="align-center"><span style="cursor:pointer" data-rel="popover" data-trigger="hover" data-placement="bottom" data-content="' + subData.outList[arrId].dailyBills[n].remark + '" title="" data-original-title="">' + remark + '</span></td>'+
							 '</tr>';
				} else {
					html += '<tr><td class="align-center">' + subData.outList[arrId].dailyBills[n].billDate.split(" ")[0] + '</td>'+
					 '<td class="red align-center">' + money(subData.outList[arrId].dailyBills[n].amount) + '</td>'+
					 '<td class="align-center">' + subData.outList[arrId].dailyBills[n].remark + '</td>'+
					 '</tr>';
				}
			}
		}
		$("#detailTbody").html(html);
		$('[data-rel=popover]').popover({container:'.layui-layer-page'});
		layer.open({
	        type: 1,
	        area: ['600px',''],
	        shadeClose: true,
	        move: false,
	        title : ['科目明细：<span id="titleInitialCost"></span>','background-color:#438EB9;color:#fff;'],
	        content: $('#detailMonthBox')
	    });
	});
	
	//月度导出
	$("#monthExport").click(function () {
		var ym = $("#ymTitle").text();
		var year = ym.slice(0, ym.indexOf("年"));
		var month = ym.slice(ym.indexOf("年") + 1, ym.indexOf("月"));
		var param = "month=" + year + "-" + month;
		window.location.href = ctx + "/financial/BillTemp/exportMonthBillList?"+param;
	});
	
	//季度统计
	var quarter = judge(currArr[1]).Arabic;
	var subDataQuarter;
	$("#quarterlyTitle").text(getTimeBucket(currArr[0], quarter));
	//读取当前数据
	$.ajax({
		url: ctx + "/financial/BillTemp/getQuarterStatistics",
		type: "post",
		data: "year=" + currArr[0] + "&quarter=" + quarter,
		dataType: "json",
		success: function (data) {
			if (data.success) {
				quarterlyData(data);
				subDataQuarter = data.data;
				$("#quarterOut").text("总支出：" + money(data.data.totalCost) + "元");
				$("#quarterIncome").text("总收入：" + money(data.data.totalIncome) + "元");
			}
		}
	});
	$("#quarterlyPrev").click(function () {
		var str = prevQuarter();
		$("#quarterlyTitle").text(str);
		$.ajax({
			url: ctx + "/financial/BillTemp/getQuarterStatistics",
			type: "post",
			data: "year=" + str.slice(0, str.indexOf('年')) + "&quarter=" + convertQuarter(str.slice(str.indexOf('第') + 1, str.indexOf('季'))),
			dataType: "json",
			success: function (data) {
				if (data.success) {
					quarterlyData(data);
					subDataQuarter = data.data;
					$("#quarterOut").text("总支出：" + money(data.data.totalCost) + "元");
					$("#quarterIncome").text("总收入：" + money(data.data.totalIncome) + "元");
				}
			}
		});
	});
	
	$("#quarterlyNext").click(function () {
		var str = nextQuarter();
		$("#quarterlyTitle").text(str);
		$.ajax({
			url: ctx + "/financial/BillTemp/getQuarterStatistics",
			type: "post",
			data: "year=" + str.slice(0, str.indexOf('年')) + "&quarter=" + convertQuarter(str.slice(str.indexOf('第') + 1, str.indexOf('季'))),
			dataType: "json",
			success: function (data) {
				if (data.success) {
					quarterlyData(data);
					subDataQuarter = data.data;
					$("#quarterOut").text("总支出：" + money(data.data.totalCost) + "元");
					$("#quarterIncome").text("总收入：" + money(data.data.totalIncome) + "元");
				}
			}
		});
	});
	
	$(document).on('click', '.detailQuarterNum' ,function () {
		var type = $(this).siblings('.detaiType').text();
		var arrId = $(this).siblings('.detaiId').text();
		var html = "";
		if ( type == "income" ) {
			for (var i = 0; i < subDataQuarter.incomeList[arrId].dailyBills.length; i++) {
				var remark;
				if (subDataQuarter.incomeList[arrId].dailyBills[i].remark.length > 4) {
					remark = subDataQuarter.incomeList[arrId].dailyBills[i].remark.slice(0,4) + "...";
					html += '<tr><td class="align-center">' + subDataQuarter.incomeList[arrId].dailyBills[i].billDate.split(" ")[0] + '</td>'+
							 '<td class="green align-center">' + money(subDataQuarter.incomeList[arrId].dailyBills[i].amount) + '</td>'+
							 '<td class="align-center"><span style="cursor:pointer" data-rel="popover" data-trigger="hover" data-placement="bottom" data-content="' + subDataQuarter.incomeList[arrId].dailyBills[i].remark + '" title="" data-original-title="">' + remark + '</span></td>'+
							 '</tr>';
				} else {
					html += '<tr><td class="align-center">' + subDataQuarter.incomeList[arrId].dailyBills[i].billDate.split(" ")[0] + '</td>'+
							 '<td class="green align-center">' + money(subDataQuarter.incomeList[arrId].dailyBills[i].amount) + '</td>'+
							 '<td class="align-center">' + subDataQuarter.incomeList[arrId].dailyBills[i].remark + '</td>'+
							 '</tr>';
				}
			}
		} else if (type == "out") {
			for (var n = 0; n < subDataQuarter.outList[arrId].dailyBills.length; n++) {
				var remark;
				if (subDataQuarter.outList[arrId].dailyBills[n].remark.length > 4) {
					remark = subDataQuarter.outList[arrId].dailyBills[n].remark.slice(0,4) + "...";
					html += '<tr><td class="align-center">' + subDataQuarter.outList[arrId].dailyBills[n].billDate.split(" ")[0] + '</td>'+
							 '<td class="red align-center">' + money(subDataQuarter.outList[arrId].dailyBills[n].amount) + '</td>'+
							 '<td class="align-center"><span style="cursor:pointer" data-rel="popover" data-trigger="hover" data-placement="bottom" data-content="' + subDataQuarter.outList[arrId].dailyBills[n].remark + '" title="" data-original-title="">' + remark + '</span></td>'+
							 '</tr>';
				} else {
					html += '<tr><td class="align-center">' + subDataQuarter.outList[arrId].dailyBills[n].billDate.split(" ")[0] + '</td>'+
							 '<td class="red align-center">' + money(subDataQuarter.outList[arrId].dailyBills[n].amount) + '</td>'+
							 '<td class="align-center">' + subDataQuarter.outList[arrId].dailyBills[n].remark + '</td>'+
							 '</tr>';
				}
			}
		}
		$("#detailQuarterTbody").html(html);
		layer.open({
	        type: 1,
	        area: ['600px',''],
	        shadeClose: true,
	        move: false,
	        title : ['科目明细：<span id="detailSub"></span>','background-color:#438EB9;color:#fff;'],
	        content: $('#detailQuarterBox')
	    });
		$('[data-rel=popover]').popover({container:$('#detailQuarterBox').parent().parent()});
	});

	//季度导出
	$("#quarterExport").click(function () {
		var str = $("#quarterlyTitle").text();
		var year = str.slice(0, str.indexOf('年'));
		var quary = convertQuarter(str.slice(str.indexOf('第') + 1, str.indexOf('季')));
		var param = "quarter=" + quary + "&year=" + year;
		window.location.href = ctx + "/financial/BillTemp/exportQuarterBillList?"+param;
	});
	
	function monthData(data) {
		var json = data.data;
		var html = "";
		if (json.incomeList != null) {
			for (var i = 0; i < json.incomeList.length; i++) {
				if (json.incomeList[i].name != undefined) {
					html += '<tr><td class="align-center">' + json.incomeList[i].name + '</td>'+
							 '<td class="green align-center">' + money(json.incomeList[i].total) + '</td>'+
							 '<td class="align-center"><span class="badge badge-important detailNum">' + json.incomeList[i].dailyBills.length + '</span>'+
							 '<span class="detaiType" style="display: none">income</span><span class="detaiId" style="display: none">'+ i +'</span>'+
							 '</td>'+
							 '</tr>';
				}
			}
		}
		if (json.outList != null) {
			for (var n = 0; n < json.outList.length; n++) {
				if (json.outList[n].name != undefined) {
					html += '<tr><td class="align-center">' + json.outList[n].name + '</td>'+
							 '<td class="red align-center">' + money(json.outList[n].total) + '</td>'+
							 '<td class="align-center"><span class="badge badge-important detailNum">' + json.outList[n].dailyBills.length + '</span>'+
							 '<span class="detaiType" style="display: none">out</span><span class="detaiId" style="display: none">'+ n +'</span>'+
							 '</td>'+
							 '</tr>';
				}		
			}
		}
		$('#monthStatsData').html(html);
	}
	
	function quarterlyData(data) {
		var json = data.data;
		var html = "";
		if (json.incomeList != null) {
			for (var i = 0; i < json.incomeList.length; i++) {
				if (json.incomeList[i].name != undefined) {
					html += '<tr><td class="align-center">' + json.incomeList[i].name + '</td>'+
							 '<td class="green align-center">' + money(json.incomeList[i].total) + '</td>'+
							 '<td class="align-center"><span class="badge badge-important detailQuarterNum">' + json.incomeList[i].dailyBills.length + '</span>'+
							 '<span class="detaiType" style="display: none">income</span><span class="detaiId" style="display: none">'+ i +'</span>'+
							 '</td>'+
							 '</tr>';
				}
			}
		}
		if (json.outList != null) {
			for (var n = 0; n < json.outList.length; n++) {
				if (json.outList[n].name != undefined) {
					html += '<tr><td class="align-center">' + json.outList[n].name + '</td>'+
							 '<td class="red align-center">' + money(json.outList[n].total) + '</td>'+
							 '<td class="align-center"><span class="badge badge-important detailQuarterNum">' + json.outList[n].dailyBills.length + '</span>'+
							 '<span class="detaiType" style="display: none">out</span><span class="detaiId" style="display: none">'+ n +'</span>'+
							 '</td>'+
							 '</tr>';
				}		
			}
		}
		$('#quarterlyStatsData').html(html);
	}


	function prevMonth(n) {
		var arr = [];
		arr = currentYM.split('-');
		if (arr[1] - n > 0) {
			currentYM = arr[0] + '-' + (arr[1]*1 - n);
		} else {
			currentYM = (arr[0] - 1) + '-' + (12 + arr[1]*1 - n);
		}
		return currentYM;
	}
	
	function nextMonth(n) {
		var arr = [];
		arr = currentYM.split('-');
		if (parseInt(arr[1]) + n <= 12) {
			currentYM = parseInt(arr[0]) + '-' + (parseInt(arr[1]) + n);
		} else {
			currentYM = (parseInt(arr[0]) + 1) + '-' + (12 - arr[1] + n);
		}
		return currentYM;
	}
	
	function prevQuarter() {
		var timeBucket = "";
		if (parseInt(quarter) - 1 > 0) {
			timeBucket = getTimeBucket(currArr[0], (parseInt(quarter) - 1));
			quarter = (parseInt(quarter) - 1);
		} else {
			timeBucket = getTimeBucket(currArr[0] - 1, 4);
			currArr[0] = currArr[0] - 1;
			quarter = 4;
		}
		return timeBucket;
	}
	
	function nextQuarter() {
		var timeBucket = "";
		if (parseInt(quarter) + 1 <= 4) {
			timeBucket = getTimeBucket(currArr[0], (parseInt(quarter) + 1));
			quarter = (parseInt(quarter) + 1);
		} else {
			timeBucket = getTimeBucket(parseInt(currArr[0]) + 1, 1);
			currArr[0] = parseInt(currArr[0]) + 1;
			quarter = 1;
		}
		return timeBucket;
	}
	
	function getTimeBucket(year, quarter) {
		var str = "";
		if (quarter == 1) {
			str = year + "年第一季度 ( " + year + "-01至" + year + "-03 )";
		} else if (quarter == 2) {
			str = year + "年第二季度 ( " + year + "-04至" + year + "-06 )";
		} else if (quarter == 3) {
			str = year + "年第三季度 ( " + year + "-07至" + year + "-09 )";
		} else if (quarter == 4) {
			str = year + "年第四季度 ( " + year + "-10至" + year + "-12 )";			
		}
		return str;
	}
	
	function judge(month) {
		var quarter = {};
		if (month >= 1 && month < 4) {
			quarter.Chinese = "一";
			quarter.Arabic = "1";
		} else if (month >= 4 && month < 7) {
			quarter.Chinese = "二";
			quarter.Arabic = "2";
		} else if (month >= 7 && month < 10) {
			quarter.Chinese = "三";
			quarter.Arabic = "3";
		} else if (month >= 10 && month <= 12) {
			quarter.Chinese = "四";
			quarter.Arabic = "4";
		}
		return quarter;
	}

	function convertQuarter(quarter) {
		var num = 0;
		if (quarter == "一") {
			num = 1;
		} else if (quarter == "二") {
			num = 2;
		} else if (quarter == "三") {
			num = 3;
		} else if (quarter == "四") {
			num = 4;
		}
		return num;
	}
	
	function getTime(){
	    var currDate = new Date();
	    var d = new Date();
	    var YM = d.getFullYear() + "-" + (d.getMonth() + 1);
	    return YM;
	 }
});