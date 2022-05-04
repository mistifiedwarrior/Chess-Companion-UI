import {useSelector} from 'react-redux'
import React from 'react'
import {Stack} from '@mui/material'
import Header from '../../common/components/Header'
import GameScreen from '../../modules/game/GameScreen'
import useWebsocket from '../../hooks/useWebsocket'

const BroadCastGame = () => {
  const {game} = useSelector((state) => state)
  const ws = useWebsocket(game.gameId)
  
  return <Stack height={'100vh'} style={{pointerEvents: 'none'}}>
    <Header viewer={true}/>
    <GameScreen ws={ws}/>
  </Stack>
}

export default BroadCastGame
