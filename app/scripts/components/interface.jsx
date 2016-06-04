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
      quotes: []
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


  handleAuthentication: function(e){
    e.preventDefault();
    $.post(this.props.auth_url + 'authenticate',
    {
      "user": $('#username').val(),
      "pass": $('#password').val()
    },
    function (result) {
      this.authToken = result.token;
      if (result.msg === "Successful auth") {
        alert('authenticated');
        console.log(result);
        Backbone.history.navigate('mainPage', {trigger: 'true'});
      } else {
        alert('not authenticated');
        console.log('error', result);
      }
    }.bind(this));
  },

  handleGetQuotes: function(){
    var self = this;

    $.ajax({
      url: this.props.quote_url,
      headers: {
          'x-Auth-token': self.authToken,
          'Content-Type':'application/json'
      },
      method: 'GET',
      dataType: 'json',
      success: function(data){
        console.log('succes: ', data);
        self.setState({quotes: data});
      },
      error: function(error){
        console.log('error msg', error);
      }
    });
  },

  handleCreateQuote: function(e){
    e.preventDefault();
    $.post(this.props.quote_url + 'posts',
      {
        quote: $('#quote').val(),
        author: $('#author').val()
      },
      function (result) {
        console.log('post result', result);
      }.bind(this));


  },

  //render components

  render: function(){
    var currentComponent;
    var route = this.props.router;
    if (route.current == 'signInPage'){
      currentComponent = <LoginPageComponent
        handleAuthentication={this.handleAuthentication}
        />
    } else if (route.current == 'mainPage'){
      currentComponent = <MainPageComponent
        handleGetQuotes={this.handleGetQuotes}
        handleCreateQuote={this.handleCreateQuote}
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
