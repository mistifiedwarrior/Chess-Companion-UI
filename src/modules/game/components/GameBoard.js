import {Stack} from '@mui/material'
import {ColLabels, RowLabels} from './Labels'
import PlayerLabel from './PlayerLabel'
import {useSelector} from 'react-redux'
import Board from './Board'
import EndScreen from './EndScreen'

const GameBoard = () => {
  const {players, game} = useSelector((state) => state)
  const reverse = players.user && players.user.color === 'BLACK'
  
  return <Stack alignItems={'center'} spacing={2}>
    {players.opponent && <PlayerLabel player={players.opponent} turn={game.turn}/>}
    <Stack p={0.5} spacing={0.5} border={2} alignItems={'center'} justifyContent={'center'}
           alignSelf={'center'} direction={'row'}>
      <RowLabels reverse={reverse}/>
      <Stack spacing={0.5}>
        <ColLabels reverse={reverse}/>
        <Board/>
        <ColLabels reverse={reverse}/>
      </Stack>
      <RowLabels reverse={reverse}/>
    </Stack>
    {players.user && <PlayerLabel player={players.user} turn={game.turn}/>}
    <EndScreen/>
  </Stack>
}

export default GameBoard
