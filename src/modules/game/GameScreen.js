import {Stack} from '@mui/material'
import GameBoard from './components/GameBoard'
import LogScreen from './LogScreen'
import useMedia from '../../hooks/useMedia'

const GameScreen = ({ws}) => {
  const media = useMedia()
  return <Stack alignItems={'center'} height={'96vh'}
                justifyContent={media.sm ? 'space-evenly' : 'center'}
                direction={media.sm ? 'column' : 'row'}
                spacing={media.sm ? 2 : 8}>
    <GameBoard ws={ws}/>
    <LogScreen ws={ws}/>
  </Stack>
}

export default GameScreen
