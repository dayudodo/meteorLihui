import { Products }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'

export function updateSaleNoName(){
	let count = 0
	let noNames = SaleTable.find({ productName:{$eq:null} })
	console.log("需要更新%s个空名称", noNames.count())
	noNames.forEach(row=>{
		let product = Products.findOne({_id: row.productId})
		if (!product) {
			console.log("找不到产品%s，未导入!", row.productId, row.productName)
			return false;
		}
		if (!product.productName) {
			console.log("没有产品名称：", product.productId)
		}else{
			count++
			SaleTable.update({_id: row._id}, {$set:{productName: product.productName}})
		}
	})
	console.log("共更新销售表空名称%s个", count)
}