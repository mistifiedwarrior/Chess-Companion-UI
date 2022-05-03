import {Stack} from '@mui/material'
import GameBoard from './components/GameBoard'
import LogScreen from './LogScreen'

const GameScreen = ({ws}) => <Stack alignItems={'center'} justifyContent={'center'} direction={'row'} spacing={8}>
  <GameBoard ws={ws}/>
  <LogScreen ws={ws}/>
</Stack>

export default GameScreen
