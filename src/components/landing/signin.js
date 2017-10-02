import React, { Component } from 'react';

class Signin extends Component {
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
	        			<button className="btn btn-primary btn-dropbox">Sign in</button>
	        		</div>
        		</div>
      		</div>
    	);
  	}
}

export default Signin;
