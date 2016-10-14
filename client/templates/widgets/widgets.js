'use strict'

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Products }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'

//功能函数名称，功能说明，显示按钮的风格
let functionalArray = [
	["importToSaleTable","从Excel导入全部销售记录"],
	["updateProductSingle","从excel更新产品表中的单价"],
	["updateSaleSingleFromProduct", "根据产品表里面的单价来更新销售表中的单价"],
	["updateSaleNoName", "更新销售表中的空名称"],
	["caculateProfit", "计算利润"],
	["checkSameNameSingle", "检测名称相同而单价不同"],
	["checkSameBarCode","条码同商品名不同"],
	["everyMonthProfit","每个月利润"],
	["caculateInventory","计算库存"],
	["dropDatabase","清空数据库","btn-warning"],
	["exportProducts","导出产品表到excel"],
]

let eventsTemplate = `
Template.widgets.events({
	'click #allExecute'(){
		functionalArray.forEach(row=>{
			
			if (!row[2]) {
				let callName = row[0]
				Meteor.call(callName)
			}
		})
	},
	{{methods}}
})
`
let methodsString = ''
functionalArray.forEach(row=>{
	let item = row[0]
	let oneMethod = `
					'click #${item}'(e, instance){
						instance.$('#${item}Count').text(0)
						let count = Meteor.call('${item}')
						instance.$('#${item}Count').text(count)
					},
				`
	methodsString += oneMethod
})
eventsTemplate = eventsTemplate.replace(/\{\{methods\}\}/, methodsString)
// console.log(eventsTemplate)
eval(eventsTemplate)

Template.widgets.helpers({
	allWidgets(){
		let objArr = []
		functionalArray.forEach(row=>{
			let obj = _.object(["widgetName","widgetExplanation","class"], row)
			//如果没有给定CSS类，那么默认的就是btn-info的样式，不象清空数据库一样危险操作
			if (_.isEmpty(row[2])) {
				obj.class="btn-info"
			}
			objArr.push(obj)
		})
		return objArr
	}
})
// Template.widgets.events({
// 	//从excel更新产品表中的单价
// 	'click #updateProductSingle'(e,instance){
// 		instance.$('#updateProductSingleCount').text(0)
// 		let count = Meteor.call('updateProductSingle')
// 		instance.$('#updateProductSingleCount').text(count)
// 	},
// 	//根据产品表里面的单价来更新销售表中的单价
// 	'click #updateSaleSingleFromProduct'(e, instance){
// 		instance.$('#updateSaleSingleFromProductCount').text(0)
// 		let count = Meteor.call('updateSaleSingleFromProduct')
// 		instance.$('#updateSaleSingleFromProductCount').text(count)
// 	},
// 	//更新销售表中的空名称
// 	'click #updateSaleNoName'(e, instance){
// 		instance.$('#updateSaleNoNameCount').text(0)
// 		let count = Meteor.call('updateSaleNoName')
// 		instance.$('#updateSaleNoNameCount').text(count)
// 	},
// 	'click #caculateProfit'(e, instance){
// 		instance.$('#caculateProfitCount').text(0)
// 		let count = Meteor.call('caculateProfit')
// 		instance.$('#caculateProfitCount').text(count)
// 	},

// })