// 计算所有产品的库存，并保存在产品表中？

import { Products }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'

export function caculateInventory(){
	Products.find().forEach(row=>{
		let allSales = SaleTable.find({barCode: row.barCode})
		console.log(allSales.count())
		return false
	})
}