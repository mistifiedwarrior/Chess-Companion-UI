import {BFF_URL} from '../config/config'
import users from './modules/user'
import games from './modules/games'
import tournament from './modules/tournament'

const API = {
  users: users(`${BFF_URL}/api/users`),
  games: games(`${BFF_URL}/api/games`),
  tournament: tournament(`${BFF_URL}/api/tournament`)
}

export default API
