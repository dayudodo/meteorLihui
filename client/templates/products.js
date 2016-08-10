import { Products }  from '/imports/api/products'
import { Template } from 'meteor/templating';

Template.products.helpers({
	products(){
		return Products.find({}, { sort: { createdAt: -1 } }).fetch()
	}

})