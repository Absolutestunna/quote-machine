//3rd party
var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

//Local components
var LoginComponent = require('./components/login.jsx');


var Router = Backbone.Router.extend({
  routes: {
    '': '_signInPage',
    'main': '_mainPage'
  },
  _signInPage: function(){
    this.current = '_signInPage';
  },
  _mainPage: function(){
    this.current = '_mainPage';
  }
});


module.exports = new Router();
