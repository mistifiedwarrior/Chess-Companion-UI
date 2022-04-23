import axios from '../axios'

const user = (host = '') => {
  return {
    validateUser() {
      return axios.fetch(`${host}/validate`)
    },
    logout() {
      return axios.fetch(`${host}/logout`)
    }
  }
}


export default user
