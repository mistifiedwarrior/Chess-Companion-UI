import {Box, Stack} from '@mui/material'
import {styled} from '@mui/styles'
import {isWindow} from '../../../utils/utils'
import {useDispatch, useSelector} from 'react-redux'
import {setGame} from '../action'
import {Moves} from '../utils'
import API from '../../../API'
import images from '../../../images'
import Image from '../../../common/components/Image'

const ChessBox = styled(Box)(({theme, isEven}) => ({
  height: isWindow() && window.innerHeight < window.innerWidth ? '8vh' : '8vw',
  width: isWindow() && window.innerHeight < window.innerWidth ? '8vh' : '8vw',
  background: isEven ? theme.palette.grey[300] : theme.palette.grey[500]
}))

const GameBoard = ({ws, prev, resetPrev}) => {
  const dispatch = useDispatch()
  const {players} = useSelector((state) => state)
  const {board} = useSelector((state) => state.game)
  const moves = Moves(board, players.user.color)
  
  const handleClick = (position) => () => {
    const selected = moves.getSelected()
    if (selected === null || moves.isMyPiece(position)) {
      API.games.getPossibleMoves(position)
        .then((res) => dispatch(setGame(res.game, players[0].userId)))
    } else {
      ws.send({from: selected.position, to: position})
    }
    resetPrev()
    // dispatch(setBoard(moves.board))
  }
  
  return <Stack border={1}>
    {
      board.map((row, rowNo) => <Stack key={rowNo} direction={'row'}>
        {row.map((item, colNo) => <ChessBox onClick={handleClick(item)} isEven={(rowNo + colNo) % 2 === 0}
                                            key={`${rowNo}_${colNo}`}>
          {item && <Image src={images[`${item.color}${item.type}`.toUpperCase()]} item={item} prev={prev}/>}
        </ChessBox>)}
      </Stack>)
    }
  </Stack>
}

export default GameBoard
