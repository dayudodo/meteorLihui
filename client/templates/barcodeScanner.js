'use strict'

Template.barcodeScanner.helpers({
  isMobile(){
    return Meteor.isCordova
  },
})

if (Meteor.isCordova) {

  Template.barcodeScanner.events({
    'click button': function () {

      cordova.plugins.barcodeScanner.scan(
        function (result) {
          alert("We got a barcode\n" +
            "Result: " + result.text + "\n" +
            "Format: " + result.format + "\n" +
            "Cancelled: " + result.cancelled);
        }, 
        function (error) {
          alert("Scanning failed: " + error);
        }
     );

    }

  });

}

