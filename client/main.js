// import { ReactiveVar } from 'meteor/reactive-var';
// import React, { Component, PropTypes } from 'react';
// import { render } from 'react-dom'
// import { Router, Route, browserHistory, Link } from 'react-router';
// import { renderRoutes } from './components/routes.js'
import { Products }  from '/imports/api/products'
import { SaleTable } from '/imports/api/sale_table'
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import echarts from 'echarts'

// import { Template } from 'meteor/templating';
 
import './main.html';
 
// Template.body.helpers({
//   Lists: "list test",
// });
window.Products = Products
window.SaleTable = SaleTable
window.Random = Random
window.echarts = echarts
Meteor.subscribe('products');
Meteor.subscribe('saletable');

Meteor.startup(() => {
 // render( renderRoutes(), document.getElementById('app'));
 // AdminConfig = {
 //  adminEmails: ['ange@gmail.com'],
 //   collections: {
 //     Lists: {},
 //   },
 // };
})


// Accounts.ui.config({
//     passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
// });

Template.registerHelper('twoDecimal',(num)=>{
		return Math.round(num*100)/100
	}
)