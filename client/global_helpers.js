Template.registerHelper('twoDecimal',(num)=>{
		return Math.round(num*100)/100
	}
)

Template.registerHelper('pureNumber',(string)=>{
		return new Number(string)
	}
)
