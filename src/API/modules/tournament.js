import axios from '../axios'
import {METHODS} from '../constants'

const tournament = (host = '') => ({
  login(code) {
    const options = {method: METHODS.POST, data: {code}}
    return axios.fetch(`${host}/login`, options)
  },
  validate() {
    return axios.fetch(`${host}/validate`)
  },
  createTournament(payload) {
    const options = {method: METHODS.POST, data: payload}
    return axios.fetch(host, options)
  },
  getAllTournaments() {
    return axios.fetch(host)
  }
})


export default tournament
