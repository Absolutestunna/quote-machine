var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
require('backbone-react-component');

var RandomQuoteComponent = React.createClass({displayName: "RandomQuoteComponent",
  getInitialState: function(){
    return {
      quoteInfo: {}
    }
  },
  componentWillReceiveProps: function(nextProps){
    console.log('randome next props', nextProps);
    var quoteInfo = nextProps.randomQuote;
    this.setState({quoteInfo: quoteInfo});
  },
  render: function(){
    return (
      React.createElement("div", {className: "col s12 randomQuote"}, 
        React.createElement("div", {className: "card-panel white"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("h2", {className: "col s8 left-align"}, "Random Quote of the day"), 
            React.createElement("span", {className: "col s4 center-align"}, React.createElement("a", {onClick: this.props.handleGetRandomQuote, className: "btn-floating btn-large waves-effect waves-light red col s4 right-align"}, React.createElement("i", {className: "material-icons"}, "add"))
            )
          ), 
          React.createElement("blockquote", null, 
            this.state.quoteInfo.quote
          ), 
          React.createElement("p", null, this.state.quoteInfo.author)
        )

      )
    );
  }
});

module.exports = RandomQuoteComponent;