import { SaleTable } from '/imports/api/sale_table'

Router.configure({
	layoutTemplate:'layout',
	notFoundTemplate: 'notFound'
})

Router.route('/',function(){
	this.render('products')
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
			return SaleTable.find({singleCostPrice:{$eq:null}})
		}
	})
})

Router.route('/insertSingleCost',function(){
	this.render("insertSingleCost", {
		data: function(){
			let noSingleArray = SaleTable.find({singleCostPrice:{$eq:null}}).fetch()
			let count =0
			_.each(noSingleArray, function(row){
				let product = Products.findOne( {_id: row.productId} )
				if (!product) {
					throw new Error('需要添加此产品：'+ row.productId+'|'+row.barCode)
				}
				if ( product.singleCostPrice ) {
					SaleTable.update(
						{ _id:row._id }, 
						{$set:
							{ singleCostPrice: product.singleCostPrice }
						})
					count++
				}

			})
			return count;
		}
	})
})

Router.route('/about')


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