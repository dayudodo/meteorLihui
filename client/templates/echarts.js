Template.echarts.helpers({
	dataSource(){
		return `{
	                name: '利润',
	                type: 'bar',
	                data: [5000, 2000, 3600, 1000, 1234, 2456.3]
	            }`
	},
	saleSource(){
		return `{
	                name: '销量',
	                type: 'bar',
	                data: [1, 10, 5, 15, 20, 30]
	            }`
	}
})