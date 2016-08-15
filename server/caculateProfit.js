//计算利润

// import { Products }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'

function twoDecimal(num){
	return Math.round(num*100)/100
}
export function caculateProfit(){
	// let count = 0
	let updatedAt = new Date()
	SaleTable.find().forEach(row=>{
		//销售单价
		// let saleSingle = row.salesAmount / row.salesQuantity
		//利润是啥呢？ 销售价格的13%归超市和人员所有，减去成本才是自己的利润
		//销售价格-销售价格*13%-单台成本价*销售数量
		//如果有单价才会去计算，不然一个空值可能会出错。
		if (row.singleCostPrice) {
			let profit = row.salesAmount*(1-0.13) - row.singleCostPrice * row.salesQuantity
			let saleSingle = row.salesAmount / row.salesQuantity
			console.log(row.productName, row.barCode, row.profit, twoDecimal(profit))
			// console.log("%s %s %s 计算利润%s",row.productName, row.barCode, row.profit, twoDecimal(profit))
			if (profit < 0) {
				console.log("错误：成本%s>售价%s", row.singleCostPrice, saleSingle, row.importSource )
				return false;
			};
			SaleTable.update({_id: row._id},
			{$set:
				{
					profit: profit,
					updatedAt:  updatedAt
				}
			})
		}
	})
	console.log("还有%s个没有利润", SaleTable.find({ profit:{$eq:null} }).count() )
}

