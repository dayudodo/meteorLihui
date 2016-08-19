//检查相同名称成本价不同
import { Products }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'

export function checkSameNameSingle(){
	let count = 0
	Products.find().forEach(row=>{
		// console.log(row)
		//想要操作还是得用数组！
		let sameRows = SaleTable.find({barCode: row.barCode}).fetch()

		//有些产品可能并没有销售！
		if (sameRows == null) {
			console.log("此产品无销售：",row.barCode, row.productName)
			// return false
		}
		// console.log(sameRows)
		let result = _.uniq(sameRows, false, item=>item.singleCostPrice)
		if (result.length > 1) {
			count ++
			console.log(
				row.barCode, 
				row.productName, 
				_.pluck(result,'singleCostPrice'), 
				_.pluck(sameRows,'importSource'))
		}
	})
	if (count == 0) {
		console.log("销售表中成本价都是统一的")
	}
}