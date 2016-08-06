import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ProductSchemas } from '/imports/api/1_schemas'
import { SaleTable } from '/imports/api/sale_table'
import Session from 'meteor/session'
 
// export const dataSource = new Mongo.Collection('dataSource');
const Products = new Mongo.Collection('products');
const nameTable = {
	  barCode: 			["国际条码","条码"]
	, productName: 		["商品名称"]
	, model: 			["商品规格"]
	, marketUnit: 		["销售单位","计量单位"]
	, salesQuantity: 	["销售数量"]
	, salesAmount: 		["销售金额","零售价"]
	, singleCostPrice: 	["单台成本价"]
	, totalCostPrice: 	["总成本价"]
	, royalty: 			["提成"]
	, marketRoyalty: 	["超市提成"]
	, profit: 			["利润"]
}


// console.log( Schemas )
this.Products= Products //必须添加，不然会报错说Products不在global之中
SaleTable.helpers({
	product(){
		return Products.findOne(this.productId)
	},
})
Products.attachSchema(ProductSchemas.Product);

AdminConfig = {
 	adminEmails: ['ange@gmail.com'],
	collections: {
	  Products: {
	  	tableColumns:[
	  		{label:nameTable.productName[0], name:"productName"},
	  		{label:nameTable.barCode[0], name:"barCode"},
	  		{label:nameTable.singleCostPrice[0], name:"singleCostPrice"}
	  	]
	  },
	  SaleTable:{
	  	// omitFields: ['productId'],
	  	tableColumns:[
		  	{label: '国际条码', name:'barCode'},
		  	{label: '商品名称', name:'productName'},
		  	{label: '销售金额', name:"salesAmount"},
		  	{label: '销售数量', name:"salesQuantity"},
		  	{label: '单台成本价', name:"singleCostPrice"},
		  	{label: '总成本价', name:"totalCostPrice"},
		  	{label: '超市提成', name:"marketRoyalty"},
		  	{label: '利润', name:"profit"},
		  	{label: '导入来源', name:"importSource"},
		]
	  },
	},
};


export { Products, nameTable }