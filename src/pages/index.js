import React, {useState} from 'react'
import {Stack, Typography} from '@mui/material'
import {useSelector} from 'react-redux'
import {styled} from '@mui/styles'
import HostGame from '../modules/gameType/HostGame'
import JoinGame from '../modules/gameType/JoinGame'

const Container = styled('div')(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  alignSelf: 'center',
  boxShadow: theme.shadows[4],
  border: `1px solid ${theme.palette.grey[300]}`,
  width: theme.spacing(60),
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1)
}))

const HOST = 'HOST'
const JOIN = 'JOIN'

const Home = () => {
  const [type, setType] = useState(HOST)
  const {site} = useSelector((state) => state)
  
  return <Stack spacing={2} justifyContent={'center'} direction={'row'} height={'100vh'}>
    <Container>
      <Typography variant={'h4'} mb={2}>{site.title}</Typography>
      {type === HOST && <HostGame changeType={() => setType(JOIN)}/>}
      {type === JOIN && <JoinGame changeType={() => setType(HOST)}/>}
    </Container>
  </Stack>
}

export default Home
