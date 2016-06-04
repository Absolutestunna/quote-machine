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
        React.createElement("div", {className: "col s4"}, 
          React.createElement("h3", null, "List of Quotes")
        ), 


        React.createElement("div", {className: "col s8"}, 
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