import React, { Component } from 'react';
import HomeSection from './homesection';
import RightContent from './rightcontent';
import * as api from '../../api/test';

class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
			starred:[],
			recent:[]
		}
	}

	componentDidMount(){
		api.getDashboardData().then((res) => {
			this.setState({
				starred:res.starred,
				recent:res.recent
			})
        });
	}

  	render() {
  		return (
      		<div className="inner-page-content has-right-content">
      			<div className="homepage">
	        		<HomeSection title="Starred" data={this.state.starred}/>
	        		<HomeSection title="Recent" data={this.state.recent}/>
        		</div>
        		<RightContent/>
      		</div>
    	);
  	}
}

export default Home;
