import {SET_OPPONENT, SET_USER} from './action'

const initState = null
// eslint-disable-next-line default-param-last
const playersReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.user}
    case SET_OPPONENT:
      return {...state, opponent: action.opponent}
    default:
      return {...state}
  }
}

export default playersReducer
