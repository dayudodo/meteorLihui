import { Products }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'
import { exportToExcel } from './exportToExcel'

export function updateSaleSingleFromProduct(){
	let saleNoSingles = SaleTable.find({ singleCostPrice: {$eq:null} })
	let updateCount = 0
	let noCount = 0
	let updatedAt = new Date()
	let manualSaleArr = []
	let exportFileName = '/js_stack/meteorLihui/server/output/manualSale.xlsx'

	saleNoSingles.forEach(row=>{
		let product = Products.findOne({_id: row.productId})
		if (!product) {
			console.log("找不到产品%s，未导入!", row.productId, row.productName)
			return false;
		}
		if (product.singleCostPrice) {
			updateCount++
			SaleTable.update(
				{ _id:row._id }, 
				{$set:
					{ 
						singleCostPrice: product.singleCostPrice,
						updatedAt: updatedAt
					}
				},	function(err){
						if(err){ console.log(err); }
				})
		}else {
			noCount++
			manualSaleArr.push([row.barCode, 
								row.productName, 
								row.singleCostPrice,
								row.salesAmount/row.salesQuantity
								])
			console.log("单价要手填:", row.barCode, row.productName)
		}
	})	
	console.log("更新销售表单价%s条", updateCount)
	if (manualSaleArr.length == 0) {
		console.log("不需要手填单价")
		return false
	}
	
	console.log("单价要手填%s条", noCount)
	console.log("导出手填单价表到", exportFileName)
	let header = ['国际条码','产品名称','单台成本价','销售单价']
	exportToExcel({
		header: header,
		exportArr: manualSaleArr, 
		filename: exportFileName,
		uniq: true
	})
	return updateCount;
}

