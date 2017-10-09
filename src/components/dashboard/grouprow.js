import React, { Component } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import Autocomplete from 'react-autocomplete';
import * as actions from '../../actions/group';
import * as api from '../../api/group';

class GroupRow extends Component {

  constructor(props){
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.updateGroup = this.updateGroup.bind(this);
    this.loadModalData = this.loadModalData.bind(this);
    this.closeViewGroup = this.closeViewGroup.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.addMember = this.addMember.bind(this);
    this.removeMember = this.removeMember.bind(this);
    this.state = {
      showViewGroupModal: false,
      name: "",
      members: [],
      searchValue: "",
      // Data that will be rendered in the autocomplete
      // As it is asynchronous, it is initially empty
      autocompleteData: []
    }
    // Bind `this` context to functions of the class
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.getItemValue = this.getItemValue.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
  }

  handleRowClick(){
    //view group modal
    this.setState({ showViewGroupModal: true });
  }

  deleteGroup(){
    //delete group
    this.props.deleteGroup(this.props.group.id);
  }

  updateGroup(){
    this.setState({
        groupNameError: ""
    });
    if(this.state.name !== '') {
      this.props.updateGroup(this.state.name,this.props.group.id);
    } else {
      this.setState({
        groupNameError: "Please enter group name"
      })
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.getGroupByIdData === undefined || nextProps.getGroupByIdData.group.id === nextProps.group.id){
      if(nextProps.deleteGroupSuccess){
        //TODO: show notification that group deleted successfully
      } else if(nextProps.deleteGroupSuccess === false) {
        //TODO: show notification that group delete failed
      }
      if(nextProps.getGroupByIdSuccess){
        this.setState({
          name: nextProps.getGroupByIdData.group.name,
          members: nextProps.getGroupByIdData.members,
          selectedUser: undefined,
          searchValue: ""
        });
      } else if(nextProps.getGroupByIdSuccess === false){
        //TODO: show notification that failed to load data
      }
      if(nextProps.updateGroupSuccess){
        //TODO: show notification that group updated successfully
      } else if(nextProps.updateGroupSuccess === false){
        this.setState({
          groupNameError: "Opps! Please try again"
        })
      }
      if(nextProps.addRemoveMemberSuccess){
        //TODO: show notification that member added
        this.props.getGroupById(this.props.group.id);
      } else if(nextProps.addRemoveMemberSuccess === false){
        //TODO: show notification that member adding failed
      }
    }
  }

  closeViewGroup(){
    this.setState({ showViewGroupModal: false });
  }

  loadModalData(){
    this.props.getGroupById(this.props.group.id);
  }

  handleNameChange(event){
    this.setState({
      name: event.target.value
    })
  }

  retrieveDataAsynchronously(input){
    api.searchUsers(input)
    .then((res) => {
      if (res.status === 200) {
        this.setState({
          autocompleteData: res.data
        });
      }
    });
  }

  onChange(e){
    this.setState({
      searchValue: e.target.value
    });
    this.retrieveDataAsynchronously(e.target.value);
  }

  onSelect(val,item){
      this.setState({
          searchValue: val,
          selectedUser: item.id
      });
  }

  renderItem(item, isHighlighted){
      return (
          <div
              className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
              key={item.id}
          >{item.user_name}</div>
      ); 
  }

  getItemValue(item){
    return `${item.user_name}`;
  }

  addMember(){
    if(this.state.selectedUser) {
      this.props.addRemoveMemberGroup(this.props.group.id,this.state.selectedUser,'ADD');
    }
  }

  removeMember(index){
    this.props.addRemoveMemberGroup(this.props.group.id,this.state.members[index].id,'REMOVE');
  }

	render() {
    var _this = this;
    return (
      <div>
    		<div className="group-row" id="groupRow">
      		<div className="group-content">
      			<p className="group-title" onClick={this.handleRowClick}>{this.props.group.name}</p>
      		</div>
      		<div className="group-options">
      			<NavDropdown 
      				title={
      					<button className="btn btn-primary btn-dropbox"><i className="fa fa-ellipsis-h" aria-hidden="true"></i></button>
      				} 
      				id="user-dropdown"
      				eventKey={1} >
              {
                this.props.group.can_delete === 1 &&
  		            <MenuItem eventKey={1.1} onClick={this.deleteGroup}>Delete</MenuItem>
              }
  	        </NavDropdown>
      	  </div>
  	    </div>
        <Modal isOpen={this.state.showViewGroupModal} onRequestClose={this.closeViewGroup} closeTimeoutMS={500} onAfterOpen={this.loadModalData}
          className={{
              base: 'viewGroupModal',
              afterOpen: 'viewGroupModal_after-open',
              beforeClose: 'viewGroupModal_before-close'
          }}
          overlayClassName={{
              base: 'viewGroupModalOverlay',
              afterOpen: 'viewGroupModalOverlay_after-open',
              beforeClose: 'viewGroupModalOverlay_before-close'
          }}>
          <div className="row">
              <span className="col-xs-12 error">{this.state.groupNameError}</span>
              <div className="col-xs-9">
                <input type="text" className="form-control" placeholder="Group name" value={this.state.name} onChange={this.handleNameChange}/>
              </div>
              <div className="col-xs-3 text-right">
                <button className="btn btn-primary btn-dropbox" onClick={this.updateGroup}>Save</button>
              </div>  
          </div>
          <hr/>
          <div className="members-container">
            <div className="row">
              <div className="col-xs-9">
                <Autocomplete
                    inputProps={{ id: 'states-autocomplete', className: 'form-control'}}
                    wrapperStyle={{ position: 'relative', display: 'inline-block', width: '100%' }}
                    getItemValue={this.getItemValue}
                    items={this.state.autocompleteData}
                    renderItem={this.renderItem}
                    value={this.state.searchValue}
                    onChange={this.onChange}
                    onSelect={this.onSelect}
                    renderMenu={children => (
                      <div className="menu">
                        {children}
                      </div>
                    )}
                />
              </div>
              <div className="col-xs-3 text-right">
                <button className="btn btn-primary btn-dropbox" onClick={this.addMember}>Add</button>
              </div>
            </div>
            <ul className="members-list">
              {
                this.state.members.map(function(member,index) {
                  return (
                    <li className="member-row" key={index}>
                      <div className="pull-left left-section">
                        <p className="member-name">{member.user_name}</p>
                        <p className="member-email">{member.email}</p>
                      </div>
                      <div className="pull-right right-section" onClick={() => _this.removeMember(index)}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </div>
                    </li>
                  );
                })
              }
            </ul>
          </div>
          <hr/>
          <div className="form-group footer">
              <button className="btn btn-default btn-dropbox-default" onClick={this.closeViewGroup}>Cancel</button>
          </div>
        </Modal>
      </div>
  	);
	}
}

function mapStateToProps(state) {
    return {
        deleteGroupSuccess:state.deleteGroupSuccess,
        getGroupByIdSuccess:state.getGroupByIdSuccess,
        getGroupByIdData:state.getGroupByIdData,
        updateGroupSuccess:state.updateGroupSuccess,
        addRemoveMemberSuccess:state.addRemoveMemberSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteGroup : (id) => dispatch(actions.deleteGroup(id)),
        updateGroup : (name,id) => dispatch(actions.updateGroup(name,id)),
        getGroupById : (id) => dispatch(actions.getGroupById(id)),
        addRemoveMemberGroup : (groupId,memberId,action) => dispatch(actions.addRemoveMemberGroup(groupId,memberId,action))
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <GroupRow {...props}/>));
