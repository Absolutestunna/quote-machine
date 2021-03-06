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
      <div className="col s12 viewQuote">
        <div className="card-panel white">
          <blockquote id="blockquote">
            {quoteInfo.quote || "Please select a quote"}
          </blockquote>
          <p id="block-author">{quoteInfo.author}</p>
          <div className="right-align feature-buttons">
            <a onClick={this.delete.bind(this, quoteInfo)} className="delete btn-floating btn-small red">
              <i className="large material-icons">delete</i>
            </a>
            <a onClick={this.edit.bind(this, quoteInfo)} className="edit btn-floating btn-small blue">
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
            <textarea placeholder={quoteInfo.quote} id="editquote" type="text" className="materialize-textarea validate">
            </textarea>
            <input id="editAuthor" placeholder={quoteInfo.author} type="text" className="validate"/>
            <div className="right-align">
              <a onClick={this.save.bind(this, quoteInfo)} className="btn-floating btn-large green" type="submit">
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
        <div className="col xs12 s12 m5 l5 xl5">
            <ul className="collection with-header listquotes">
              <li className="collection-header"><h4>List of Quotes</h4></li>
              {this.state.quotes}
            </ul>
        </div>

        <div className="col xs12 s12 m7 l7">
          <div className="row">
            {display}
            <CreateQuoteComponent
              handleCreateQuote = {this.props.handleCreateQuote}
              />
            <RandomQuoteComponent
              authToken = {this.props.authToken}
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
