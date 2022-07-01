import React, {useEffect} from 'react'
import {Stack} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import useWebsocket from '../hooks/useWebsocket'
import {CHAT, LOG, STATUS} from '../constants/eventNames'
import {setGame} from '../modules/game/action'
import {setOpponent, setUser} from '../modules/players/action'
import Header from '../common/components/Header'
import GameScreen from '../modules/game/GameScreen'
import API from '../API'

// eslint-disable-next-line max-lines-per-function,max-statements
const Game = () => {
  const {game, players} = useSelector((state) => state)
  const dispatch = useDispatch()
  const ws = useWebsocket()
  
  useEffect(() => {
    API.games.getStatus()
      .then(({game: gameStatus, player1, player2, user}) => {
        dispatch(setUser(user))
        dispatch(setGame(gameStatus, players.user && players.user.color))
        dispatch(setOpponent(user.playerId === player1.playerId ? player2 : player1))
        ws.send({event: LOG})
        ws.send({event: CHAT})
        ws.send({event: STATUS})
      })
  }, [ws.send])
  
  useEffect(() => {
    if (ws.data && ws.data.event && ws.data.event === STATUS) {
      const {game: gameStatus} = ws.data.message
      dispatch(setGame(gameStatus, players.user && players.user.color))
    }
  }, [ws.data])
  
  
  if (!game || !game.gameId) {
    return <></>
  }
  
  return <Stack height={'100vh'}>
    <Header/>
    <GameScreen ws={ws}/>
  </Stack>
}

export default Game
