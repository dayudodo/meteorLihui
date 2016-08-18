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
	}
  })
});


Template.huiCharts.helpers({
	saleSource(){
		return `{
	                name: '销量',
	                type: 'bar',
	                data: [1, 10, 5, 15, 20, 30]
	            }`
	}
})