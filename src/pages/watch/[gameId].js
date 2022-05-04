import {useDispatch, useSelector} from 'react-redux'
import React, {useEffect} from 'react'
import API from '../../API'
import {setOpponent, setUser} from '../../modules/players/action'
import {setGame} from '../../modules/game/action'
import {Stack} from '@mui/material'
import Header from '../../common/components/Header'
import GameScreen from '../../modules/game/GameScreen'
import {useRouter} from 'next/router'
import {STATUS} from '../../constants/eventNames'
import useWebsocket from '../../hooks/useWebsocket'

const WatchGame = () => {
  const {game, players} = useSelector((state) => state)
  const dispatch = useDispatch()
  const router = useRouter()
  const ws = useWebsocket(router.query.gameId)
  
  useEffect(() => {
    if (router.query && router.query.gameId) {
      API.games.getStatusBy(router.query.gameId)
        .then(({game: gameStatus, player1, player2}) => {
          const whitePlayer = player1.color === 'WHITE' ? player1 : player2
          dispatch(setUser(whitePlayer))
          dispatch(setGame(gameStatus, players.user && players.user.color))
          dispatch(setOpponent(player1.color === 'BLACK' ? player1 : player2))
        })
    }
  }, [router.query])
  
  useEffect(() => {
    if (ws.data && ws.data.event) {
      if (ws.data.event === STATUS) {
        const {game: gameStatus} = ws.data.message
        dispatch(setGame(gameStatus, players.user && players.user.color))
      }
    }
  }, [ws.data])
  
  if (!game || !game.gameId) {
    return <></>
  }
  
  return <Stack height={'100vh'} style={{pointerEvents: 'none'}}>
    <Header viewer/>
    <GameScreen ws={ws}/>
  </Stack>
}

export default WatchGame
