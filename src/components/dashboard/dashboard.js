import React, { Component } from 'react';
import Header from './header';
import Sidebar from './sidebar';

class Dashboard extends Component {
  	render() {
    	return (
      		<div className="dashboard-page">
      			<Header/>
      			<Sidebar/>
      			<div className="page-content">
      				{this.props.children}
      			</div>
      		</div>
    	);
  	}
}

export default Dashboard;
