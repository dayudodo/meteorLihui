import { ReactiveVar } from 'meteor/reactive-var';
import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom'
// import { Router, Route, browserHistory, Link } from 'react-router';
// import { renderRoutes } from './components/routes.js'
import { Products, nameTable }  from '/imports/api/products'
import { Template } from 'meteor/templating'

// import { Template } from 'meteor/templating';
 
import './main.html';
 
// Template.body.helpers({
//   Lists: "list test",
// });
window.Products = Products
Template.listsForm.onCreated(function bodyOnCreated() {
  // this.state = new ReactiveDict();
  Meteor.subscribe('products');
});

Template.listsForm.helpers({
  products(){
    return Products.find({})
  }
})



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