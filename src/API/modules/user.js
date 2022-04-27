import axios from '../axios'

const user = (host = '') => ({
  getUser(userId) {
    return axios.fetch(`${host}/${userId}`)
  }
})


export default user
