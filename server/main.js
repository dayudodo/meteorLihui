import { Meteor } from 'meteor/meteor'

import { Products }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'
import { importFileTable } from '/imports/api/importFile_table'
// import { importToProducts } from './importToProducts'
import { updateProductSingle } from './updateProductSingle'
import { updateSaleSingleFromProduct } from './updateSaleSingleFromProduct'
import { updateSaleNoName } from './updateSaleNoName'
import { caculateProfit } from './caculateProfit'
import { checkSameNameSingle } from './checkSameNameSingle'
import { checkSameBarCode } from './checkSameBarCode'
import { everyMonthProfit, profitTop10 } from './everyMonthProfit'
import { importToSaleTable } from './importToSaleTable'

Meteor.startup(() => {
  //从excel中导入相关的数据到mongoDB中
  //需要导入的excel列表，会自动记录已经导入的文件，数组第二项为自定义的导入时间
  var impFileArray = [
     ['/js_stack/meteorLihui/server/excels/三禾1月老店销量.xls','2016-01-01']

    ,['/js_stack/meteorLihui/server/excels/三禾2月份老店销量.xls','2016-02-01']

    ,['/js_stack/meteorLihui/server/excels/三禾3月老店.xls','2016-03-01']
    ,['/js_stack/meteorLihui/server/excels/三禾3月小西门.xls','2016-03-01']

    ,['/js_stack/meteorLihui/server/excels/三禾4月份老店销量.xls','2016-04-01']
    ,['/js_stack/meteorLihui/server/excels/三禾4月份小西门销量.xls','2016-04-01']

    ,['/js_stack/meteorLihui/server/excels/三禾5月份老店销售.xls','2016-05-01']
    ,['/js_stack/meteorLihui/server/excels/三禾5月份小西门销量.xls','2016-05-01']

    ,['/js_stack/meteorLihui/server/excels/三禾6月份老店销量.xls','2016-06-01']
    ,['/js_stack/meteorLihui/server/excels/三禾6月小西门.xls','2016-06-01']

    ,['/js_stack/meteorLihui/server/excels/三禾7月老店.xls','2016-07-01']
    ,['/js_stack/meteorLihui/server/excels/三禾7月小西门明细.xls','2016-07-01']
  ]
  //   var impFileArray = [

  //    ['/js_stack/meteorLihui/server/excels/三禾2月份老店销量.xls','2016-02-01']
  //   ,['/js_stack/meteorLihui/server/excels/三禾5月份老店销售.xls','2016-05-01']

  // ]

  var costArray = [
     ['/js_stack/meteorLihui/server/excels/销售无成本表.xls','2016-08-10']
  ]
  // importToProducts( costArray[0][0] );
  // importToSaleTable(impFileArray[11]);

  Meteor.publish('products', function tasksPublication() {
    return Products.find()
  });
  Meteor.publish('saletable', function () {
    return SaleTable.find()
  });
  Meteor.publish('everyMonthProfit', function(){
    return everyMonthProfit()
  })

  Meteor.methods({
    'updateProductSingle'(){
        //从Excel中读取，所以需要在服务器端完成这个任务。
        updateProductSingle(costArray[0][0])
    },
    'updateSaleSingleFromProduct'(){
      return updateSaleSingleFromProduct()
    },
    'updateSaleNoName'(){
      updateSaleNoName()
    },
    'caculateProfit'(){
      caculateProfit({replaceError: true})
    },
    'checkSameNameSingle'(){
      checkSameNameSingle()
    },
    'checkSameBarCode'(){
      checkSameBarCode()
    },
    'importToSaleTable'(){ //导入所有的excel文件销售数据表SaleTable中
      impFileArray.forEach(excel=>{
        importToSaleTable(excel)
      })
    },
    'dropDatabase'(){
      Products.remove({})
      SaleTable.remove({})
      importFileTable.remove({})
      console.log("产品表及销售表、导入文件列表全部清空")
    },
    'everyMonthProfit'(){
      return everyMonthProfit()
      // return [1,2,3]
    },
    'profitTop10'(index){
      return profitTop10(index)
    }
  })
  
  Products.allow({
    insert: function(){
      return true;
    },
    update: function(){
      return true;
    },
    remove: function(){
      return true
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
  importFileTable.allow({
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

