import actions from "./action_constants_for_USER"

const initialState = {
  UserList : [],
  isLoading: false,
  SingleUser: {
    FirstName: '', 
      LastName: '', 
      email: '', 
      token: '', 
      isLoggedIn: true,
  }
}

export default function User_reducer (state = initialState, action) {
  
  switch (action.type) {

    case actions.LOGIN: {

      return { ...state }
    }
    
    case actions.REGISTER: {

      return { ...state }
    }
    
    default:
      return state
  }
}