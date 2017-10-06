import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import * as actions from '../../actions/asset';

class RightContent extends Component {

    constructor(props) {
        super(props);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleFileClick = this.handleFileClick.bind(this);
        this.openNewFolder = this.openNewFolder.bind(this);
        this.createNewFolder = this.createNewFolder.bind(this);
        this.closeNewFolder = this.closeNewFolder.bind(this);
        this.state = {
            showModal: false,
            newFolderError: "",
            newFolderFormError: ""
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.addFolderSuccess){
            this.closeNewFolder();
            //TODO: show notification that folder added successfully
        } else {
            this.setState({
                newFolderError: "Opps! Please try again"
            });
        }
        if(nextProps.uploadFileSuccess){
            //TODO: show notification that file uploaded successfully
        } else {
            //TODO: show notification that file upload failed
        }
    }

    handleFileClick() {
        document.getElementById("fileUpload").value = null;
    }

    handleFileUpload() {
        let files = document.getElementById("fileUpload").files;
        let parent = null;
        let location = this.props.location.pathname.split("/");
        if(location[location.length-1] !== "home" && location[location.length-1] !== "files"){
            parent = location[location.length-1];
        }
        this.props.addAsset(files[0],false,parent,null);
    }

    openNewFolder() {
        this.setState({ showModal: true });
    }

    closeNewFolder() {
        this.setState({ showModal: false });
    }

    createNewFolder() {
        this.setState({
            newFolderError: "",
            newFolderFormError: ""
        });
        let isValid = true;
        if(this.folderName.value === "") {
            isValid = false;
            this.setState({
                newFolderError: "Please enter folder name"
            });
        }
        if(isValid) {
            let parent = null;
            let location = this.props.location.pathname.split("/");
            if(location[location.length-1] !== "home" && location[location.length-1] !== "files"){
                parent = location[location.length-1];
            }
            this.props.addAsset(null,true,parent,this.folderName.value);
        }
    }

	render() {
        return (
        	<div className="right-content">
        		<div className="right-content-inner">
        			{
        				this.props.pagetype === "home" ? (
                            <div className="input-file-wrapper">
                                <button className="btn btn-primary btn-dropbox btn-main">Upload files</button>
                                <input type="file" id="fileUpload" name="upload" onChange={this.handleFileUpload} onClick={this.handleFileClick}/>
                            </div>
        				) : this.props.pagetype === "files" ? (
        					<div>
                                <div className="input-file-wrapper">
                                    <button className="btn btn-primary btn-dropbox btn-main">Upload files</button>
                                    <input type="file" id="fileUpload" name="upload" onChange={this.handleFileUpload} onClick={this.handleFileClick}/>
                                </div>
                                <ul className="secondary-menu">
        							<li className="menu-element">
        								<a onClick={this.openNewFolder}>
        									<i className="fa fa-folder-o" aria-hidden="true"></i>
        									<span>New folder</span>
        								</a>
        							</li>
        						</ul>
                                <Modal isOpen={this.state.showModal} onRequestClose={this.closeNewFolder} closeTimeoutMS={500}
                                    className={{
                                        base: 'newFolderModal',
                                        afterOpen: 'newFolderModal_after-open',
                                        beforeClose: 'newFolderModal_before-close'
                                    }}
                                    overlayClassName={{
                                        base: 'newFolderModalOverlay',
                                        afterOpen: 'newFolderModalOverlay_after-open',
                                        beforeClose: 'newFolderModalOverlay_before-close'
                                    }}>
                                    <div className="form-group">
                                        <span className="error">{this.state.newFolderError}</span>
                                        <input type="text" className="form-control" placeholder="New folder name" ref={(folderName) => this.folderName = folderName}/>
                                    </div>
                                    <div className="form-group btn-container">
                                        <span className="error">{this.state.newFolderFormError}</span>
                                        <button className="btn btn-primary btn-dropbox" onClick={this.createNewFolder}>Done</button>
                                        <button className="btn btn-default btn-dropbox-default" onClick={this.closeNewFolder}>Cancel</button>
                                    </div>
                                </Modal>
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

function mapStateToProps(state) {
    return {
        addFolderSuccess:state.addFolderSuccess,
        uploadFileSuccess:state.uploadFileSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addAsset : (file,isDir,parent,name) => dispatch(actions.addAsset(file,isDir,parent,name))
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <RightContent {...props}/>));
