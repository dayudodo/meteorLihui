import { Meteor } from 'meteor/meteor';
import { Products, nameTable }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'
import xlsx from 'node-xlsx'

var excel = xlsx.parse('/js_stack/meteorLihui/server/products.xls');
var field= function(str){
	if (!_.include(_.first(excel[0].data), str) ) {
		return undefined
	}else{
		return _.first(excel[0].data).indexOf(str)
	}
}
 var worksheet1 = excel[0]
 var content = worksheet1.data;
 // console.log(worksheet1)
 // console.log(worksheet1.data[0]);
 // 南漳买多购发来的excel表格，字段名称如下：
 // '序号', '国际条码','商品名称','商品规格','销售单位','销售数量','销售金额','单台成本价','总成本价','提成','利润's
 // console.log(worksheet1.data[1])
 // console.log(worksheet1.data[1][field('国际条码')])
 // console.log(worksheet1.data[1][field('商品名称')])
 // console.log(worksheet1.data[1][field('单台成本价')])

 

var requireField = '国际条码' //在从excel中读取值的时候，此值必须存在而且满足条件
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
//如果销售表不为空，才开始导入，并且一次性导入N多文件。
  if (SaleTable.find().count()==0) {

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

