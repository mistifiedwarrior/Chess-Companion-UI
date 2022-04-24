import {combineReducers} from 'redux'
import siteReducer from '../modules/site/reducer'
import gameReducer from '../modules/game/reducer'
import userReducer from '../modules/user/reducer'

const reducer = combineReducers({
  site: siteReducer,
  game: gameReducer,
  user: userReducer
})

export default reducer
