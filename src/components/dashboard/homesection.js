import React, { Component } from 'react';

class HomeSection extends Component {
  	render() {
  		return (
      		<div className="home-section">
        		<div className="section-header">
        			{this.props.title}
        		</div>
        		{
        			this.props.data.map(function(item,index) {
	                    return (
	                      	<div className="section-item" key={index}>
	                      		<div className="item-icon">
	                      			<img src="/assets/images/logo_icon.svg" alt="item_icon"/>
	                      		</div>
	                      		<div className="item-content">
	                      			<p className="item-title">{item.name}</p>
	                      			<div className="item-star">
	                      				{	
	                      					item.isStarred ? (
	                      						<button className="star"><i class="fa fa-lg fa-star" aria-hidden="true"></i></button>
	                      					) : (
	                      						<button className="not-star"><i class="fa fa-lg fa-star-o" aria-hidden="true"></i></button>
	                      					)
	                      				}
	                      			</div>
	                      		</div>
	                      		<div className="item-options">
	                      			<button className="btn btn-primary btn-dropbox">Ops</button>
	                      		</div>
        					</div>
	                    );
	                })
	            }
      		</div>
    	);
  	}
}

export default HomeSection;
