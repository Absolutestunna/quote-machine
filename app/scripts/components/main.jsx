//3rd party
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
require('backbone-react-component');


//local components
var CreateQuoteComponent = require('./createQuote.jsx');
var RandomQuoteComponent = require('./randomQuote.jsx');


var MainPageComponent = React.createClass({
  getInitialState: function(){
    return {
      quotes: [],
      selQuote: {}
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
        <li onClick={quoteInfo.bind(this, quote)} className="collection-item truncate" key={quote.quote_id}>
          <span className="">{quote.quote}</span>
        </li>
      );
    });
    this.setState({
      quotes: quotes,
      selQuote: selQuote
    });
  },



  //custom functions



  render: function(){
    var quoteInfo = this.state.selQuote
    return (
      <div className="row">
        <div className="col s5">
            <ul className="collection with-header">
              <li className="collection-header"><h4>List of Quotes</h4></li>
              {this.state.quotes}
            </ul>
        </div>


        <div className="col s7">
          <div className="row">
            <div className="col s12 viewQuote">
              <div className="card-panel white">
                <blockquote>
                  {quoteInfo.quote}
                </blockquote>
                <p>{quoteInfo.author}</p>
              </div>
            </div>
            <CreateQuoteComponent
              handleCreateQuote = {this.props.handleCreateQuote}
              />
            <RandomQuoteComponent
              handleGetRandomQuote = {this.props.handleGetRandomQuote}
              randomQuote = {this.props.randomQuote}
              />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MainPageComponent;
