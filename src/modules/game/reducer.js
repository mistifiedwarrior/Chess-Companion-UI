import {SET_GAME} from './action'

const initState = null

// eslint-disable-next-line default-param-last
const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_GAME:
      return {...state, ...action.game}
    default:
      return {...state}
  }
}

export default gameReducer
