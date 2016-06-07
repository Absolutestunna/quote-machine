//3rd party
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
require('backbone-react-component');


var RandomQuoteComponent = React.createClass({

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
      <div className="col s12 randomQuote">
        <div className="card-panel white">
          <div className="row">
            <h4 className="col s8 left-align">Random quote</h4>
            <div className="col s4 center-align">
              <a onClick={this.props.handleGetRandomQuote} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>
            </div>

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
