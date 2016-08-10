import { getField } from './common'
import { Products }  from '/imports/api/products'
import xlsx from 'node-xlsx'
import path from 'path'
// import fs from 'fs'
// import md5 from 'blueimp-md5'

export function updateProductSingle(impFilename){
  //产品中必须有的字段
  const mustFields = {
      productName:   "型号"
    , singleCostPrice:    "成本价"
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
   console.log(worksheet1.data[1])
   // let canImportProduct = Products.find().count() ==0 
   let canImportProduct = true
   let count = 0
   let updatedAt = new Date() //统一使用一个时间来进行更新，以便进行统计。
     if ( canImportProduct ) {
      console.log("从%s更新成本价到产品表中...", impFilename)
       worksheet1.data.slice(1,worksheet1.data.length).forEach(row=>{
          let valueOfRequiredField = row[worksheet1.field(mustFields.productName)]
          if ( valueOfRequiredField ) {
            let productName = row[worksheet1.field(mustFields.productName)]
            let singleCostPrice = row[worksheet1.field(mustFields.singleCostPrice)]
            let nameReg = new RegExp(productName, 'i')
            //不仅要查找产品名称其实还应该查下型号，不过是先以产品为主，找不到找会去找型号！
            let product = Products.findOne({ "$or":[{ productName: nameReg },{model: nameReg}] })
            if (product) {
              if (product.singleCostPrice) {
                console.log("已经有价格：",
                  product.productName, 
                  product.barCode, 
                  product.singleCostPrice, 
                  singleCostPrice)
              }else {
                console.log("更新%s 单价为：%s", product.productName, singleCostPrice) 
              }
            }else {
              count++
              console.log("产品表中找不到：", productName)
            }
          }
       })
       console.log("还有%s个产品没有单价", count)
    }
    
 }