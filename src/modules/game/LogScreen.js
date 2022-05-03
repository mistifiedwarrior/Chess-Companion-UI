import {useEffect, useState} from 'react'
import {Box, Divider, Stack, Typography} from '@mui/material'
import {LOG} from '../../constants/eventNames'
import {styled} from '@mui/styles'
import useScroll from '../../hooks/useScroll'

const LogContainer = styled(Stack)(({theme}) => ({
  width: theme.spacing(40),
  position: 'relative',
  top: '20vh',
  height: '50vh',
  border: '1px solid #000'
}))

const LogScreen = ({ws}) => {
  const [logs, setLogs] = useState({})
  
  const {scroll} = useScroll('#end')
  
  useEffect(() => {
    if (ws.data && ws.data.event && ws.data.event === LOG) {
      setLogs(ws.data.message)
      scroll()
    }
  }, [ws.data])
  
  return <LogContainer border={2}>
    <Typography variant={'h5'} p={0.2} pl={1}>Logs (GameId: {logs.gameId})</Typography>
    <Divider color={'#000'}/>
    <Stack overflow={'scroll'} p={1} spacing={0.5}>
      {logs.logs && logs.logs.map((log, index) => <Typography variant={'body2'} key={index}>{log}</Typography>)}
      <Box p={2.2}/>
      <div id={'end'}/>
    </Stack>
  </LogContainer>
}

export default LogScreen
