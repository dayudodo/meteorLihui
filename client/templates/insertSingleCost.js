import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Products }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'

Template.insertSingleCost.helpers({
	// data(){

	// },
})


Template.insertSingleCost.events({

	//从excel更新产品表中的单价
	'click #updateProductSingle'(e,instance){
		instance.$('#countProductSingle').text(0)
		let count = Meteor.call('updateProductSingle')
		instance.$('#countProductSingle').text(count)
	},
	//根据产品表里面的单价来更新销售表中的单价
	'click #updateSaleSingleFromProduct'(e, instance){
		instance.$('#countSaleSingle').text(0)
		let count = Meteor.call('updateSaleSingleFromProduct')
		instance.$('#countSaleSingle').text(count)
	},
	//更新销售表中的空名称
	'click #updateSaleNoName'(e, instance){
		instance.$('#countNoName').text(0)
		let count = Meteor.call('updateSaleNoName')
		instance.$('#countNoName').text(count)
	},

})