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

  edit: function(model, e){
    e.preventDefault();
    this.setState({editState: true});
  },
  save: function(e){
    e.preventDefault();
    this.setState({editState: false});
  },
  delete: function(model, e){
    e.preventDefault();
    this.props.handleDeleteQuote(model);


  },
  renderQuoteInfoDisplay: function(quoteInfo){
    return (
      <div className="col s12 viewQuote">
        <div className="card-panel white">
          <blockquote>
            {quoteInfo.quote}
          </blockquote>
          <p>{quoteInfo.author}</p>
          <div className="right-align">
            <a onClick={this.delete.bind(this, quoteInfo)} className="btn-floating btn-small red">
              <i className="large material-icons">delete</i>
            </a>
            <a onClick={this.edit.bind(this, quoteInfo)} className="btn-floating btn-small blue">
              <i className="large material-icons">mode_edit</i>
            </a>

          </div>

        </div>
      </div>
    );
  },

  renderEditPage: function(quoteInfo){
    return (
      <div className="col s12 editQuote">
        <div className="card-panel white">
          <div className="input-field">
            <i className="small material-icons prefix">mode_edit</i>
            <textarea placeholder={quoteInfo.quote} id="editquote" type="text" className="materialize-textarea validate"></textarea>
            <label htmlFor="textarea1">Edit Your quote</label>
            <div className="right-align">
              <a onClick={this.save} className="btn-floating btn-large green" type="submit">
                <i className="large material-icons">done</i>
              </a>
            </div>
          </div>
        </div>
      </div>
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
      display = <div />
    }
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

            {display}

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
