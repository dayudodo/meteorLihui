import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Products }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'

Template.insertSingleCost.helpers({
	// data(){

	// },
})

//根据产品表里面的单价来更新销售表中的单价
Template.insertSingleCost.events({
	'click #updateSingleCost'(e,instance){
		// console.log('clicked')
		instance.$('#count').text(0)
		let noSingleArray = SaleTable.find({singleCostPrice:{$eq:null}}).fetch()
		let count =0
		//保存相同的时间以便进行统一安排，比如全部更新啥的，以后还会有其它的字段，比如这个纪录是由谁来修改的.
		let updatedAt = new Date
		_.each(noSingleArray, function(row){
			let product = Products.findOne( {_id: row.productId} )
			if (!product) {
				throw new Error('需要添加此产品：'+ row.productId+'|'+row.barCode)
			}
			if ( product.singleCostPrice ) {
				SaleTable.update(
					{ _id:row._id }, 
					{$set:
						{ 
							singleCostPrice: product.singleCostPrice,
							updatedAt: updatedAt
						}
					},	function(err){
							if(err){ console.log(err); }
							else{
								++count
								console.log(count);
								instance.$('#count').text(count)
							}
					})
			}
		})
	},
	'click #updateSameName'(e,instance){
		instance.$('#countProductSingle').text(0)
		let count = Meteor.call('productUpdateSingle')
		instance.$('#countProductSingle').text(count)
	},

})