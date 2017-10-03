import React, { Component } from 'react';
import ItemRow from './itemrow';
import RightContent from './rightcontent';
import * as api from '../../api/test';

class Files extends Component {

	constructor(props){
		super(props);
		this.state = {
			files:[]
		}
	}

	componentDidMount(){
		api.getFilesData().then((res) => {
			this.setState({
				files:res.files
			})
        });
	}

  	render() {
  		return (
      		<div className="inner-page-content has-right-content">
      			<div className="filespage">
      				<div className="page-header">
		    			
		    		</div>
      				{
	        			this.state.files.map(function(item,index) {
		                    return (
		                      	<ItemRow key={index} item={item}/>
		                    );
		                })
		            }
        		</div>
        		<RightContent pagetype="files"/>
      		</div>
    	);
  	}
}

export default Files;
