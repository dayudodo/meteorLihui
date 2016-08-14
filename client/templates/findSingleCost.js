import { Template } from 'meteor/templating';
import { Random } from 'meteor/random'

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
		return "update-each-" + Random.id()
	},
	
})