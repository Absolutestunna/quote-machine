var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
require('backbone-react-component');



var LoginPageComponent = React.createClass({displayName: "LoginPageComponent",

  render: function(){
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {id: "login-page", className: "col xs12 col s8 offset-s4"}, 
          React.createElement("div", {className: "card-panel z-index-6 card-info teal lighten-5"}, 
            React.createElement("form", {onSubmit: this.props.handleLogin, className: "login-form row"}, 
              React.createElement("div", {className: "input-field col s12"}, 
                React.createElement("input", {id: "username", type: "text", className: "validate"}), 
                React.createElement("label", {htmlFor: "username"}, "Username")
              ), 

              React.createElement("div", {className: "input-field col s12"}, 
                React.createElement("input", {id: "password", type: "password", className: "validate"}), 
                React.createElement("label", {htmlFor: "password"}, "Password")
              ), 

              React.createElement("div", {className: "input-field col s12"}, 
                React.createElement("button", {className: "btn waves-effect waves-light", type: "submit"}, "Submit", 
                  React.createElement("i", {className: "material-icons right"}, "send")
                )
              )
            )
          )
        )
      )
    );
  }
});

module.exports = LoginPageComponent;