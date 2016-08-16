import { getField } from './common'
import { importToProducts } from './importToProducts'
import { Products }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'

import xlsx from 'node-xlsx'
import path from 'path'
import fs from 'fs'
// import md5 from 'blueimp-md5'
var crypto = require('crypto');
function md5 (text) {
  return crypto.createHash('md5').update(text,'utf8').digest('hex');
}

export function importToSaleTable(impExcel){
  const saleArray = {
      barCode:        "国际条码"
    , productName:    "商品名称"
    , salesQuantity:  "销售数量"
    , salesAmount:    "销售金额"
    , singleCostPrice:  "单台成本价"
    , totalCostPrice:   "总成本价"
    , royalty:      "提成"
    , marketRoyalty:  "超市提成"
    , profit:       "利润"
  }
  //销售表里面必须有以下字段
  const mustFields = {
      barCode:        "国际条码"
    , productName:    "商品名称"
    , salesQuantity:  "销售数量"
    , salesAmount:    "销售金额"
  }
  //需要导入的文件列表，应该保存一项内部的文件列表啥的！
  var impFilename = impExcel[0]
  var sailTime = new Date(impExcel[1])
  var onlyFilename = path.basename(impFilename) 
  var importExcel = xlsx.parse(impFilename)
  var importSheet1 = importExcel[0]
  var requireField = "国际条码"
  importSheet1.field = getField

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
  //检查导入文件excel中必须字段
  if(checkFieldsError(importSheet1)){ return false; }

  // 检查md5, 如果没有导入过就保存下记录
  // 用户应该可以撤销这次导入，以便重新导入！
  // 那么应该保存一个md5码到产品表的备注中么？
  var content = fs.readFileSync(impFilename)
  var md5Code = md5(content)
  if (importFileTable.findOne({md5: md5Code})) {
    console.log('该销售文件已经导入过：' + onlyFilename)
    return false
  }else{
    importFileTable.insert({fileName: onlyFilename, md5: md5Code},  function(err){
        if(err){ console.log(err); }
    })
  }

  console.log('开始导入销售文件:', onlyFilename);
  var saleObjArray=[]
  //如果销售表不为空，才开始导入，并且一次性导入N多文件。
  // let canImport = SaleTable.find().count()==0
  let canImport = true
  let isFileAlreadyImport = true //是否检查文件的md5码，以免重复导入
    if (isFileAlreadyImport && canImport) {
         importSheet1.data.slice(1,importSheet1.data.length).forEach(row=>{
           let reg= /\d+/
           let isAllNumber= reg.test(row[importSheet1.field(requireField)])
           if ( isAllNumber ) {
              let obj = new Object();
              //中文字段名称是个数组，所以需要对每一个进行检测，表里面是否有这个中文字段
              //如果excel表里面有这个中文字段，才会取值
              let barCode = row[importSheet1.field(saleArray.barCode)]
              let productName = row[importSheet1.field(saleArray.productName)]
              let singleCostPrice = row[importSheet1.field(saleArray.singleCostPrice)]
              let salesQuantity = row[importSheet1.field(saleArray.salesQuantity)]
              let salesAmount = row[importSheet1.field(saleArray.salesAmount)]
              let totalCostPrice = row[importSheet1.field(saleArray.totalCostPrice)]
              let marketRoyalty = row[importSheet1.field(saleArray.marketRoyalty)]
              let profit = row[importSheet1.field(saleArray.profit)]
              // console.log(barCode)
              //如果销售数量为0或者销售金额为0，就没必要保存了，有些表其实数量真的是0！
              if (salesQuantity !=0) {
                let product = Products.findOne({"barCode": `${barCode}`})
                if (!product) {
                  //找不到产品其实应该新建该产品，并保存相关信息到产品表中
                  console.log(`找不到产品：${barCode}，正导入到产品表中`)
                  // 如果产品不存在，就使用导入产品列表功能
                  importToProducts( impFilename )
                  // throw new Error(message)
                }
                //导入之后还找不到说明有啥其它问题
                product = Products.findOne({"barCode": `${barCode}`})
                if (!product) { throw new Error('从销售文件导入产品表失败！')}

                obj["productId"] = product["_id"]
                // 销售表里面的单台成本价就是产品表里面的
                // 如果产品 表里没有成本价，就看销售表里面有没有，如果有就添加到产品表中的单价
                //应该检查导入时产品表里面的单价与销售里面的单价是否一致
                if (singleCostPrice) {
                  obj["singleCostPrice"]  = singleCostPrice
                  Products.update({_id: product._id}, {$set:{singleCostPrice: singleCostPrice}})
                }
                let pSingle = product["singleCostPrice"]
                if (pSingle) {
                  obj["singleCostPrice"] = pSingle
                }
                if (singleCostPrice && pSingle) {
                  if (singleCostPrice != pSingle) {
                    console.log("成本价不同，销售表：%s 产品表：%s", singleCostPrice, pSingle)
                  }
                }
                obj["barCode"] = barCode
                obj["productName"] = productName
                obj["salesQuantity"] = salesQuantity
                obj["salesAmount"] = salesAmount
                obj["totalCostPrice"] = totalCostPrice
                obj["profit"] = profit
                obj["marketRoyalty"] = marketRoyalty
                obj["sailerName"] = "李辉"
                obj["importSource"] = onlyFilename //保存个备注信息？
                obj["sailTime"] = sailTime
                saleObjArray.push(obj)

              }
           }
         })
      console.log("saleObjArray.length:",saleObjArray.length)
      var count = 0
      saleObjArray.forEach(function(item){
        let result = SaleTable.insert(item, (err)=> {
          if (err) { 
            console.log(err) 
          }
        })
        if (result) { count++ }
      })
      //输出最后一个纪录看看得到的是否正确，其实应该输出第一个吧？
      console.log(_.last(saleObjArray)) 
      console.log("一共导入销售记录:", count)
    }
  }// end of importToSaleTable