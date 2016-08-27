'use strict'
import { Products }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'

Template.barcodeScanner.helpers({
  isMobile(){
    return Meteor.isCordova
  },
  result(){
      return Session.get('result')
  },
  sales(){
    var product = Session.get('result')
    return SaleTable.find({barCode: product.barCode})
  },
})

if (Meteor.isCordova) {

  Template.barcodeScanner.events({
    'click #scan': function () {

      cordova.plugins.barcodeScanner.scan(
        function (result) {
          // alert("We got a barcode\n" +
          //   "Result: " + result.text + "\n" +
          //   "Format: " + result.format + "\n" +
          //   "Cancelled: " + result.cancelled);
          //根据条码找到对应的产品信息
          var product = Products.findOne({ barCode: result.text })
          console.log( product.barCode, product.productName )
          Session.set('result', product )


        }, 
        function (error) {
          alert("Scanning failed: " + error);
        }
     );

    }

  });

}

