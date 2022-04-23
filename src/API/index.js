import {BFF_URL} from '../config/config'
import users from './modules/user'
import games from './modules/games'

const API = {
  users: users(`${BFF_URL}/api/users`),
  games: games(`${BFF_URL}/api/games`)
}

export default API
