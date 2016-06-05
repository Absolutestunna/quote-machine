var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
require('backbone-react-component');

var MainPageComponent = React.createClass({displayName: "MainPageComponent",
  getInitialState: function(){
    return {
      quotes: []
    }
  },
  componentDidMount: function(){
    this.props.handleGetQuotes();
    // console.log('state quotes', this.state.quotes);
  },

  componentWillReceiveProps: function(nextProps) {
    console.log('nextProps', nextProps);
    this.setState({
      quotes: nextProps.quotes
    });
  },

  render: function(){
    console.log('quotess', this.state.quotes);
    var quoteList = this.state.quotes;
    var quotes = quoteList.map(function(quote){
      return (
        React.createElement("li", {key: quote.quote_id}, 
          React.createElement("div", {className: "collapsible-header truncate quote"}, quote.quote), 
          React.createElement("a", {className: "btn-floating btn-large waves-effect waves-light red"}, React.createElement("i", {className: "material-icons right"}, "send"))
        )
      );
    });
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col s5"}, 
            React.createElement("ul", {className: "collection with-header"}, 
              React.createElement("li", {className: "collection-header"}, React.createElement("h4", null, "List of Quotes")), 
              quotes
            )
        ), 


        React.createElement("div", {className: "col s7"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col s12 viewQuote"}, 
              React.createElement("div", {className: "card-panel white"}

              )
            ), 
            React.createElement("div", {className: "col s12 genQuote"}, 
                React.createElement("div", {className: "card-panel white"}, 
                  React.createElement("form", {className: "login-form row", onSubmit: this.props.handleCreateQuote}, 
                    React.createElement("div", {className: "input-field col s12"}, 
                      React.createElement("i", {className: "material-icons prefix"}, "mode_edit"), 
                      React.createElement("textarea", {id: "quote", className: "materialize-textarea"}), 
                      React.createElement("label", {htmlFor: "quote"}, "Quote")
                    ), 

                    React.createElement("div", {className: "input-field col s6"}, 
                      React.createElement("input", {id: "author", type: "text", className: "validate"}), 
                      React.createElement("label", {htmlFor: "author"}, "Author")
                    ), 

                    React.createElement("div", {className: "input-field col s6"}, 
                      React.createElement("button", {className: "btn waves-effect waves-light", type: "submit"}, "Submit", 
                        React.createElement("i", {className: "material-icons right"}, "send")
                      )
                    )


                  )
               )
            )
          )
        )
      )
    );
  }
});

module.exports = MainPageComponent;