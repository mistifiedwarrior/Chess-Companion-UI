import React, {useEffect, useState} from 'react'
import {Stack, Typography} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {styled} from '@mui/styles'
import {useRouter} from 'next/router'
import {LoadingButton} from '@mui/lab'
import API from '../API'
import {setGame} from '../modules/game/action'

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

const Waiting = () => {
  const {site, game, user} = useSelector((state) => state)
  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if (!game || !game.gameId) {
      router.push('/').then()
    }
  }, [game])
  
  useEffect(() => {
    const getStatus = (retry = 3) => {
      if (game.gameId) {
        API.games.getStatus(game.gameId)
          .then(({game: gameStatus}) => {
            if (gameStatus.state === 'STARTED') {
              return router.push('/game')
            }
            setTimeout(getStatus, 5000)
            return dispatch(setGame(gameStatus))
          })
          .catch(() => retry > 0 && setTimeout(getStatus, 5000, retry - 1))
      }
    }
    getStatus()
  }, [game.gameId])
  
  const handleStart = () => {
    setLoading(true)
    API.games.startGame(game.gameId)
      .then(() => ({}))
      .catch(() => ({}))
      .finally(() => setLoading(false))
  }
  
  if (!game || !game.gameId) {
    return <></>
  }
  
  return <Stack spacing={2} justifyContent={'center'} direction={'row'} height={'100vh'}>
    <Container>
      <Typography variant={'h4'}>{site.title}</Typography>
      <Typography variant={'h5'}>Room No.: {game.gameId}</Typography>
      <Typography variant={'body1'}>{game.player1.name} ({game.player1.color})</Typography>
      {game.player2 && <Typography variant={'body1'}>{game.player2.name} ({game.player2.color})</Typography>}
      <LoadingButton loading={loading} variant={'contained'} onClick={handleStart}
                     disabled={!game.player2 || user.playerId !== game.player1.playerId}>
        {user.playerId === game.player1.playerId ? 'START GAME' : 'WAITING FOR HOST TO START GAME'}
      </LoadingButton>
    </Container>
  </Stack>
}

export default Waiting
