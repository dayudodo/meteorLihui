//检测条码相同而名称不同的销售记录
import { SaleTable } from '/imports/api/sale_table'
import { exportToExcel } from './exportToExcel'

export function checkSameBarCode(){
	let outputArr = []
	SaleTable.find().forEach(row=>{
		let resultArr = SaleTable.find({ barCode: row.barCode }).fetch()
		let result = _.uniq(resultArr, false, item=>item.productName)
		// console.log(resultArr)
		if (result.length > 1) {
			console.log("条码同商品名不同：", result)

			_.each(result, function(r){
				outputArr.push([r.barCode, r.productName, r.model, r.importSource])
				// outputArr = outputArr.concat([[r.barCode, r.productName, r.importSource]])
			})
		}
	})
	if (outputArr.length ==0 ) {
		console.log("条码与商品名称正常")
	}else {
		let header = ['国际条码','商品名称','商品规格','导入来源']
		let filename = `${absoluteBasePath}/server/output/checkSameBarCode.xlsx`
		exportToExcel({
			header: header,
			exportArr: outputArr, 
			filename: filename,
		})?
		console.log("条码同商品名不同导出到：", filename) : null
	}
}
