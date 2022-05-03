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
import EndScreen from './EndScreen'
import PawnPromotion from './PawnPromotion'

// eslint-disable-next-line max-statements,max-lines-per-function
const GameBoard = () => {
  const [selected, setSelected] = useState(null)
  const [possibleMoves, setPossibleMoves] = useState([])
  const [selectedSquare, setSelectedSquare] = useState(null)
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
  
  const isMyPiece = (position) => players.user && players.user.color.toLowerCase().startsWith(position.color)
  
  const handleClick = (position) => (event, promotion) => {
    if (selected === null || isMyPiece(position)) {
      setSelected(position.square)
      API.games.getPossibleMoves(position.square)
        .then((moves) => setPossibleMoves(moves))
    } else {
      const selectedMove = possibleMoves.find((move) => move.to === position.square)
      if (selectedMove && !selectedMove.promotion || selectedSquare || promotion) {
        ws.send({event: MOVE, ...selectedMove, ...promotion || {}})
        setSelectedSquare(null)
      } else {
        setSelectedSquare(position.square)
      }
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
        <Board board={board} currentTurn={currentTurn} prev={prev} check={game.state === 'CHECK'}
               turn={turn} selected={selected} possibleMoves={possibleMoves} handleClick={handleClick}/>
        <ColLabels reverse={reverse}/>
      </Stack>
      <RowLabels reverse={reverse}/>
    </Stack>
    {players.user && <PlayerLabel player={players.user} turn={game.turn}/>}
    <PawnPromotion possibleMoves={possibleMoves.filter((move) => move.to === selectedSquare)}
                   clearSelectedSquare={() => setSelectedSquare(null)}
                   handleClick={handleClick(selected || {})} turn={turn}/>
    <EndScreen game={game} players={players} currentTurn={currentTurn}/>
  </Stack>
}

export default GameBoard
