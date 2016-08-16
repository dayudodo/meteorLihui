import fs from 'fs'
import xlsx from 'node-xlsx'


/*将数据导出为excel文件
	let exportArr=[
		{
			barCode:13,
			productName:'abc'
		},
		{
			barCode:14,
			productName:'super'
		}
	]
*/

export function exportToExcel({header, exportArr, filename, uniq=true}){
	let exportFlatten = []
	if (_.isEmpty(exportArr)) {
		console.log("exportArr不能为空")
		return false
	}
	if (header.length!=_.first(exportArr).length) {
		console.log('标题字段数量应与数据一致')
		// return false
	}
	exportFlatten.push(header)
	exportArr.forEach(item=>{
		exportFlatten.push(_.values(item))
	})
	//去掉重复的元素，根据第一个：国际条码来进行唯一性判断
	if (uniq) {
		exportFlatten = _.uniq(exportFlatten, false, item=>item[0])
	}
	var buffer = xlsx.build([{name: "sheet1", data: exportFlatten}]); // Returns a buffer
	fs.writeFileSync(filename, buffer, 'binary');
}
