import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

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
      console.log('in app')
        return <div>
          <Link to="/listpage" >Lists</Link>
                  <input value={this.state.text} onChange={ this.textChange.bind(this) }/>
                  { this.state.text } length: { this.state.text.length}
              </div>
    }
}

App.propTypes= {
    text: PropTypes.string,
}
