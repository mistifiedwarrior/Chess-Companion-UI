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
  getPossibleMoves(position) {
    return axios.fetch(`${host}/possibles/${position}`)
  },
  getStatusBy(gameId) {
    return axios.fetch(`${host}/status/${gameId}`)
  },
  resetGame(values) {
    const options = {method: METHODS.PUT, data: values}
    return axios.fetch(`${host}/reset-game`, options)
  }
})


export default games
