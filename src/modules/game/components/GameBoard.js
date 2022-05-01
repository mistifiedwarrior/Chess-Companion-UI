import {Stack} from '@mui/material'
import {ColLabels, RowLabels} from './Labels'
import PlayerLabel from './PlayerLabel'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import useWebSocket from '../../../hooks/useWebsocket'
import Board from './Board'
import API from '../../../API'
import {MOVE} from '../../../constants/eventNames'
import {setGame} from '../action'

// eslint-disable-next-line max-statements
const GameBoard = () => {
  const [selected, setSelected] = useState(null)
  const [possibleMoves, setPossibleMoves] = useState([])
  const [prev, setPrev] = useState({})
  const {players, game} = useSelector((state) => state)
  const {board, turn} = useSelector((state) => state.game)
  const dispatch = useDispatch()
  const reverse = players.user && players.user.color === 'BLACK'
  const currentTurn = players.user && players.user.color.toLowerCase().startsWith(turn)
  const ws = useWebSocket()
  
  useEffect(() => {
    if (ws.data && ws.data.event && ws.data.event === MOVE) {
      dispatch(setGame(ws.data.message.game, players.user.color))
      setPrev(ws.data.message.prevMove)
      setSelected(null)
      setPossibleMoves([])
    }
  }, [ws.data])
  
  const isMyPiece = (position) => players.user.color.toLowerCase().startsWith(position.color)
  
  const handleClick = (position) => () => {
    if (selected === null || isMyPiece(position)) {
      setSelected(position.square)
      API.games.getPossibleMoves(position.square)
        .then((moves) => setPossibleMoves(moves))
    } else {
      ws.send({event: MOVE, from: selected, to: position.square})
    }
    setPrev({})
  }
  
  return <Stack alignItems={'center'} spacing={2}>
    {players.opponent && <PlayerLabel player={players.opponent} turn={game.turn}/>}
    <Stack p={0.5} spacing={0.5} border={2} alignItems={'center'} justifyContent={'center'}
           alignSelf={'center'} direction={'row'}>
      <RowLabels reverse={reverse}/>
      <Stack spacing={0.5}>
        <ColLabels reverse={reverse}/>
        <Board reverse={reverse} board={board} currentTurn={currentTurn} prev={prev}
               selected={selected} possibleMoves={possibleMoves} handleClick={handleClick}/>
        <ColLabels reverse={reverse}/>
      </Stack>
      <RowLabels reverse={reverse}/>
    </Stack>
    {players.user && <PlayerLabel player={players.user} turn={game.turn}/>}
  </Stack>
}

export default GameBoard
