import {Box, Stack} from '@mui/material'
import Image from '../../../common/components/Image'
import images from '../../../images'
import {styled} from '@mui/styles'
import {isWindow} from '../../../utils/utils'

const BoxContainer = styled(Box)(({theme, isEven}) => ({
  height: isWindow() && window.innerHeight < window.innerWidth ? '8vh' : '8vw',
  width: isWindow() && window.innerHeight < window.innerWidth ? '8vh' : '8vw',
  background: isEven ? theme.palette.grey[300] : theme.palette.grey[500]
}))

const Board = ({board, currentTurn, handleClick, possibleMoves, selected, prev}) => <Stack border={1}>
  {
    board.map((row, rowNo) => <Stack key={rowNo} direction={'row'}>
      {row.map((item, colNo) => {
        const isClickable = Boolean(currentTurn && item.type) || possibleMoves.some((move) => move.endsWith(item.square))
        return <BoxContainer key={`${rowNo}_${colNo}`} onClick={handleClick(item)} isEven={(rowNo + colNo) % 2 === 0}
                             sx={{
                               pointerEvents: isClickable ? 'pointer' : 'none',
                               cursor: isClickable ? 'pointer' : 'none'
                             }}>
          <Image src={item ? images[`${item.color}${item.type}`.toUpperCase()] : null}
                 item={{...item, possibleMoves, selected}} prev={prev}
          />
        </BoxContainer>
      })}
    </Stack>)
  }
</Stack>

export default Board
