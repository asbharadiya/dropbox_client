import React, { Component } from 'react';

class RightContent extends Component {
  	render() {
  		return (
      	<div className="right-content">
      		<div className="right-content-inner">
      			{
      				this.props.pagetype === "home" ? (
      					<div><button className="btn btn-primary btn-dropbox btn-main">Upload files</button></div>
      				) : this.props.pagetype === "files" ? (
      					<div>
      						<button className="btn btn-primary btn-dropbox btn-main">Upload files</button>
      						<ul className="secondary-menu">
      							<li className="menu-element">
      								<a>
      									<i className="fa fa-folder-o" aria-hidden="true"></i>
      									<span>New folder</span>
      								</a>
      							</li>
      						</ul>
      					</div>
      				) : (
      					<div></div>
      				)
      			}
      		</div>
        </div>
    	);
  	}
}

export default RightContent;
