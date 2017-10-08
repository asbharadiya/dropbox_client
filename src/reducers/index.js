
const initialState= {
  isLogged: undefined,
  uname: "",
  assets: [],
  starredAssets: [],
  recentAssets: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SESSION_ACTIVE" :
      return {...state,isLogged:true,uname:action.data.uname};
    case "SESSION_INACTIVE" :  
      return {...state,isLogged:false};
    case "GET_ASSETS_SUCCESS" :
      return {
        ...state,
        assets:action.data,
        deleteAssetSuccess:undefined,
        addAssetToStarredSuccess:undefined,
        removeAssetFromStarredSuccess:undefined,
        addFolderSuccess:undefined,
        uploadFileSuccess:undefined
      };
    case "GET_ASSETS_FAILURE" :  
      return state;
    case "GET_STARRED_ASSETS_SUCCESS" :
      return {...state,starredAssets:action.data};
    case "GET_STARRED_ASSETS_FAILURE" :  
      return state;
    case "GET_RECENT_ASSETS_SUCCESS" :
      return {...state,recentAssets:action.data};
    case "GET_RECENT_ASSETS_FAILURE" :  
      return state;
    case "ADD_ASSET_SUCCESS" :
      if(action.isDir) {
        return {...state,addFolderSuccess:true};
      } else {
        return {...state,uploadFileSuccess:true};
      }
    case "ADD_ASSET_FAILURE" :  
      if(action.isDir) {
        return {...state,addFolderSuccess:false};
      } else {
        return {...state,uploadFileSuccess:false};
      }
    case "STAR_ASSET_SUCCESS" :
      if(action.isStarred) {
        return {...state,addAssetToStarredSuccess:true};
      } else {
        return {...state,removeAssetFromStarredSuccess:true};
      }
    case "STAR_ASSET__FAILURE" :  
      if(action.isStarred) {
        return {...state,addAssetToStarredSuccess:false};
      } else {
        return {...state,removeAssetFromStarredSuccess:false};
      }
    case "DELETE_ASSET_SUCCESS" :
      return {...state,deleteAssetSuccess:true};
    case "DELETE_ASSET_FAILURE" :  
      return {...state,deleteAssetSuccess:false};
    default : 
      return state;
  }
};

export default reducer;
