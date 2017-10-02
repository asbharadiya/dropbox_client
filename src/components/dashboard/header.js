import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';

class Header extends Component {

	constructor(props) {
        super(props);
        this.handleLink = this.handleLink.bind(this);
    }
    
    handleLink(path) {
        //this.props.history.push(path);
    }

  	render() {
    	return (
      		<header>
      			<div className="page-title-container">
      				<h1>Placeholder</h1>
      			</div>
      			<div className="topnav-container">
	      			<Nav>
				        <NavDropdown eventKey={1} title="User Name">
					        <MenuItem eventKey={1.1} onClick={()=>this.handleLink("settings")}>Settings</MenuItem>
					        <MenuItem eventKey={1.2}>Logout</MenuItem>
				        </NavDropdown>
				    </Nav>
      			</div>
      		</header>
    	);
  	}
}

export default Header;
