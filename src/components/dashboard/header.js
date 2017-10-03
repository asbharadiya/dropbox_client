import React, { Component } from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';

class Header extends Component {

	constructor(props) {
        super(props);
        this.handleLink = this.handleLink.bind(this);
        let location = props.location.pathname.split("/");
        location.shift();
        this.state = {
          location: location
        }
    }
    
    handleLink(path) {
      this.props.history.push(path);
    }

    componentWillReceiveProps(nextProps){
      let location = nextProps.location.pathname.split("/");
      location.shift();
      this.setState({
        location: location
      });
    }

  	render() {
      const location = this.state.location;
      return (
      		<header>
      			<div className="page-title-container">
      				<h1>
                {
                  location[0] === 'files' ? (
                    location.length === 1 ? (
                      'Dropbox'
                    ) : (
                      location.map(function(path,index) {
                        let breadcrumb = null;
                        let subpath = location.slice(0,index+1);
                        index === 0 ? (
                          breadcrumb = <span key={index}><NavLink to="/files">Dropbox</NavLink></span>
                        ) : index === location.length-1 ? (
                          breadcrumb = <span key={index}><span className="breadcrumb-arrow"> > </span><span>{path}</span></span>
                        ) : (
                          breadcrumb = <span key={index}><span className="breadcrumb-arrow"> > </span><NavLink to={`/${subpath.join("/")}`}>{path}</NavLink></span>
                        )
                        return breadcrumb;
                      })
                    )
                  ) : location[0] === 'account' ? (
                    'Account Settings'
                  ) : (
                    'Home'
                  )
                }
              </h1>
      			</div>
      			<div className="topnav-container">
	      			<Nav>
				        <NavDropdown eventKey={1} title={
                    <div className="div-circular">
                      <img src="/assets/images/faceholder.png" alt="user" />
                    </div>
                  } 
                  id="user-dropdown">
                  <MenuItem eventKey={1.1} className="user-label">Ankit Bharadiya</MenuItem>
                  <MenuItem divider/>
					        <MenuItem eventKey={1.2} onClick={()=>this.handleLink("/account")}>Account Settings</MenuItem>
					        <MenuItem eventKey={1.3}>Logout</MenuItem>
				        </NavDropdown>
				    </Nav>
      			</div>
      		</header>
    	);
  	}
}

export default withRouter(props => <Header {...props}/>);
