import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ProductSchemas } from '/imports/api/1_schemas'
import Session from 'meteor/session'
 
// export const dataSource = new Mongo.Collection('dataSource');
const Products = new Mongo.Collection('products');
const nameTable = {
	  barCode: 			["国际条码","条码"]
	, productName: 		["商品名称"]
	, model: 			["商品规格"]
	, marketUnit: 		["销售单位"]
	, salesQuantity: 	["销售数量"]
	, salesAmount: 		["销售金额","零售价"]
	, singleCostPrice: 	["单台成本价"]
	, totalCostPrice: 	["总成本价"]
	, royalty: 			["提成"]
	, marketRoyalty: 	["超市提成"]
	, profit: 			["利润"]
}


// console.log( Schemas )
Products.attachSchema(ProductSchemas.Product);
this.Products= Products //必须添加，不然会报错说Products不在global之中

if (Meteor.isServer) {
  // This code only runs on the server
  // Accounts.createUser({email:"ange@gmail.com", username:"ange", password:"123456", roles:["admin"]})
  Meteor.publish('products', function tasksPublication() {
    return Products.find();
  });
}

AdminConfig = {
 	adminEmails: ['ange@gmail.com'],
	collections: {
	  Products: {
	  	tableColumns:[
	  		{label:nameTable.productName[0], name:"productName"},
	  		{label:nameTable.barCode[0], name:"barCode"}
	  	]
	  },
	},
};

export { Products, nameTable }