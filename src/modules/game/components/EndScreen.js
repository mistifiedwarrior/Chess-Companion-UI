import {Box, Button, Link, Modal, Stack, Typography} from '@mui/material'
import {styled} from '@mui/styles'
import {useSelector} from 'react-redux'

const BoxContainer = styled(Box)(({theme}) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  background: theme.palette.common.white,
  border: '1px solid #000',
  borderRadius: theme.spacing(2),
  boxShadow: theme.spacing(4),
  padding: theme.spacing(2)
}))

const getState = (state, currentTurn) => {
  if (state === 'CHECKMATE') {
    return currentTurn ? {type: 'error', message: 'You Lose!!!'} : {type: 'green', message: 'You Win!!!'}
  }
  if (state === 'STALEMATE') {
    return currentTurn ? {type: 'green', message: 'You Win!!!'} : {type: 'error', message: 'You Lose!!!'}
  }
  if (state === 'INSUFFICIENT MATERIAL') {
    return {type: 'orange', message: 'Game Draw'}
  }
  if (state === 'DRAW') {
    return {type: 'orange', message: 'Game Draw'}
  }
  return {}
}

const EndScreen = () => {
  const {players, game} = useSelector((state) => state)
  const {turn, state, gameState} = game
  
  const currentTurn = players.user && players.user.color.toLowerCase().startsWith(turn)
  const currentState = state === 'END' ? getState(gameState, currentTurn) : {}
  return <Modal open={state === 'END'}>
    <BoxContainer>
      <Stack spacing={2} alignItems={'center'}>
        <Typography variant="h5" component="h2" textAlign={'center'}>{gameState}</Typography>
        <Typography variant="h6" component="h2" color={currentState.type} textAlign={'center'}>
          {currentState.message}
        </Typography>
        <Link href={'/'} underline={'none'}><Button variant={'contained'} href={'/'}>Play Again</Button></Link>
      </Stack>
    </BoxContainer>
  </Modal>
}

export default EndScreen
