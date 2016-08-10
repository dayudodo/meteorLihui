import { Template } from 'meteor/templating';
Template.findSingleCost.helpers({
	log(){
		console.log(this)
	},
	data(){
		return this
	},
	count(){
		return this.count()
	},
	makeUniqueID(){
		return "update-each-" + this._id;
	},
	
})