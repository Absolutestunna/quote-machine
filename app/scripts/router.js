//3rd party
var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

//Local components
var LoginComponent = require('./components/login.jsx');


var Router = Backbone.Router.extend({
  routes: {
    '': 'signInPage',
    'mainPage': 'mainPage'
  },
  signInPage: function(){
    this.current = 'signInPage';
  },
  mainPage: function(){
    this.current = 'mainPage';
  }
});


module.exports = new Router();
