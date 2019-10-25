import actions from "./action_constants_for_User"

const login = (payload) => {
      	return {
      		type: actions.LOGIN,
      		payload
      	}
      }

const register = (payload) => {
      	return {
      		type: actions.REGISTER,
      		payload
      	}
      }

export default {
	login,
	register,
}