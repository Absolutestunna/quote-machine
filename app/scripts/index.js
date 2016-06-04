//3rd party
var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

//Router
var router = require('./router');

//local components
var Interface = require('./components/interface.jsx');

//Start the routing history
$(function(){
  Backbone.history.start();
});


//Render the page based on router
ReactDOM.render(
  React.createElement(Interface, {router: router}),
  document.getElementById('app')
);
