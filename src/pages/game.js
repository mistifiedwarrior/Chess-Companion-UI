import React, {useEffect} from 'react'
import {Stack} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import useWebsocket from '../hooks/useWebsocket'
import {STATUS} from '../constants/eventNames'
import {setGame} from '../modules/game/action'
import {setOpponent, setUser} from '../modules/players/action'
import Header from '../common/components/Header'
import GameScreen from '../modules/game/GameScreen'
import API from '../API'

// eslint-disable-next-line max-lines-per-function,max-statements
const Game = () => {
  const {game} = useSelector((state) => state)
  const dispatch = useDispatch()
  const ws = useWebsocket()
  
  useEffect(() => {
    API.games.getStatus()
      .then(({game: gameStatus, player1, player2, user}) => {
        dispatch(setUser(user))
        dispatch(setGame(gameStatus))
        dispatch(setOpponent(user.playerId === player1.playerId ? player2 : player1))
      })
  }, [])
  
  useEffect(() => {
    if (ws.data && ws.data.event) {
      if (ws.data.event === STATUS) {
        const {game: gameStatus} = ws.data.message
        dispatch(setGame(gameStatus))
      }
    }
  }, [ws.data])
  
  
  if (!game || !game.gameId) {
    return <></>
  }
  
  return <Stack height={'100vh'}>
    <Header/>
    <GameScreen/>
  </Stack>
}

export default Game
