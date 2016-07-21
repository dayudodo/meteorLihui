import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './App.js'
import ListPage from './ListPage.js'

export const renderRoutes = () => (
  <Router history={browserHistory}>
	  <Route path="/" component={App} />
	  <Route path="listpage" component={ListPage} />
  </Router>
)