import { getField } from './common'
import { Products }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'
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
  if(checkFieldsError(worksheet1)){ return false }

   // console.log(worksheet1.data[0]);
   console.log(worksheet1.data[1])
   // let canImportProduct = Products.find().count() ==0 
   let canImportProduct = true
   let updatedAt = new Date() //统一使用一个时间来进行更新，以便进行统计。
   let noSingleCount = 0
   let updateCount = 0
   let saleNoSingleCount = 0

     if ( canImportProduct ) {
      console.log("从%s更新成本价到产品表中...", impFilename)
      worksheet1.data.slice(1,worksheet1.data.length).forEach(row=>{
         let valueOfRequiredField = row[worksheet1.field(mustFields.productName)]
         if ( valueOfRequiredField ) {
           let productName = row[worksheet1.field(mustFields.productName)]
           let singleCostPrice = row[worksheet1.field(mustFields.singleCostPrice)]
           let nameReg = new RegExp(productName, 'i')
           //不仅要查找产品名称其实还应该查下型号，不过是先以产品为主，找不到才会去找型号！
           let productArr = Products.find({ "$or":[{ productName: nameReg },{model: nameReg}] })
           productArr.forEach(product=>{
              if (product) {
                if (product.singleCostPrice) {
                  console.log("excel产品名：",productName)
                  console.log("已经有价格：",
                    product.productName, 
                    product.barCode, 
                    product.singleCostPrice, 
                    singleCostPrice)
                }else {
                 Products.update(
                   { _id:product._id }, 
                   {$set:
                     { 
                       singleCostPrice: singleCostPrice,
                       updatedAt: updatedAt,
                     }
                   })
                 updateCount++
                 console.log("更新%s 单价为：%s", product.productName, singleCostPrice) 
                }
              }else {
                noSingleCount++
                console.log("产品表中找不到：", productName)
              }
           })

         }
      })
      console.log("一共更新产品表单价共：%s条", updateCount)
      // console.log("未更新产品%s个", noSingleCount)
      //更新完成后其实就应该去更新销售表中的空价格了，这样就实现了产品一修改销售表数据自动改变！
      //销售表已经有了价格不会再去修改！
      saleNoSingleCount = SaleTable.find({ singleCostPrice: {$eq:null} }).count()
      console.log("销售表中%s个产品没有单价", saleNoSingleCount);

    }
    
 }