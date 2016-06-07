var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
require('backbone-react-component');


//local components
var CreateQuoteComponent = require('./createQuote.jsx');
var RandomQuoteComponent = require('./randomQuote.jsx');


var MainPageComponent = React.createClass({displayName: "MainPageComponent",

  //local lifecycle components

  getInitialState: function(){
    return {
      quotes: [],
      selQuote: {},
      editState: false,
      authToken: ""
    }
  },
  componentDidMount: function(){
    this.props.handleGetQuotes();
  },
  componentWillReceiveProps: function(nextProps) {
    var self = this;
    this.setState({authToken: nextProps.authStatus.token});
    if (nextProps.quotes.msg === "Not authenticated."){
      nextProps.handleGetQuotes(nextProps.authStatus.token)
    }
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

  edit: function(quoteInfo, e){
    e.preventDefault();
    if (Object.keys(quoteInfo).length < 1){
      alert ('Please pick a quote from the list of quotes');
    } else {
      this.setState({editState: true});
    }
  },
  save: function(quoteInfo, e){
    e.preventDefault();
    this.setState({editState: false});
    this.props.handleSaveQuote(quoteInfo);
  },
  delete: function(model, e){
    e.preventDefault();
    if (Object.keys(model).length < 1){
      alert ('Please pick a quote to delete');
    } else {
      this.props.handleDeleteQuote(model);
    }
  },
  renderQuoteInfoDisplay: function(quoteInfo){
    return (
      React.createElement("div", {className: "col s12 viewQuote"}, 
        React.createElement("div", {className: "card-panel white"}, 
          React.createElement("blockquote", {id: "blockquote"}, 
            quoteInfo.quote || "Please select a quote"
          ), 
          React.createElement("p", {id: "block-author"}, quoteInfo.author), 
          React.createElement("div", {className: "right-align feature-buttons"}, 
            React.createElement("a", {onClick: this.delete.bind(this, quoteInfo), className: "delete btn-floating btn-small red"}, 
              React.createElement("i", {className: "large material-icons"}, "delete")
            ), 
            React.createElement("a", {onClick: this.edit.bind(this, quoteInfo), className: "edit btn-floating btn-small blue"}, 
              React.createElement("i", {className: "large material-icons"}, "mode_edit")
            )
          )

        )
      )
    );
  },

  renderEditPage: function(quoteInfo){
    return (
      React.createElement("div", {className: "col s12 editQuote"}, 
        React.createElement("div", {className: "card-panel white"}, 
          React.createElement("div", {className: "input-field"}, 
            React.createElement("i", {className: "small material-icons prefix"}, "mode_edit"), 
            React.createElement("textarea", {placeholder: quoteInfo.quote, id: "editquote", type: "text", className: "materialize-textarea validate"}
            ), 
            React.createElement("input", {id: "editAuthor", placeholder: quoteInfo.author, type: "text", className: "validate"}), 
            React.createElement("div", {className: "right-align"}, 
              React.createElement("a", {onClick: this.save.bind(this, quoteInfo), className: "btn-floating btn-large green", type: "submit"}, 
                React.createElement("i", {className: "large material-icons"}, "done")
              )
            )
          )
        )
      )
    );
  },


  render: function(){
    var quoteInfo = this.state.selQuote;
    var quote = quoteInfo.quote;
    var author = quoteInfo.author;
    var display;
    if (this.state.editState === false){
      display = this.renderQuoteInfoDisplay(quoteInfo);
    } else if (this.state.editState === true){
      display = this.renderEditPage(quoteInfo);
    } else {
      display = React.createElement("div", null)
    }
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col xs12 s12 m5 l5 xl5"}, 
            React.createElement("ul", {className: "collection with-header listquotes"}, 
              React.createElement("li", {className: "collection-header"}, React.createElement("h4", null, "List of Quotes")), 
              this.state.quotes
            )
        ), 

        React.createElement("div", {className: "col xs12 s12 m7 l7"}, 
          React.createElement("div", {className: "row"}, 
            display, 
            React.createElement(CreateQuoteComponent, {
              handleCreateQuote: this.props.handleCreateQuote}
              ), 
            React.createElement(RandomQuoteComponent, {
              authToken: this.props.authToken, 
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