import React, { Component } from 'react';
import * as api from '../../api/test';

class Signin extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    api.login({"username":"test","password":"test"})
    .then((status) => {
      if (status === 200) {
        this.props.history.push("/home");
      } else if (status === 401) {
        
      }
    });
  };

	render() {
  	return (
    		<div className="signin-form">
      		<div className="form-header">
      			<p className="title">Sign in</p>
      			<p className="subscript">
      				or <a onClick={this.props.onSignupClick}>create an account</a>
      			</p>
      		</div>
      		<div className="form-body">
        		<div className="form-group">
        			<input type="text" className="form-control" placeholder="Email"/>
        		</div>
        		<div className="form-group">
        			<input type="password" className="form-control" placeholder="Password"/>
        		</div>
        		<div className="form-group btn-container">
        			<button className="btn btn-primary btn-dropbox" onClick={this.handleSubmit}>Sign in</button>
        		</div>
      		</div>
    		</div>
  	);
	}
}

export default Signin;
