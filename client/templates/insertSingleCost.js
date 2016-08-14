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
		instance.$('#updateProductSingleCount').text(0)
		let count = Meteor.call('updateProductSingle')
		instance.$('#updateProductSingleCount').text(count)
	},
	//根据产品表里面的单价来更新销售表中的单价
	'click #updateSaleSingleFromProduct'(e, instance){
		instance.$('#updateSaleSingleFromProductCount').text(0)
		let count = Meteor.call('updateSaleSingleFromProduct')
		instance.$('#updateSaleSingleFromProductCount').text(count)
	},
	//更新销售表中的空名称
	'click #updateSaleNoName'(e, instance){
		instance.$('#updateSaleNoNameCount').text(0)
		let count = Meteor.call('updateSaleNoName')
		instance.$('#updateSaleNoNameCount').text(count)
	},
	'click #caculateProfit'(e, instance){
		instance.$('#caculateProfitCount').text(0)
		let count = Meteor.call('caculateProfit')
		instance.$('#caculateProfitCount').text(count)
	},
	'click #checkSameNameSingle'(e, instance){
		instance.$('#checkSameNameSingleCount').text(0)
		let count = Meteor.call('checkSameNameSingle')
		instance.$('#checkSameNameSingleCount').text(count)
	},

})