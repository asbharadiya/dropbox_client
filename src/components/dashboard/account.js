import React, { Component } from 'react';
import RightContent from './rightcontent';

class Account extends Component {

	constructor(props){
		super(props);
	}

  	render() {
  		return (
      		<div className="inner-page-content has-right-content">
      			<div className="accountspage">
      				<div className="page-header">
		    			
		    		</div>
        		</div>
        		<RightContent pagetype="account"/>
      		</div>
    	);
  	}
}

export default Account;
