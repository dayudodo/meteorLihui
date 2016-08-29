import { Products }  from '/imports/api/products'
import { Template } from 'meteor/templating';
import  JsBarcode  from 'jsbarcode'
// var JsBarcode = require('jsbarcode');

Template.products.rendered = function(){
	// $('#testimg').JsBarcode('13515')
	// this.$('img').each(function(){
	// 	// console.log(img)
	// 	console.log($(this).attr('id'))
	// })
	// console.log(this.findAll('img'))
	// console.log(this)
	// $('img').each(function(){
	// 		// console.log(img)
	// 		console.log($(this).attr('id'))
	// })
}

Template.products.helpers({
	products(){
		return Products.find(
			{}, 
			{ 
				sort: { createdAt: -1 }, 
				limit: 20 
			})
	},
	generateBarCode(barCode){
		// console.log(barCode)
		
		let bc = `#${barCode}`
		// console.log(bc)
		$(bc).JsBarcode(barCode)
		// console.log($(bc))
		// JsBarcode(bc, barCode)
		// JsBarcode(`#${barCode}`)
		//   .options({font: "OCR-B"}) // Will affect all barcodes
		//   .EAN13(barCode, {fontSize: 18, textMargin: 0})
		//   .render();
	}

})

Template.products.events({
	'click #showBarcode'(e, instance){
		$('img').each(function(){
			// console.log(img)
			// console.log($(this).attr('id'))
			var bc = $(this).attr('id')
			$("#"+bc).JsBarcode(bc)
		})
	},
})



