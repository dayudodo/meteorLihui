//检测条码相同而名称不同的销售记录
import { SaleTable } from '/imports/api/sale_table'

export function checkSameBarCode(){
	SaleTable.find().forEach(row=>{
		let resultArr = SaleTable.find({ barCode: row.barCode }).fetch()
		let result = _.uniq(resultArr, false, item=>item.productName)
		// console.log(resultArr)
		if (result.length > 1) {
			console.log("条码同商品名不同：", result)
		};
	})
}
