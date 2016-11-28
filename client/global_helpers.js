function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

Template.registerHelper('twoDecimal',(num)=>{
		return round(num, 2)
	}
)



Template.registerHelper('pureNumber',(string)=>{
		return new Number(string)
	}
)

