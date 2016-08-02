import { Meteor } from 'meteor/meteor';
import { Products, nameTable }  from '/imports/api/products'
import xlsx from 'node-xlsx'

var excel = xlsx.parse('/js_stack/meteorLihui/server/chenben.xls');
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

 

var requireField = '国际条码'
Meteor.startup(() => {
  // code to run on server at startup
  // var Products = new Mongo.collection('Products')
  //从excel中导入相关的数据到mongoDB中
  if (Products.find().count() ==0 ) {
  	 worksheet1.data.slice(1,worksheet1.data.length).forEach(item=>{
  		 let reg= /\d+/
  		 if ( reg.test(item[field(requireField)]) ) {
  				let obj = new Object();
  				for (var key in nameTable) {
  					let ArrayChinese = nameTable[key]
  					for(var chinese of ArrayChinese){
  						if (field(chinese) && obj[key]==undefined) {
  							obj[key]=item[field(chinese)]
  						}
  					}
  				}
  				obj["createdAt"] = new Date()
  				Products.insert(obj, function(err, result){
  					if (err) { console.log(err.message) }
  				})
  		 }
  	 })
	};
  
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



});

