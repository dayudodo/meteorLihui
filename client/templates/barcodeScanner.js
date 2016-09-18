'use strict'
import { Products }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'
import { checkProducts } from '/imports/api/checkProducts'

Template.barcodeScanner.helpers({
  isMobile(){
    // return Meteor.isCordova
    return true
  },
  result(){
      return Session.get('result')
  },
  sales(){
    var product = Session.get('result')
    return SaleTable.find({barCode: product.barCode})
  },
  checkProducts(){
    return checkProducts.find({},
    {sort:
      {
        createdAt: -1
      }
    })
  },
  isSameCount_Inventory(check){
    // console.log(check)
    if (check.count != check.product.inventory) {
      return 'danger'
    }
  },

})



  Template.barcodeScanner.events({
    'click #scan' () {
      if (Meteor.isCordova) {
        cordova.plugins.barcodeScanner.scan(
          function (result) {
            // alert("We got a barcode\n" +
            //   "Result: " + result.text + "\n" +
            //   "Format: " + result.format + "\n" +
            //   "Cancelled: " + result.cancelled);
            //根据条码找到对应的产品信息
            // var product = Products.findOne({ barCode: result.text })
            // console.log( product.barCode, product.productName )
            // Session.set('result', product )
            $('input[name=barCode]').val(result.text)
          }, 
          function (error) {
            alert("Scanning failed: " + error);
          }
       );

      }
    },
    'click #showBarcode'(){
      $('img').each(function(){
        // console.log(img)
        // console.log($(this).attr('id'))
        let imgId = $(this).attr('id')
        let barCode = imgId.substring(3)
          // $("#"+imgId).JsBarcode(barCode).options({height:40})
        JsBarcode("#"+imgId, barCode, {height:40})
      })
    },
    'submit .save_check'(event){
      event.preventDefault();
      var barCode = event.target.barCode.value;
      var count = event.target.count.value;
      // console.log(barCode, count)
      var cProduct = checkProducts.findOne({barCode: barCode})
      if (cProduct) {
        var needUp = count?count:0
        checkProducts.update(cProduct._id, 
          {$inc:
            {count: needUp}
          }
        )
        toastr.success(`数量新增${needUp}`);
      }
      else{
        var createdAt = new Date()
        checkProducts.insert({barCode: barCode, count: count, createdAt: createdAt})
      }  
    },
    'submit .update_count'(event){
      event.preventDefault();
      var barCode = event.target.barCode.value;
      var count = event.target.count.value;
      // console.log(barCode, count)
      var cProduct = checkProducts.findOne({barCode: barCode})
      checkProducts.update({_id:cProduct._id},{$set:{count: count}},  function(err){
          if(err){ 
            console.log(err) 
            toastr.error(err);
          }
          else{
            toastr.success(`数量更新为${count}`);
          }
        })
    },
    'submit .update_comment1'(event){
      event.preventDefault();
      var barCode = event.target.barCode.value;
      var comment1 = event.target.comment1.value;
      // console.log(barCode, comment1)
      var cProduct = checkProducts.findOne({barCode: barCode})
      checkProducts.update({_id:cProduct._id},{$set:{comment1: comment1}},  function(err){
          if(err){ 
            console.log(err) 
            toastr.error(err);
          }
          else{
            toastr.success(`备注1更新为${comment1}`);
          }
        })
    },
    'click .delete'(e, instance){
      if (confirm('确定删除吗？')) {
        var barCode = instance.$(e.target).attr('barCode')
        // console.log(instance.$(e.target).attr('barCode'))
        var cProduct = checkProducts.findOne({barCode: barCode})
        checkProducts.remove({_id: cProduct._id})
      }
    },
});

