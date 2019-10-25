import actions from "./actions_for_User"

export const loginThunk = () => dispatch => {
 
  return fetch('/login')
      .then((resp) => resp.json()) 
      .then(function( {data} ) {
 
          dispatch(actions.login(data))
  });
};

export const registerThunk = () => dispatch => {
 
  return fetch('/signup')
      .then((resp) => resp.json()) 
      .then(function( {data} ) {
 
          dispatch(actions.login(data))
  });
};

export default {
	loginThunk,
	registerThunk,
}