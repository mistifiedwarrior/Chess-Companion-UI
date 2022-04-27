import {combineReducers} from 'redux'
import siteReducer from '../modules/site/reducer'
import gameReducer from '../modules/game/reducer'
import playersReducer from '../modules/players/reducer'

const reducer = combineReducers({
  site: siteReducer,
  game: gameReducer,
  players: playersReducer
})

export default reducer
