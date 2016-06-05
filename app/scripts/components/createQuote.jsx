//3rd party
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
require('backbone-react-component');

var CreateQuoteComponent = React.createClass({
  render: function(){
    return (
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
    );
  }
});

module.exports = CreateQuoteComponent;
