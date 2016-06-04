//3rd party
var Backbone = require('backbone');
var React = require('react');
var $ = require('jquery');


var MainPageComponent = React.createClass({
  
  render: function(){
    return (
      <div>
        <h3>Main Page rendered</h3>
      </div>
    );
  }
});

module.exports = MainPageComponent;
