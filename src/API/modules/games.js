import axios from '../axios'
import {METHODS} from '../constants'

const games = (host = '') => ({
  initGame(game) {
    const options = {method: METHODS.POST, data: game}
    return axios.fetch(`${host}/init-game`, options)
  },
  getStatus() {
    return axios.fetch(`${host}/status`)
  },
  startGame(gameId) {
    return axios.fetch(`${host}/${gameId}/start`)
  },
  getPossibleMoves(gameId, position) {
    return axios.fetch(`${host}/${gameId}/possibles/${position}`)
  }
})


export default games
