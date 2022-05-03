import {Box, Modal, Stack, Typography} from '@mui/material'
import {styled} from '@mui/styles'
import Image from '../../../common/components/Image'
import images from '../../../images'

const BoxContainer = styled(Box)(({theme}) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: theme.palette.common.white,
  border: '1px solid #000',
  borderRadius: theme.spacing(2),
  boxShadow: theme.spacing(4),
  padding: theme.spacing(2)
}))

const PawnPromotion = ({possibleMoves, handleClick, turn, clearSelectedSquare}) => {
  return <Modal open={Boolean(possibleMoves.length)} onClose={clearSelectedSquare}>
    <BoxContainer>
      <Stack spacing={2} alignItems={'center'}>
        <Typography variant={'h5'}>Promote Pawn to</Typography>
        {
          [['r', 'n'], ['b', 'q']].map((row) =>
            <Stack spacing={2} direction={'row'} key={row.toString()}>
              {
                row.map((item) => {
                  const position = possibleMoves.find((move) => move.promotion === item)
                  return <Box key={item} onClick={(event) => handleClick(event, position)}
                              sx={{pointerEvents: 'pointer', cursor: 'pointer'}}>
                    <Image src={images[`${turn}${item}`.toUpperCase()]} item={{}}/>
                  </Box>
                })
              }
            </Stack>
          )
        }
      </Stack>
    </BoxContainer>
  </Modal>
}

export default PawnPromotion
