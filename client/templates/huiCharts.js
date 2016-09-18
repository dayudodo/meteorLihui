'use strict'
import echarts from 'echarts'
import { twoDecimal } from '/imports/api/common'



Template.huiCharts.onRendered(function () {
	var template = this;
		Meteor.call("everyMonthProfit",	function(err,result){
		if(err){ console.log(err); }
		else{
			var myChart = echarts.init(template.find('#profit'));
			var dataSourceArr = (_.pluck(result,1)).map(item=>twoDecimal(item))
			var monthNameArr = _.pluck(result,0)
			var money = 0
			dataSourceArr.forEach(item=>{ money= money+ item})
			//计算月平均利润并保存在averagePerMonth中
			Session.set('averagePerMonth', twoDecimal(money/monthNameArr.length) )

			var option = {
				color:['#3398DB'],
			    title: {
			        text: '月利润表'
			    },
			    tooltip: {},
			    legend: {
			        data:['利润']
			    },
			    calculable : true,
			    xAxis: {
			        data: monthNameArr
			    },
			    yAxis: {},
			    series: {
		                name: '利润',
		                type: 'bar',
		                data: dataSourceArr
		            }
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			window.onresize = myChart.resize
			myChart.on('click', function (params) {
			    // 改变当前月份
			    Session.set('month', _.pluck(result,0)[params.dataIndex])
			    Session.set('currentProfit', params.data)
			    //显示当月利润最高的10项，其余的可以单独点击进行查看当月利润表
			    Meteor.call('s_profitTop10', params.dataIndex, function(err, top10Result){
			    	// console.log(result)
			    	Session.set('profitTop10', top10Result)
			    })
			});
		}
	})

})


Template.huiCharts.helpers({
	saleSource(){
		return `{
	                name: '销量',
	                type: 'bar',
	                data: [1, 10, 5, 15, 20, 30]
	            }`
	},
	profitTop10(){
		return Session.get('profitTop10')
	},
	month(){
		return Session.get('month')
	},
	currentProfit(){
		return Session.get('currentProfit')
	},
	averagePerMonth(){
		return Session.get('averagePerMonth')
	},

})

