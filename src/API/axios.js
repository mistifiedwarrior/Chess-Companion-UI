import axios from 'axios'
import {getStorage} from '../utils/storage'
import {StorageKeys} from '../constants/storage'

export const initHeaders = () => {
  const token = getStorage(StorageKeys.AUTH)
  const user = getStorage(StorageKeys.USER)
  const game = getStorage(StorageKeys.GAME)
  return {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
    'x-reference-id': user.userId || 'missing-reference-id',
    'x-room-no': game.roomNo || 'missing-room-no'
  }
}

const utils = {
  fetch(url, {data, ...options} = {}, retry = 1) {
    return new Promise((resolve, reject) => {
      axios({url, ...options, headers: {...initHeaders(), ...options.headers}, data})
        .then((res) => resolve(res.data))
        .catch((error) => {
          if (retry > 0 && !url.includes('/api/users/validate')) {
            this.fetch(url, {data, ...options}, retry - 1).then(resolve)
          } else {
            reject(error.response && error.response.data)
          }
        })
    })
  }
}

export default utils
