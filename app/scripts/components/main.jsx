//3rd party
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
require('backbone-react-component');

var MainPageComponent = React.createClass({
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
        <li key={quote.quote_id}>
          <div className="collapsible-header truncate quote">{quote.quote}</div>
          <a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons right">send</i></a>
        </li>
      );
    });
    return (
      <div className="row">
        <div className="col s5">
            <ul className="collection with-header">
              <li className="collection-header"><h4>List of Quotes</h4></li>
              {quotes}
            </ul>
        </div>


        <div className="col s7">
          <div className="row">
            <div className="col s12 viewQuote">
              <div className="card-panel white">

              </div>
            </div>
            <div className="col s12 genQuote">
                <div className="card-panel white">
                  <form className="login-form row" onSubmit={this.props.handleCreateQuote}>
                    <div className="input-field col s12">
                      <i className="material-icons prefix">mode_edit</i>
                      <textarea id="quote" className="materialize-textarea"></textarea>
                      <label htmlFor="quote">Quote</label>
                    </div>

                    <div className="input-field col s6">
                      <input id="author" type="text" className="validate" />
                      <label htmlFor="author">Author</label>
                    </div>

                    <div className="input-field col s6">
                      <button className="btn waves-effect waves-light" type="submit">Submit
                        <i className="material-icons right">send</i>
                      </button>
                    </div>


                  </form>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MainPageComponent;
