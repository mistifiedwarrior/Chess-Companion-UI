import {SET_TOURNAMENT_USER} from './action'

const initState = {
  user: null
}

// eslint-disable-next-line default-param-last
const tournamentReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_TOURNAMENT_USER:
      return {...state, user: action.user}
    default:
      return {...state}
  }
}

export default tournamentReducer
