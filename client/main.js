import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom'


import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});


var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});


export default class  App extends Component{
    constructor(props){
      super(props)
      this.state={
        text:'',
        some:'well'
      }
    }
    textChange(e){
      this.setState({ text: e.target.value })
    };
    render() {
        return <div>
                  <input value={this.state.text} onChange={ this.textChange.bind(this) }/>
                  { this.state.text } length: { this.state.text.length}
                  <LikeButton />
              </div>
    }
}

App.propTypes= {
    text: PropTypes.string,
},

Meteor.startup(() => {
 render(
        <App />,
        document.getElementById('app')
      );
})

