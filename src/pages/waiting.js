import React, {useEffect, useState} from 'react'
import {Stack, Typography} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {styled} from '@mui/styles'
import {LoadingButton} from '@mui/lab'
import useWebsocket from '../hooks/useWebsocket'
import {START, STATUS} from '../constants/eventNames'
import {setGame} from '../modules/game/action'
import {setOpponent, setUser} from '../modules/players/action'
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
const Waiting = () => {
  const {site, game, players} = useSelector((state) => state)
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const ws = useWebsocket()
  
  useEffect(() => {
    API.games.getStatus()
      .then(({game: gameStatus, player1, player2, user}) => {
        dispatch(setUser(user))
        dispatch(setGame(gameStatus, players.user && players.user.color))
        if (player2) {
          dispatch(setOpponent(user.playerId === player1.playerId ? player2 : player1))
        }
      })
      .catch(() => {
        window.location.href = '/'
      })
  }, [])
  
  useEffect(() => {
    if (game.state === 'STARTED') {
      window.location.href = '/game'
    }
  }, [game])
  
  useEffect(() => {
    setTimeout(() => {
      ws.send({event: STATUS})
      setCount(count + 1)
    }, 2000)
  }, [count])
  
  
  useEffect(() => {
    if (ws.data && ws.data.event && ws.data.event === START) {
      window.location.href = '/game'
    }
    if (ws.data && ws.data.event && ws.data.event === STATUS) {
      const {game: gameStatus, player1, player2} = ws.data.message
      dispatch(setGame(gameStatus, players.user.color))
      if (player2) {
        dispatch(setOpponent(player1.playerId === players.user.playerId ? player2 : player1))
      }
    }
  }, [ws.data])
  
  const handleStart = () => {
    if (players.user.playerId === game.player1) {
      setLoading(true)
      ws.send({event: START})
      setTimeout(setLoading, 2000, false)
    }
  }
  if (!game || !game.gameId || !typeof window) {
    return <></>
  }
  
  return <Stack spacing={2} justifyContent={'center'} direction={'row'} height={'100vh'}>
    <Container>
      <Typography variant={'h4'}>{site.title}</Typography>
      <Typography variant={'h5'}>Room No.: {game.gameId}</Typography>
      {players.user && <Typography variant={'body1'}>{players.user.name} ({players.user.color})</Typography>}
      {players.opponent &&
        <Typography variant={'body1'}>{players.opponent.name} ({players.opponent.color})</Typography>}
      <LoadingButton loading={loading} variant={'contained'} onClick={handleStart}
                     disabled={!game.player2 || players.user.playerId !== game.player1}>
        {players.user.playerId === game.player1 ? 'START GAME' : 'WAITING FOR HOST TO START GAME'}
      </LoadingButton>
    </Container>
  </Stack>
}

export default Waiting
