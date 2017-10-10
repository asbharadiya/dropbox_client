import React, { Component } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions/asset';

class ItemRow extends Component {

  constructor(props){
    super(props);
    this.goToFolder = this.goToFolder.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.downloadAsset = this.downloadAsset.bind(this);
    this.deleteAsset = this.deleteAsset.bind(this);
    this.addAssetToStarred = this.addAssetToStarred.bind(this);
    this.removeAssetFromStarred = this.removeAssetFromStarred.bind(this);
    this.notificationSystem = null;
  }

  componentDidMount(){
    this.notificationSystem = this.refs.notificationSystem;
  }

  goToFolder(item){
    let location = this.props.location.pathname.split("/");
    if(location[location.length-1] === "home" || location[location.length-1] === "files"){
        this.props.history.push("folders/"+item.owner+"/"+item.name);
    } else {
      this.props.history.push(this.props.location.pathname+"/"+item.name);
    }
  }

  handleRowClick(){
    if(this.props.item.is_directory === 0){
      //download file
      this.downloadAsset();
    } else {
      this.goToFolder(this.props.item);
    }
  }

  downloadAsset(){
    //download asset
    let superParent = null
    let location = this.props.location.pathname.split("/");
    if(location[location.length-1] !== "home" && location[location.length-1] !== "files" && location[location.length-1] !== "groups"){
        superParent = location[3];
    }
    if(superParent === null) {
      window.open("http://localhost:3001/api/download_asset/"+this.props.item.id,"_blank");
    } else {
      window.open("http://localhost:3001/api/download_asset/"+this.props.item.id+"/"+superParent,"_blank");
    }
  }

  deleteAsset(){
    //delete asset
    this.props.deleteAsset(this.props.item.id);
  }

  addAssetToStarred(){
    //add asset to starred
    this.props.starAsset(this.props.item.id,true);
  }

  removeAssetFromStarred(){
    //remove asset from starred
    this.props.starAsset(this.props.item.id,false);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.deleteAssetSuccess){
      this.notificationSystem.addNotification({
        message: 'Successfully deleted',
        level: 'success'
      });
    } else {
      this.notificationSystem.addNotification({
        message: 'Opps! Something went wrong',
        level: 'error'
      });
    }
    if(nextProps.addAssetToStarredSuccess){
        this.notificationSystem.addNotification({
          message: 'Successfully added to starred',
          level: 'success'
        });
    } else {
        this.notificationSystem.addNotification({
          message: 'Opps! Something went wrong',
          level: 'error'
        });
    }
    if(nextProps.removeAssetFromStarredSuccess){
        this.notificationSystem.addNotification({
          message: 'Successfully removed from starred',
          level: 'success'
        });
    } else {
        this.notificationSystem.addNotification({
          message: 'Opps! Something went wrong',
          level: 'error'
        });
    }
  }

	render() {
		return (
  		<div className="item-row" id="itemRow">
    		<div className="item-icon">
          {
            this.props.item.is_directory ? (
              <i className="fa fa-folder fa-3x" aria-hidden="true"></i>
            ) : (
              <i className="fa fa-file fa-3x" aria-hidden="true"></i>
            )
          }
    		</div>
    		<div className="item-content">
    			<p className="item-title" onClick={this.handleRowClick}>{this.props.item.name}</p>
    			<div className="item-star">
    				{	
    					this.props.item.is_starred ? (
    						<button className="star" onClick={this.removeAssetFromStarred}><i className="fa fa-lg fa-star" aria-hidden="true"></i></button>
    					) : (
    						<button className="not-star" onClick={this.addAssetToStarred}><i className="fa fa-lg fa-star-o" aria-hidden="true"></i></button>
    					)
    				}
    			</div>
    		</div>
        <div className="item-options">
          {
            this.props.item.is_directory === 1 && this.props.item.can_delete_or_share === 0 ? (
              <div></div>
            ) : (
        			<NavDropdown 
        				title={
        					<button className="btn btn-primary btn-dropbox"><i className="fa fa-ellipsis-h" aria-hidden="true"></i></button>
        				} 
        				id="user-dropdown"
        				eventKey={1} >
                {  
                  this.props.item.is_directory === 0 &&
    		            <MenuItem eventKey={1.1} onClick={this.downloadAsset}>Download</MenuItem>
                }
    		        {
                  this.props.item.can_delete_or_share === 1 &&
                    <MenuItem eventKey={1.2}>Share</MenuItem>
                }
                {
                  this.props.item.can_delete_or_share === 1 &&
    		            <MenuItem eventKey={1.3} onClick={this.deleteAsset}>Delete</MenuItem>
                }
    	        </NavDropdown>
            )
          }
        </div>
        <NotificationSystem ref="notificationSystem" />
	    </div>
  	);
	}
}

function mapStateToProps(state) {
    return {
        deleteAssetSuccess:state.deleteAssetSuccess,
        addAssetToStarredSuccess:state.addAssetToStarredSuccess,
        removeAssetFromStarredSuccess:state.removeAssetFromStarredSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteAsset : (id) => dispatch(actions.deleteAsset(id)),
        starAsset : (id,isStarred) => dispatch(actions.starAsset(id,isStarred))
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <ItemRow {...props}/>));
