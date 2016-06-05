//3rd party
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
require('backbone-react-component');

var RandomQuoteComponent = React.createClass({
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
      <div className="col s12 randomQuote">
        <div className="card-panel white">
          <div className="row">
            <h2 className="col s8 left-align">Random Quote of the day</h2>
            <span className="col s4 center-align"><a onClick={this.props.handleGetRandomQuote} className="btn-floating btn-large waves-effect waves-light red col s4 right-align"><i className="material-icons">add</i></a>
            </span>
          </div>
          <blockquote>
            {this.state.quoteInfo.quote}
          </blockquote>
          <p>{this.state.quoteInfo.author}</p>
        </div>

      </div>
    );
  }
});

module.exports = RandomQuoteComponent;
