import React, { Component } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions/asset';

class ItemRow extends Component {

  constructor(props){
    super(props);
    this.goToFolder = this.goToFolder.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.downloadFolder = this.downloadFolder.bind(this);
    this.deleteAsset = this.deleteAsset.bind(this);
    this.addAssetToStarred = this.addAssetToStarred.bind(this);
    this.removeAssetFromStarred = this.removeAssetFromStarred.bind(this);
  }

  goToFolder(folder){
    let location = this.props.location.pathname.split("/");
    if(location[location.length-1] === "home" || location[location.length-1] === "files"){
        this.props.history.push("folders/"+folder);
    } else {
      this.props.history.push(this.props.location.pathname+"/"+folder);
    }
  }

  handleRowClick(){
    if(this.props.item.is_directory === 0){
      //download file
    } else {
      this.goToFolder(this.props.item.name);
    }
  }

  downloadFolder(){
    //download folder
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
      //TODO: show notification that asset deleted successfully
    } else {
      //TODO: show notification that asset delete failed
    }
    if(nextProps.addAssetToStarredSuccess){
        //TODO: show notification that asset added to starred successfully
    } else {
        //TODO: show notification that adding asset to starred failed
    }
    if(nextProps.removeAssetFromStarredSuccess){
        //TODO: show notification that asset removed from starred successfully
    } else {
        //TODO: show notification that removing asset from starred failed
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
    			<NavDropdown 
    				title={
    					<button className="btn btn-primary btn-dropbox"><i className="fa fa-ellipsis-h" aria-hidden="true"></i></button>
    				} 
    				id="user-dropdown"
    				eventKey={1} >
            {  
              this.props.item.is_directory === 1 &&
		            <MenuItem eventKey={1.1} onClick={this.downloadFolder}>Download</MenuItem>
            }
		        <MenuItem eventKey={1.2}>Share</MenuItem>
            {
              this.props.item.can_delete === 1 &&
		            <MenuItem eventKey={1.3} onClick={this.deleteAsset}>Delete</MenuItem>
            }
	        </NavDropdown>
    	  </div>
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
