import axios from 'axios'
import {getStorage} from '../utils/storage'
import {StorageKeys} from '../constants/storage'

export const initHeaders = () => ({
  'Content-Type': 'application/json',
  authorization: getStorage(StorageKeys.AUTH) || '',
  tournamentAuth: getStorage(StorageKeys.TOURNAMENT_AUTH) || ''
})

const utils = {
  fetch(url, {data, ...options} = {}) {
    return new Promise((resolve, reject) => {
      axios({url, ...options, headers: {...initHeaders(), ...options.headers}, data})
        .then((res) => resolve(res.data))
        .catch((error) => reject(error.response && error.response.data))
    })
  }
}

export default utils
