import {StorageKeys} from '../constants/storage'

const UNDEFINED = 'undefined'

const storageLocation = () => 'localStorage'

const setStorage = (key, value) => {
  if (typeof window === UNDEFINED) {
    return
  }
  window[storageLocation()].setItem(key, JSON.stringify(value))
}

const getStorage = (key) => {
  try {
    if (typeof window !== UNDEFINED) {
      const result = window[storageLocation()].getItem(key)
      if (result && result !== UNDEFINED) {
        return JSON.parse(result)
      }
    }
    return {}
  } catch (error) {
    return null
  }
}

const handleLogin = (token) => setStorage(StorageKeys.AUTH, token)
const handleTournamentLogin = (token) => setStorage(StorageKeys.TOURNAMENT_AUTH, token)

export {handleLogin, setStorage, getStorage, handleTournamentLogin}
