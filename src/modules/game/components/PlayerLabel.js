import {Box, Stack, Typography} from '@mui/material'
import {styled} from '@mui/styles'
import {isWindow} from '../../../utils/utils'
import {DoubleArrow} from '@mui/icons-material'
import useMedia from '../../../hooks/useMedia'

const Label = styled(Box)(({theme, color, currentTurn, sm}) => ({
  width: isWindow() && window.innerHeight < window.innerWidth ? '48vh' : '48vw',
  border: sm ? '2px solid' : '4px solid',
  borderColor: `${currentTurn ? theme.palette.success.main : theme.palette.common.black}`,
  background: color === 'WHITE' ? theme.palette.grey[300] : theme.palette.grey[500],
  padding: `${sm ? '0' : '1.5'}v${isWindow() && window.innerHeight < window.innerWidth ? 'h' : 'w'}`,
  boxShadow: theme.spacing(2)
}))


const PlayerLabel = ({player, turn}) => {
  const media = useMedia()
  const currentTurn = player.color.toLowerCase().startsWith(turn)
  return <Stack p={media.sm ? 0.5 : 2} direction={'row'} alignItems={'center'}>
    {currentTurn && <DoubleArrow color={'success'} fontSize={'large'}/>}
    <Label color={player.color} currentTurn={currentTurn} sm={media.sm}>
      <Typography variant={media.sm ? 'subtitle1' : 'h6'} textAlign={'center'} color={'black'}>
        <b>{player.name} ({player.color})</b>
      </Typography>
    </Label>
    {currentTurn && <DoubleArrow color={'success'} fontSize={'large'} sx={{transform: 'rotate(180deg)'}}/>}
  </Stack>
}


export default PlayerLabel
