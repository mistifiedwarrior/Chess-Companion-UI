import {SET_USER} from './action'

const initState = null
// eslint-disable-next-line default-param-last
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER:
      return {...state, ...action.user}
    default:
      return {...state}
  }
}

export default userReducer
