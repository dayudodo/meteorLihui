import { ReactiveVar } from 'meteor/reactive-var';
import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom'
import { Router, Route, browserHistory, Link } from 'react-router';
import { renderRoutes } from './components/routes.js'
// import ListPage from './components/ListPage.js'



Meteor.startup(() => {
 render( renderRoutes(), document.getElementById('app'));
})

