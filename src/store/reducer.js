import {combineReducers} from 'redux'
import siteReducer from '../modules/site/reducer'

const reducer = combineReducers({
  site: siteReducer
  // user: userReducer, game: gameReducer
})

export default reducer
