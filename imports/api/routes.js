import { Meteor } from 'meteor/meteor';
// import { Products }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'
// import { Router } from 'meteor/iron:router'

Router.configure({
	layoutTemplate:'layout',
	notFoundTemplate: 'notFound'
})

Router.route('/',function(){
	this.render('products')
},{
	name:'/'
})

Router.route('/products',{
	waitOn(){
		return Meteor.subscribe('products');
	},
	action(){
		this.render('products');
	}
})

Router.route('/findSingleCost',function(){
	this.render("findSingleCost", {
		data: function(){
			return SaleTable.find( {singleCostPrice:{$eq:null}}, {sort:{barCode:1}} )
		}
	})
})

Router.route('/insertSingleCost',function(){
	this.render("insertSingleCost")
})

Router.route('huiCharts')
Router.route('barcodeScanner')

Router.route('/about',{
	name:'about',
})


Router.route('/upload/:filename',function () {
	var req = this.request;
	var response = this.response;
 	response.end('hi from the server\n'+ this.params.filename);
}, {where: 'server'});

Router.route('/item', function () {
	console.log('access item route')
  var req = this.request;
  var res = this.response;
  res.end('hello from the server\n');
}, {where: 'server'});