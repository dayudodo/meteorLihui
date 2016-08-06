import { Meteor } from 'meteor/meteor';
import { Products, nameTable }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'
import { importFileTable } from '/imports/api/importFile_table'
import xlsx from 'node-xlsx'
import path from 'path'
import fs from 'fs'
import md5 from 'blueimp-md5'

var getField = function(str){
    if (!_.include(_.first(this.data), str) ) {
      return undefined
    }else{
      return _.first(this.data).indexOf(str)
    }
}


function importToProducts(impFilename){
  // var fileName = '/js_stack/meteorLihui/server/三禾元月products.xls' //初始化时导入的产品表
  var excel = xlsx.parse(impFilename);
  var worksheet1 = excel[0]
  var requireField = '国际条码' //在从excel中读取值的时候，此值必须存在而且满足条件
  worksheet1.field= getField
   // console.log(worksheet1.data[0]);
   // 南漳买多购发来的excel表格，字段名称如下：
   // '序号', '国际条码','商品名称','商品规格','销售单位','销售数量','销售金额','单台成本价','总成本价','提成','利润's
   console.log(worksheet1.data[1])
   // console.log(worksheet1.data[1][field('单台成本价')])
   let canImportProduct = Products.find().count() ==0
   var count = 0
     if ( true ) {
      console.log("开始导入%s到产品表中...", impFilename)
       worksheet1.data.slice(1,worksheet1.data.length).forEach(row=>{
        let reg= /\d+/
        let valueOfRequiredField = row[worksheet1.field(requireField)]
        let isAllNumber= reg.test(valueOfRequiredField)
        if ( isAllNumber ) {
            let obj = new Object();
            for (var key in nameTable) {
               //中文字段名称是个数组，所以需要对每一个进行检测，表里面是否有这个中文字段
               //如果excel表里面有这个中文字段，才会取值
              let ArrayChinese = nameTable[key]
              for(var chinese of ArrayChinese) {
                 //判断一下obj[key]的值，是因为头一次的循环可能已经取到值了，后面一个其实就不用取值了。
                if (worksheet1.field(chinese) && obj[key]==undefined) {
                  obj[key]=row[worksheet1.field(chinese)]
                }
              }
            }
            obj["createdAt"] = new Date()
            let result = Products.insert(obj, function(err, result) {
              if (err) { 
                console.log(valueOfRequiredField)
                console.log(err.message) 
               }else {
                // console.log(result)
                ++count
                console.log("第%s条%s成功导入到产品表",count, valueOfRequiredField)
               }
            })
            // if (result) { ++count; }
        }
       })
    }
    
 }// end of importToProducts

function importToSaleTable(impExcel){
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
  var impFilename = impExcel
  var sailTime = new Date('2016-01-01')
  var onlyFilename = path.basename(impFilename) 
  var importExcel = xlsx.parse(impFilename)
  var importSheet1 = importExcel[0]
  var requireField = "国际条码"
  importSheet1.field = getField

  var checkFieldsError = function(){
    let FieldArray = []
    for(var key in mustFields){
      let chinese = mustFields[key]
      if ( !importSheet1.field(chinese) ) {
        FieldArray.push(chinese)
      }
    }
    if (FieldArray.length >0) {
      console.log("%s缺少必须字段：%s", onlyFilename, FieldArray)
      return true;
    }
  }
  //检查导入文件excel中必须字段
  if(checkFieldsError()){ return false }


  var content = fs.readFileSync(impFilename)
  var md5Code = md5(content)
  // console.log(md5Code)


  
  if (importFileTable.findOne({md5: md5Code})) {
    console.log('该销售文件已经导入过：' + onlyFilename)
    return false
  }else{
    importFileTable.insert({fileName: onlyFilename, md5: md5Code},  function(err,result){
        if(err){ console.log(err); }
    })
  }



  // console.log(importSheet1.data[0]); //打印头信息，看得到的数据是否正确！
  // console.log(importSheet1.data[1]); //打印头信息，看得到的数据是否正确！

  

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
              console.log(barCode)
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
                if (singleCostPrice) {
                  obj["singleCostPrice"]  = singleCostPrice
                  Products.update({_id: product._id}, {$set:{singleCostPrice: singleCostPrice}})
                }
                if (product["singleCostPrice"]) {
                  obj["singleCostPrice"] = product["singleCostPrice"]
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
        let result = SaleTable.insert(item, (err, result)=> {
          if (err) { 
            console.log(err) 
          }
        })
        if (result) { count++ }
      })
      console.log("一共导入销售记录:", count)
    }
  }// end of importToSaleTable

Meteor.startup(() => {
  //从excel中导入相关的数据到mongoDB中
  var impFileArray = [
     '/js_stack/meteorLihui/server/老店二月份销量.xls'
    ,'/js_stack/meteorLihui/server/三和老店一月份销量.xls'
    ,'/js_stack/meteorLihui/server/三和老店一月份销量.xls'
    ,'/js_stack/meteorLihui/server/三禾三月.xls'
    ,'/js_stack/meteorLihui/server/2016.6月份老店销量.xls'
    ,'/js_stack/meteorLihui/server/三和4月份小西门销量.xls'
    ,'/js_stack/meteorLihui/server/三和5月份小西门销量.xls'

  ]
  // importToProducts(impFileArray[0]);

  importToSaleTable(impFileArray[6]);

  Meteor.publish('products', function tasksPublication() {
    return Products.find();
  });
  Meteor.publish('saletable', function () {
    return SaleTable.find();
  });
  
  Products.allow({
    insert: function(){
      return true;
    },
    update: function(){
      return true;
    },
    remove: function(){
      return true;
    }
  });
  SaleTable.allow({
    insert: function(){
      return true;
    },
    update: function(){
      return true;
    },
    remove: function(){
      return true;
    }
  });

});

