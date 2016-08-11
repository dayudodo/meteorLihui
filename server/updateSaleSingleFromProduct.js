import { Products }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'

export function updateSaleSingleFromProduct(){
	let saleNoSingles = SaleTable.find({ singleCostPrice: {$eq:null} })
	let updateCount = 0
	let noCount = 0
	let updatedAt = new Date()

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
			console.log("单价要手填:", row.barCode, row.productName)
		}
	})	
	console.log("更新销售表单价%s条", updateCount)
	console.log("单价要手填%s条", noCount)
	return updateCount;
}

