Template.findSingleCost.helpers({
	log(){
		console.log(this)
	},
	data(){
		return this
	},
	makeUniqueID(){
		return "update-each-" + this._id;
	},
	
})