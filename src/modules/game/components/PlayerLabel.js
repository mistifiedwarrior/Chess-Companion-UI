import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/styles'
import { isWindow } from '../../../utils/utils'
import { DoubleArrow } from '@mui/icons-material'

const Label = styled(Box)(({ theme, color, currentTurn }) => ({
  width: isWindow() && window.innerHeight < window.innerWidth ? '48vh' : '48vw',
  border: '4px solid',
  borderColor: `${currentTurn ? theme.palette.success.main : theme.palette.common.black}`,
  background: color === 'WHITE' ? theme.palette.grey[300] : theme.palette.grey[500],
  padding: isWindow() && window.innerHeight < window.innerWidth ? '1.5vh' : '1.5vw',
  boxShadow: theme.spacing(2)
}))


const PlayerLabel = ({ player }) => <Stack p={2} direction={'row'} alignItems={'center'}>
  {player.currentTurn && <DoubleArrow color={'success'} fontSize={'large'} />}
  <Label color={player.color} currentTurn={player.currentTurn}>
    <Typography variant={'h6'} textAlign={'center'} color={'black'}>
      {player.name} ({player.color})
    </Typography>
  </Label>
  {player.currentTurn && <DoubleArrow color={'success'} fontSize={'large'} sx={{ transform: 'rotate(180deg)' }} />}
</Stack>


export default PlayerLabel
