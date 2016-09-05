//输出产品表到excel中，分仓库输出，比如老店、小西门
import { Products }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'
import { exportToExcel } from './exportToExcel'

export function exportProducts(){
	let manualSaleArr = []
	let inventoryArr = ['小西门', '老店'] // 有几个仓库名称
	inventoryArr.forEach(inventory_name=>{
		let exportFileName = `${absoluteBasePath}/server/output/products${inventory_name}.xlsx`
		// let nameReg = new RegExp(inventory_name)
		manualSaleArr = Products.find({importSource: /`${inventory_name}`/}).fetch()
		console.log(_.first(manualSaleArr))
		// let header = ['国际条码','产品名称','商品规格','库存']
		// exportToExcel({
		// 	header: header,
		// 	exportArr: manualSaleArr, 
		// 	filename: exportFileName,
		// 	uniq: true
		// })
	})

}
