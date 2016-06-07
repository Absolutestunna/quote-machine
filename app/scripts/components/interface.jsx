//3rd party
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
require('backbone-react-component');
var $ = require('jquery');

//local lifecycle components
var LoginPageComponent = require('./login.jsx');
var MainPageComponent = require('./main.jsx');

var Interface = React.createClass({
  // React lifecycle components
  getInitialState: function(){
    return {
      router: this.props.router,
      quotes: [],
      selQuote: {},
      randomQuote: {},
      authStatus: {}
    }
  },
  getDefaultProps: function(){
    return {
      auth_url: 'http://104.131.203.140:3000/api/',
      quote_url: 'http://104.131.203.140:3000/api/tesla/quotes/',
      createQuote_url: 'http://104.131.203.140:3000/api/tesla/'
    }
  },
  componentWillMount: function(){
    this.callback = (function(){
     this.forceUpdate();
    }).bind(this);
    this.state.router.on('route', this.callback);
  },
  componentWillUnmount: function(){
    this.state.router.off('route', this.callback);
  },


  // Custom functions

  handleLogin: function(e){
    e.preventDefault();
    this.handleAuthentication();
  },
  handleAuthentication: function(e){
    var self = this;
    var user = $('#username').val() || 'josh';
    var pass = $('#password').val() || 'jabu';
    $.post(this.props.auth_url + 'authenticate',
    {
      "user": user,
      "pass": pass
    },
    function (result) {
      self.setState({authStatus: result});
      if (result.msg === "Successful auth") {
        Backbone.history.navigate('mainPage', {trigger: 'true'});
      } else {
        console.log('error', result);
      }
    }.bind(this));
  },

  handleGetQuotes: function(auth){
    var self = this;
    $.ajax({
      url: this.props.quote_url,
      headers: {
          'x-Auth-token': this.state.authStatus.token || auth,
          'Content-Type':'application/json'
      },
      method: 'GET',
      dataType: 'json',
      success: function(data){
        if (data.msg === "Not authenticated."){
          self.handleAuthentication();
        }
        self.setState({quotes: data});
      },
      error: function(error){
        console.log('error msg', error);
      }
    });
  },

  handleCreateQuote: function(e){
      e.preventDefault();
      var self = this;
      var quote = $('#quote').val();
      var author = $('#author').val()
      $.ajax({
        url: this.props.quote_url,
        contentType: 'application/json',
        headers: {
            'x-Auth-token': self.state.authStatus.token
        },
        data: JSON.stringify({
            'quote': quote,
            'author': author
        }),
        method: 'POST',
        dataType: 'json',
      }).done(function(log){
          self.state.quotes.push(log.quote);
          self.setState({quotes: self.state.quotes});
          $('#quote').val('');
          $('#author').val('');

      }).error(function(error){
        console.log('error msg', error);

      });

  },
  handleDisplayQuoteInfo: function(model){
    this.setState({selQuote: model})
  },
  handleGetRandomQuote: function(){
    var self = this;
    $.ajax({
      url: this.props.quote_url + 'random',
      contentType: 'application/json',
      headers: {
          'x-Auth-token': self.state.authStatus.token
      },
      method: 'GET',
      dataType: 'json',
    }).done(function(log){
      console.log('randome quote created ', log);
      self.setState({randomQuote: log});
    }).error(function(error){
      console.log('randome msg error msg', error);

    });
  },
  handleDeleteQuote: function(quoteInfo){
    var self = this;
    var id = quoteInfo.quote_id;
    $.ajax({
      url: this.props.quote_url + id,
      contentType: 'application/json',
      headers: {
          'x-Auth-token': self.state.authStatus.token
      },
      method: 'DELETE',
      dataType: 'json',
    }).done(function(log){
      var newQuotes = self.state.quotes.filter(function(obj) {
        return obj.quote_id !== id;
      });
      self.setState({quotes: newQuotes});
      $('#blockquote').html('');
      $('#block-author').html('');
    }).error(function(error){
      console.log('delete msg error msg', error);
    });
  },
  handleSaveQuote: function(quoteInfo){
    var self = this;
    var id = quoteInfo.quote_id;
    console.log('token for save', self.state.authStatus.token);
    $.ajax({
      url: this.props.quote_url + id,
      contentType: 'application/json',
      headers: {
          'x-Auth-token': self.state.authStatus.token
      },
      data: JSON.stringify({
        'quote': $('#editquote').val(),
        'author': $('#editAuthor').val() || quoteInfo.author
      }),
      method: 'PUT',
      dataType: 'json',
    }).done(function(log){
      console.log('edit log', log);
      var newQuoteObj = {
        'quote_id': quoteInfo.quote_id,
        'quote': $('#editquote').val(),
        'author': $('#editAuthor').val() || quoteInfo.author
      }
      var obj = self.state.quotes.push(newQuoteObj);
      self.setState({quotes: obj});
      console.log('quoteList1', self.state.quotes.length);
    }).error(function(error){

      console.log('edit msg error msg', error);
    });
  },

  //render components

  render: function(){
    var currentComponent;
    var route = this.props.router;
    if (route.current == 'signInPage'){
      currentComponent = <LoginPageComponent
        handleLogin={this.handleLogin}
        />
    } else if (route.current == 'mainPage'){
      currentComponent = <MainPageComponent
        authStatus = {this.state.authStatus}
        handleLogin={this.handleLogin}
        handleAuthentication = {this.handleAuthentication}
        quotes={this.state.quotes}
        handleGetQuotes={this.handleGetQuotes}
        handleCreateQuote={this.handleCreateQuote}
        handleDisplayQuoteInfo={this.handleDisplayQuoteInfo}
        selQuote={this.state.selQuote}
        handleGetRandomQuote = {this.handleGetRandomQuote}
        randomQuote = {this.state.randomQuote}
        handleDeleteQuote = {this.handleDeleteQuote}
        handleSaveQuote = {this.handleSaveQuote}
        />
    }
    return (
      <div>
        {currentComponent}
      </div>
    );
  }
});

module.exports = Interface;
