import {Stack} from '@mui/material'
import {styled} from '@mui/styles'
import GameBoard from './components/GameBoard'
import LogScreen from './LogScreen'
import useMedia from '../../hooks/useMedia'
import ChatScreen from './ChatScreen'
import {useSelector} from 'react-redux'

const LogAndChatContainer = styled(Stack)(({theme, sm}) => ({
  width: sm === 'true' ? '95%' : theme.spacing(40),
  position: 'relative',
  top: 0,
  height: sm === 'true' ? 'calc(90vh - 120vw)' : '90vh'
}))

const GameScreen = ({ws}) => {
  const media = useMedia()
  const {players} = useSelector((state) => state)
  const isOpponentNotAI = players.opponent && !players.opponent.playerId.includes('AI')
  
  return <Stack alignItems={'center'} height={'92vh'}
                justifyContent={media.sm ? 'space-evenly' : 'center'}
                direction={media.sm ? 'column' : 'row'}
                spacing={media.sm ? 2 : 8}>
    <GameBoard ws={ws}/>
    <LogAndChatContainer sm={media.sm.toString()} spacing={2}
                         justifyContent={isOpponentNotAI ? 'space-between' : 'flex-end'}>
      <LogScreen ws={ws}/>
      {isOpponentNotAI && <ChatScreen ws={ws}/>}
    </LogAndChatContainer>
  </Stack>
}

export default GameScreen
