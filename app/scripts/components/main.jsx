//3rd party
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
require('backbone-react-component');

var MainPageComponent = React.createClass({
  componentDidMount: function(){
    console.log('main comp has been rendered');
    this.props.handleGetQuotes();
  },
  render: function(){
    return (
      <div className="row">
        <div className="col s4"></div>
      </div>
    );
  }
});

module.exports = MainPageComponent;
