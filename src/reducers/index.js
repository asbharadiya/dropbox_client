
const initialState= {
  isLogged: undefined
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SESSION_INACTIVE" :
      return {...state,isLogged:false};
    case "SESSION_ACTIVE" :  
      return {...state,isLogged:true};
    default : 
      return state;
  }
};

export default reducer;
