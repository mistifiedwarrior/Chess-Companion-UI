import {combineReducers} from 'redux'
import siteReducer from '../modules/site/reducer'
import gameReducer from '../modules/game/reducer'
import playersReducer from '../modules/players/reducer'
import tournamentReducer from '../modules/tournament/reducer'

const reducer = combineReducers({
  site: siteReducer,
  game: gameReducer,
  players: playersReducer,
  tournament: tournamentReducer
})

export default reducer
