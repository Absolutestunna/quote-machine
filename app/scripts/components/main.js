var Backbone = require('backbone');
var React = require('react');
var $ = require('jquery');


var MainPageComponent = React.createClass({displayName: "MainPageComponent",
  
  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement("h3", null, "Main Page rendered")
      )
    );
  }
});

module.exports = MainPageComponent;