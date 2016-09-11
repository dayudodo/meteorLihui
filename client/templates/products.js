import { Products }  from '/imports/api/products'
import { Template } from 'meteor/templating';
import  JsBarcode  from 'jsbarcode'
// var JsBarcode = require('jsbarcode');

Template.products.onRendered(function(){
	// $('#testimg').JsBarcode('13515')
	this.$('img').each(function(){
		// console.log($(this))
		// console.log($(this).attr('id'))
	})
	// console.log(this.findAll('img'))
	// console.log(this)
	// $('img').each(function(){
	// 		// console.log(img)
	// 		console.log($(this).attr('id'))
	// })
})

Template.products.helpers({
	products(){
		return window.Products.find(
			{}, 
			{ 
				sort: { createdAt: -1 }, 
				limit: 20 
			})
	},
	pureNumber(string){
		return new Number(string)
	}

})

Template.products.events({
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
})



