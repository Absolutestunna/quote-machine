var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
require('backbone-react-component');

var MainPageComponent = React.createClass({displayName: "MainPageComponent",
  componentDidMount: function(){
    console.log('main comp has been rendered');
    this.props.handleGetQuotes();
  },
  render: function(){
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col s4"})
      )
    );
  }
});

module.exports = MainPageComponent;