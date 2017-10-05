import * as api from '../api/auth';

function checkSessionSuccess() {
  	return {type: "SESSION_ACTIVE"}
}

function checkSessionFailure(){
    return {type: "SESSION_INACTIVE"}
}

export function checkSession() {
	return function(dispatch) {
	    return api.checkSession().then(response => {
	    	if(response.status === 200){
	    		dispatch(checkSessionSuccess());
	    	} else {
	    		dispatch(checkSessionFailure());
	    	}
	    }).catch(error => {
	      	dispatch(checkSessionFailure());
	    });
	};
}

