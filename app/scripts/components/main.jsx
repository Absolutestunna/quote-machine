//3rd party
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
require('backbone-react-component');

var MainPageComponent = React.createClass({
  componentDidMount: function(){
    console.log('main comp has been rendered');
    this.props.handleGetQuotes();
  },

  render: function(){
    return (
      <div className="row">
        <div className="col s4">
          <h3>List of Quotes</h3>
        </div>


        <div className="col s8">
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
