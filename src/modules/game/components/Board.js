import {Box, Stack} from '@mui/material'
import Image from '../../../common/components/Image'
import images from '../../../images'
import {styled} from '@mui/styles'
import {isWindow} from '../../../utils/utils'
import PawnPromotion from './PawnPromotion'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {MOVE} from '../../../constants/eventNames'
import {setGame} from '../action'
import API from '../../../API'
import useWebSocket from '../../../hooks/useWebsocket'
import {isCurrentTurn, isMyPiece} from '../utils'

const BoxContainer = styled(Box)(({theme, isEven}) => ({
  height: isWindow() && window.innerHeight < window.innerWidth ? '8vh' : '8vw',
  width: isWindow() && window.innerHeight < window.innerWidth ? '8vh' : '8vw',
  background: isEven ? theme.palette.grey[300] : theme.palette.grey[500]
}))

// eslint-disable-next-line max-lines-per-function,max-statements
const Board = () => {
  const [selected, setSelected] = useState(null)
  const [possibleMoves, setPossibleMoves] = useState([])
  const [selectedSquare, setSelectedSquare] = useState(null)
  const [prev, setPrev] = useState({})
  const {players, game} = useSelector((state) => state)
  const {board, turn, gameState} = game
  const dispatch = useDispatch()
  const ws = useWebSocket()
  
  useEffect(() => {
    if (ws.data && ws.data.event && ws.data.event === MOVE) {
      dispatch(setGame(ws.data.message.game, players.user.color))
      setPrev(ws.data.message.prevMove)
      setSelected(null)
      setPossibleMoves([])
    }
  }, [ws.data])
  
  const handleClick = (position) => (event, promotion) => {
    if (selected === null || isMyPiece(position, players.user)) {
      setSelected(position.square)
      API.games.getPossibleMoves(position.square).then(setPossibleMoves)
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
  
  return <Stack border={1}>
    {
      board.map((row, rowNo) => <Stack key={rowNo} direction={'row'}>
        {row.map((item, colNo) => {
          const isClickable = isCurrentTurn(players.user, turn, item) || possibleMoves.some((move) => move.to === item.square)
          return <BoxContainer key={`${rowNo}_${colNo}`} onClick={handleClick(item)} isEven={(rowNo + colNo) % 2 === 0}
                               sx={{
                                 pointerEvents: isClickable ? 'pointer' : 'none',
                                 cursor: isClickable ? 'pointer' : 'none'
                               }}>
            <Image src={item ? images[`${item.color}${item.type}`.toUpperCase()] : null} prev={prev}
                   item={{...item, possibleMoves, selected, check: gameState === 'CHECK' && turn === item.color}}/>
          </BoxContainer>
        })}
      </Stack>)
    }
    <PawnPromotion possibleMoves={possibleMoves.filter((move) => move.to === selectedSquare)}
                   clearSelectedSquare={() => setSelectedSquare(null)}
                   handleClick={handleClick(selected || {})} turn={turn}/>
  </Stack>
}

export default Board
