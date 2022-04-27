import React, {useEffect} from 'react'
import {Stack} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {styled} from '@mui/styles'
import useWebsocket from '../hooks/useWebsocket'
import {STATUS} from '../constants/eventNames'
import {setGame} from '../modules/game/action'
import {setOpponent, setUser} from '../modules/players/action'
import Header from '../common/components/Header'
import GameScreen from '../modules/game/GameScreen'
import API from '../API'

const Container = styled('div')(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  alignSelf: 'center',
  boxShadow: theme.shadows[4],
  border: `1px solid ${theme.palette.grey[300]}`,
  width: theme.spacing(60),
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1)
}))


// eslint-disable-next-line max-lines-per-function,max-statements
const Game = () => {
  const {game, players} = useSelector((state) => state)
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
