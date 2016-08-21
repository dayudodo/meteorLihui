import { getField } from '/imports/api/common'
import { Products, ProductFields }  from '/imports/api/products'
import xlsx from 'node-xlsx'
import path from 'path'
// import fs from 'fs'
// import md5 from 'blueimp-md5'

export function importToProducts(impFilename){
  //产品中必须有的字段
  const mustFields = {
      barCode:        "国际条码"
    , productName:    "商品名称"
  }
  // var fileName = '/js_stack/meteorLihui/server/三禾元月products.xls' //初始化时导入的产品表
  var excel = xlsx.parse(impFilename);
  var onlyFilename = path.basename(impFilename) 
  var worksheet1 = excel[0]
  worksheet1.field= getField

  var checkFieldsError = function(worksheet1){
    let FieldArray = []
    for(var key in mustFields){
      let chinese = mustFields[key]
      if ( !worksheet1.field(chinese) ) {
        FieldArray.push(chinese)
      }
    }
    if (FieldArray.length >0) {
      console.log("%s缺少必须字段：%s", onlyFilename, FieldArray)
      return true;
    }
  }
  if(checkFieldsError(worksheet1)){ return false; }

   // console.log(worksheet1.data[0]);
   // 南漳买多购发来的excel表格，字段名称如下：
   // '序号', '国际条码','商品名称','商品规格','销售单位','销售数量','销售金额','单台成本价','总成本价','提成','利润's
   console.log(worksheet1.data[1])
   // console.log(worksheet1.data[1][field('单台成本价')])
   // let canImportProduct = Products.find().count() ==0 
   let canImportProduct = true
   var count = 0
     if ( canImportProduct ) {
      console.log("开始导入%s到产品表中...", impFilename)
       worksheet1.data.slice(1,worksheet1.data.length).forEach(row=>{
        let reg= /\d+/
        let valueOfRequiredField = row[worksheet1.field(mustFields.barCode)]
        let isAllNumber= reg.test(valueOfRequiredField)
        if ( isAllNumber ) {
            let obj = new Object();
            for (var key in ProductFields) {
               //中文字段名称是个数组，所以需要对每一个进行检测，表里面是否有这个中文字段
               //如果excel表里面有这个中文字段，才会取值
              let ArrayChinese = ProductFields[key]
              for(var chinese of ArrayChinese) {
                 //判断一下obj[key]的值，是因为头一次的循环可能已经取到值了，后面一个其实就不用取值了。
                if (worksheet1.field(chinese) && obj[key]==undefined) {
                  obj[key]=row[worksheet1.field(chinese)]
                }
              }
            }
            obj["createdAt"] = new Date()
            let result = Products.insert(obj, function(err) {
              if (err) { 
                console.log(valueOfRequiredField)
                console.log(err.message) 
               }else {
                ++count
                console.log("第%s条%s成功导入到产品表",count, valueOfRequiredField)
               }
            })
            // if (result) { ++count; }
        }
       })
    }
    
 }// end of importToProducts