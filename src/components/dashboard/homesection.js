import React, { Component } from 'react';
import ItemRow from './itemrow';

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
	                      	<ItemRow key={index} item={item}/>
	                    );
	                })
	            }
      		</div>
    	);
  	}
}

export default HomeSection;
