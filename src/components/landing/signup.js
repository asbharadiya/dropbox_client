import React, { Component } from 'react';

class Signup extends Component {
  	render() {
    	return (
      		<div className="signup-form">
        		<div className="form-header">
        			<p className="title">Create an account</p>
        			<p className="subscript">
        				or <a onClick={this.props.onSigninClick}>log in</a>
        			</p>
        		</div>
        		<div className="form-body">
        			<div className="form-group">
	        			<input type="text" className="form-control" placeholder="First Name"/>
	        		</div>
	        		<div className="form-group">
	        			<input type="text" className="form-control" placeholder="Last Name"/>
	        		</div>
	        		<div className="form-group">
	        			<input type="text" className="form-control" placeholder="Email"/>
	        		</div>
	        		<div className="form-group">
	        			<input type="password" className="form-control" placeholder="Password"/>
	        		</div>
	        		<div className="form-group btn-container">
	        			<button className="btn btn-primary btn-dropbox">Create an account</button>
	        		</div>
        		</div>
      		</div>
    	);
  	}
}

export default Signup;
