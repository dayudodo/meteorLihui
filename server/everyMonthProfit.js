//计算每个月的利润
import { SaleTable } from '/imports/api/sale_table'
//todo 愚蠢的每一个月，完全可以用js里面日期的函数算出来！
const monthRange = [
	["2016-01-01","2016-01-31","一月"],
	["2016-02-01","2016-02-30","二月"],
	["2016-03-01","2016-03-31","三月"],
	["2016-04-01","2016-04-30","四月"],
	["2016-05-01","2016-05-31","五月"],
	["2016-06-01","2016-06-30","六月"],
	["2016-07-01","2016-07-31","七月"],
]

export function everyMonthProfit(){

	let result = []
	monthRange.forEach(month=>{
		let allProfit = 0
		let allSales = SaleTable.find(
		{
			sailTime:
			{
					"$gte":new Date(month[0]),
					"$lte":new Date(month[1])
			}
		}).fetch()
		allSales.forEach(sale=>{
			if (sale.profit) {
				allProfit = allProfit + sale.profit
			}else{
				console.log("利润为空%s,%s",sale.barCode, sale.productName)
			}

		})
		// console.log(month[2], allSales.length, allProfit)
		result.push([month[2], allProfit])
	})
	// console.log(result)
	return result
}

//为啥写s_呢？表明这是个服务器的方法，也许是个好前缀，或者应该写成server_profitTop10
export function s_profitTop10(index){
	let month = monthRange[index]
	let allSales = SaleTable.find(
	{
		sailTime:
		{
				"$gte":new Date(month[0]),
				"$lte":new Date(month[1])
		}
	},
	{
		sort:{profit: -1},
		limit: 10
	}).fetch()
	// console.log(allSales)
	return allSales
}
