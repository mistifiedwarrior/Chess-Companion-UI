import {Stack} from '@mui/material'
import {ColLabels, RowLabels} from './Labels'
import PlayerLabel from './PlayerLabel'
import {useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import useWebSocket from '../../../hooks/useWebsocket'
import Board from './Board'

const GameBoard = () => {
  const {players} = useSelector((state) => state)
  // const dispatch = useDispatch()
  const [prev, setPrev] = useState({})
  const reverse = players.user.color === 'BLACK'
  
  const ws = useWebSocket()
  
  useEffect(() => {
    if (ws.data !== null) {
      // dispatch(setGame(ws.data.game, players[0].userId))
      // dispatch(setPrevMove(ws.data.prevMove))
      // setPrev(ws.data.prevMove)
    }
  }, [ws.data])
  
  return <Stack alignItems={'center'} spacing={2}>
    <PlayerLabel player={players.opponent}/>
    <Stack p={0.5} spacing={0.5} border={2} alignItems={'center'} justifyContent={'center'}
           alignSelf={'center'} direction={'row'}>
      <RowLabels reverse={reverse}/>
      <Stack spacing={0.5}>
        <ColLabels reverse={reverse}/>
        <Board ws={ws} prev={prev} resetPrev={() => setPrev({})}/>
        <ColLabels reverse={reverse}/>
      </Stack>
      <RowLabels reverse={reverse}/>
    </Stack>
    <PlayerLabel player={players.user}/>
  </Stack>
}

export default GameBoard
