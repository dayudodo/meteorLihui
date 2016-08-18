import echarts from 'echarts'

Template.huiCharts.onRendered(function () {
	var template = this;
		Meteor.call("everyMonthProfit",	function(err,result){
		if(err){ console.log(err); }
		else{
			var myChart = echarts.init(template.find('#profit'));
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
			        data: _.pluck(result,0)
			    },
			    yAxis: {},
			    series: {
		                name: '利润',
		                type: 'bar',
		                data: _.pluck(result,1)
		            }
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			window.onresize = myChart.resize
			myChart.on('click', function (params) {
			    // console.log(params.dataIndex)
			    Session.set('month', _.pluck(result,0)[params.dataIndex])
			    //显示当月利润最高的10项，其余的可以单独点击进行查看当月利润表
			    Meteor.call('profitTop10', params.dataIndex, function(err, top10Result){
			    	// console.log(result)
			    	Session.set('top10', top10Result)
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
	top10(){
		return Session.get('top10')
	},
	month(){
		return Session.get('month')
	}
})