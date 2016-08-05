import { Meteor } from 'meteor/meteor';
import { Products, nameTable }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'
import xlsx from 'node-xlsx'
import path from 'path'

var getField = function(importExcel, str){
  //取得第一张表的第一行数据，看里面有没有包括str
  if (!_.include(_.first(importExcel[0].data), str) ) {
    return undefined
  }else{
    return _.first(importExcel[0].data).indexOf(str)
  }
}

var excel = xlsx.parse('/js_stack/meteorLihui/server/products.xls');
var field= function(str){
  getField(excel,str)
}
var worksheet1 = excel[0]

var requireField = '国际条码' //在从excel中读取值的时候，此值必须存在而且满足条件
 // var content = worksheet1.data;
 // console.log(worksheet1)
 // console.log(worksheet1.data[0]);
 // 南漳买多购发来的excel表格，字段名称如下：
 // '序号', '国际条码','商品名称','商品规格','销售单位','销售数量','销售金额','单台成本价','总成本价','提成','利润's
 // console.log(worksheet1.data[1])
 // console.log(worksheet1.data[1][field('国际条码')])
 // console.log(worksheet1.data[1][field('商品名称')])
 // console.log(worksheet1.data[1][field('单台成本价')])

Meteor.startup(() => {
  // code to run on server at startup
  // var Products = new Mongo.collection('Products')
  //从excel中导入相关的数据到mongoDB中
  if (Products.find().count() ==0 ) {
  	 worksheet1.data.slice(1,worksheet1.data.length).forEach(row=>{
  		 let reg= /\d+/
       let isAllNumber= reg.test(row[field(requireField)])
  		 if ( isAllNumber ) {
  				let obj = new Object();
  				for (var key in nameTable) {
            //中文字段名称是个数组，所以需要对每一个进行检测，表里面是否有这个中文字段
            //如果excel表里面有这个中文字段，才会取值
  					let ArrayChinese = nameTable[key]
  					for(var chinese of ArrayChinese) {
              //判断一下obj[key]的值，是因为头一次的循环可能已经取到值了，后面一个其实就不用取值了。
  						if (field(chinese) && obj[key]==undefined) {
  							obj[key]=row[field(chinese)]
  						}
  					}
  				}
  				obj["createdAt"] = new Date()
  				Products.insert(obj, function(err, result) {
  					if (err) { console.log(err.message) }
  				})
  		 }
  	 })
	};

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


var impFilename = '/js_stack/meteorLihui/server/老店二月份销量.xls'
var sailTime = new Date('2016-02-01')
var importExcel = xlsx.parse(impFilename)
var importSheet1 = importExcel[0]
console.log(importSheet1.data[0]); //打印头信息，看得到的数据是否正确！
console.log(importSheet1.data[1]); //打印头信息，看得到的数据是否正确！

field = function(str){
    if (!_.include(_.first(importExcel[0].data), str) ) {
      return undefined
    }else{
      return _.first(importExcel[0].data).indexOf(str)
    }
}
//如果销售表不为空，才开始导入，并且一次性导入N多文件。
  if (SaleTable.find().count()==0) {
       importSheet1.data.slice(1,importSheet1.data.length).forEach(row=>{
         let reg= /\d+/
         let isAllNumber= reg.test(row[field(requireField)])
         if ( isAllNumber ) {
            let obj = new Object();
            //中文字段名称是个数组，所以需要对每一个进行检测，表里面是否有这个中文字段
            //如果excel表里面有这个中文字段，才会取值
            let barCode = row[field(saleArray.barCode)]
            let productName = row[field(saleArray.productName)]
            let singleCostPrice = row[field(saleArray.singleCostPrice)]
            let salesQuantity = row[field(saleArray.salesQuantity)]
            let salesAmount = row[field(saleArray.salesAmount)]
            let totalCostPrice = row[field(saleArray.totalCostPrice)]
            let marketRoyalty = row[field(saleArray.marketRoyalty)]
            let profit = row[field(saleArray.profit)]
            console.log(barCode)
            //如果销售数量为0或者销售金额为0，就没必要保存了，有些表其实数量真的是0！
            if (salesQuantity !=0) {
              let product = Products.findOne({barCode: barCode})
              if (!product) {
                //找不到产品其实应该新建该产品，并保存相关信息
                let message = `找不到产品：${barCode}，请先导入到产品表中`
                throw new Error(message)
              }
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
              obj["importSource"] = path.basename(impFilename)  //保存个备注信息？
              obj["sailTime"] = sailTime
              SaleTable.insert(obj, function(err, result) {
                if (err) { console.log(err.message) }
              })
            }
         }
       })
  }

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

