var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
require('backbone-react-component');


var RandomQuoteComponent = React.createClass({displayName: "RandomQuoteComponent",

  //local lifecycle components

  getInitialState: function(){
    return {
      quoteInfo: {}
    }
  },
  componentWillReceiveProps: function(nextProps){
    var quoteInfo = nextProps.randomQuote;
    if (quoteInfo.msg === "Not authenticated."){
      this.props.handleGetRandomQuote(this.props.authToken);
    } else {
      this.setState({quoteInfo: quoteInfo});
    }
  },
  render: function(){
    return (
      React.createElement("div", {className: "col s12 randomQuote"}, 
        React.createElement("div", {className: "card-panel white"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("h2", {className: "col s8 left-align"}, "Random Quote of the day"), 
            React.createElement("div", {className: "col s4 center-align"}, 
              React.createElement("a", {onClick: this.props.handleGetRandomQuote, className: "btn-floating btn-large waves-effect waves-light red"}, React.createElement("i", {className: "material-icons"}, "add"))
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