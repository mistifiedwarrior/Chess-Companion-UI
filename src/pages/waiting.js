import React, {useEffect, useState} from 'react'
import {Stack, Typography} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {styled} from '@mui/styles'
import {useRouter} from 'next/router'
import {LoadingButton} from '@mui/lab'
import useWebsocket from '../hooks/useWebsocket'
import {START, STATUS} from '../constants/eventNames'
import {setGame} from '../modules/game/action'
import {setOpponent} from '../modules/players/action'

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
  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const ws = useWebsocket()
  
  useEffect(() => {
    if (!game || !game.gameId) {
      router.push('/').then()
    }
  }, [game])
  
  useEffect(() => {
    if (ws.data && ws.data.event) {
      if (ws.data.event === STATUS) {
        const {game: gameStatus, player1, player2} = ws.data.message
        dispatch(setGame(gameStatus))
        dispatch(setOpponent(player1.playerId === players.user.playerId ? player2 : player1))
      }
      if (ws.data.event === START) {
        router.push('/game')
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
  
  if (!game || !game.gameId) {
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
