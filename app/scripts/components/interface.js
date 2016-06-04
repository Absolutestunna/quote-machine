var Backbone = require('backbone');
var React = require('react');
var $ = require('jquery');

//local components
var LoginPageComponent = require('./login.jsx');
var MainPageComponent = require('./main.jsx');


var Interface = React.createClass({displayName: "Interface",
  getInitialState: function(){
    return {
      router: this.props.router
    }
  },
  componentWillMount: function(){
    this.callback = (function(){
     this.forceUpdate();
    }).bind(this);
    this.state.router.on('route', this.callback);
  },
  componentWillUnmount: function(){
    this.state.router.off('route', this.callback);
  },
  handleMainPage: function(e){
    e.preventDefault();
    $.post('http://104.131.203.140:3000/api/authenticate',
    {
      "user": $('#username').val(),
      "pass": $('#password').val()
    },
    function (result) {
      if (result.token) {
        alert('authenticated');
        Backbone.history.navigate('_mainPage', {trigger: 'true'});
      } else {
        alert('not authenticated');
      }
    }.bind(this));
  },
  render: function(){
    var currentComponent;
    var route = this.props.router;
    if (route.current == '_signInPage'){
      currentComponent = React.createElement(LoginPageComponent, {
        handleMainPage: this.handleMainPage}
        )
    } else if (route.current == '_mainPage'){
      currentComponent = React.createElement(MainPageComponent, null)
    }
    return (
      React.createElement("div", null, 
        currentComponent
      )

    );
  }
});

module.exports = Interface;