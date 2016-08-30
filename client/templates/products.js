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
		
		let bc = `#img${barCode}`
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
			var imgId = $(this).attr('id')
			var barCode = imgId.substring(3)
			// $("#"+imgId).JsBarcode(barCode).options({height:40})
			JsBarcode("#"+imgId, barCode, {height:40})
		})
	},
})



