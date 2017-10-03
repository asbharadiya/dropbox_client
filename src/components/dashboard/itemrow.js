import React, { Component } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';

class ItemRow extends Component {
  	render() {
  		return (
      		<div className="item-row">
          		<div className="item-icon">
          			<img src="/assets/images/logo_icon.svg" alt="item_icon"/>
          		</div>
          		<div className="item-content">
          			<p className="item-title">{this.props.item.name}</p>
          			<div className="item-star">
          				{	
          					this.props.item.isStarred ? (
          						<button className="star"><i className="fa fa-lg fa-star" aria-hidden="true"></i></button>
          					) : (
          						<button className="not-star"><i className="fa fa-lg fa-star-o" aria-hidden="true"></i></button>
          					)
          				}
          			</div>
          		</div>
          		<div className="item-options">
          			<NavDropdown 
          				title={
          					<button className="btn btn-primary btn-dropbox"><i className="fa fa-ellipsis-h" aria-hidden="true"></i></button>
          				} 
          				id="user-dropdown"
          				eventKey={1} >
				        <MenuItem eventKey={1.1}>Download</MenuItem>
				        <MenuItem eventKey={1.2}>Share</MenuItem>
				        <MenuItem eventKey={1.3}>Delete</MenuItem>
			        </NavDropdown>
          		</div>
			</div>
    	);
  	}
}

export default ItemRow;
