import {useEffect, useState} from 'react'
import {BFF_URL} from '../config/config'
import {getStorage} from '../utils/storage'
import {StorageKeys} from '../constants/storage'

const formatMessage = (data) => {
  try {
    return JSON.parse(data)
  } catch (error) {
    return null
  }
}

const useWebSocket = (gameId, retryCount = 3, retryInterval = 1500) => {
  const url = `ws:${BFF_URL.split(':').slice(1).join(':')}/websockets`
  const token = getStorage(StorageKeys.AUTH)
  const [data, setData] = useState({})
  const [send, setSend] = useState(() => ({}))
  const [retry, setRetry] = useState(retryCount)
  const [readyState, setReadyState] = useState(false)
  
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!readyState && (gameId || token)) {
      const ws = window ? new WebSocket(`${url}?token=${token}&gameId=${gameId}`) : {}
      ws.onopen = () => {
        setReadyState(true)
        setSend(() => (text) => ws.send(JSON.stringify(text)))
        ws.onmessage = (event) => setData(formatMessage(event.data))
        setRetry(retryCount)
      }
      
      ws.onclose = () => {
        setReadyState(false)
        if (retry > 0) {
          setTimeout(() => setRetry(retry - 1), retryInterval)
        } else {
          setTimeout(() => setRetry(retryCount), retryInterval * 20)
        }
      }
    }
  }, [retry])
  
  return {send, data, readyState}
}

export default useWebSocket
