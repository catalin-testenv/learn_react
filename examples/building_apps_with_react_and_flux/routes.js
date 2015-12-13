'use strict';


//import React from 'react';
import Router from 'react-router';

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  <Route name="app" path="/" handler={require('./app')}>
    <DefaultRoute handler={require('./homePage')} />
    <Route name="authors" handler={require('./authors/authorPage')} />
    <Route name="about" handler={require('./about/aboutPage')} />
    <NotFoundRoute handler={require('./notFoundPage')} />
    <Redirect from="about-us" to="about" />
    <Redirect from="awthurs" to="authors" />
    <Redirect from="about/*" to="about" />
  </Route>
);

export default routes;