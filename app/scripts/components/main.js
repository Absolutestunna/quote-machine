var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
require('backbone-react-component');


//local components
var CreateQuoteComponent = require('./createQuote.jsx');
var RandomQuoteComponent = require('./randomQuote.jsx');


var MainPageComponent = React.createClass({displayName: "MainPageComponent",
  getInitialState: function(){
    return {
      quotes: [],
      selQuote: {},
      editState: false
    }
  },
  componentDidMount: function(){
    this.props.handleGetQuotes();
  },

  componentWillReceiveProps: function(nextProps) {
    console.log('nextProps', nextProps);
    var self = this;
    var selQuote = nextProps.selQuote;
    var quoteInfo = self.props.handleDisplayQuoteInfo;
    var quoteList = nextProps.quotes;
    var quotes = quoteList.map(function(quote){
      return (
        React.createElement("li", {onClick: quoteInfo.bind(this, quote), className: "collection-item truncate", key: quote.quote_id}, 
          React.createElement("span", {className: ""}, quote.quote)
        )
      );
    });
    this.setState({
      quotes: quotes,
      selQuote: selQuote
    });
  },


  //custom functions

  edit: function(){
    this.setState({editState: true});
  },
  renderQuoteInfoDisplay: function(){
    return (
      React.createElement("div", {className: "col s12 viewQuote"}, 
        React.createElement("div", {className: "card-panel white"}, 
          React.createElement("blockquote", null, 
            quoteInfo.quote
          ), 
          React.createElement("p", null, quoteInfo.author)
        )
      )
    );
  },


  render: function(){
    var quoteInfo = this.state.selQuote;
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col s5"}, 
            React.createElement("ul", {className: "collection with-header"}, 
              React.createElement("li", {className: "collection-header"}, React.createElement("h4", null, "List of Quotes")), 
              this.state.quotes
            )
        ), 


        React.createElement("div", {className: "col s7"}, 
          React.createElement("div", {className: "row"}, 

            React.createElement("div", {className: "col s12 viewQuote"}, 
              React.createElement("div", {className: "card-panel white"}, 
                React.createElement("blockquote", null, 
                  quoteInfo.quote
                ), 
                React.createElement("p", null, quoteInfo.author)
              )
            ), 

            React.createElement(CreateQuoteComponent, {
              handleCreateQuote: this.props.handleCreateQuote}
              ), 
            React.createElement(RandomQuoteComponent, {
              handleGetRandomQuote: this.props.handleGetRandomQuote, 
              randomQuote: this.props.randomQuote}
              )
          )
        )
      )
    );
  }
});

module.exports = MainPageComponent;