// eslint-disable-next-line max-statements
import {Box, Modal, Typography} from '@mui/material'
import {styled} from '@mui/styles'

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

const getState = (state, players, currentTurn) => {
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

const EndScreen = ({game, players, currentTurn}) => {
  const state = game.state === 'END' ? getState(game.gameState, players, currentTurn) : {}
  return <Modal open={game.state === 'END'}>
    <BoxContainer>
      <Typography variant="h5" component="h2" textAlign={'center'}>{game.gameState}</Typography>
      <Typography variant="h6" component="h2" color={state.type} textAlign={'center'}>{state.message}</Typography>
    </BoxContainer>
  </Modal>
}

export default EndScreen
