import { nameTable, Products }  from '/imports/api/products'

Template.products.helpers({
	products(){
		return Products.find({}, { sort: { createdAt: -1 } }).fetch()
	}

})