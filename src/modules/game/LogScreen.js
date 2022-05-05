import {useEffect, useState} from 'react'
import {Divider, Stack, Typography} from '@mui/material'
import {LOG} from '../../constants/eventNames'
import {styled} from '@mui/styles'
import useScroll from '../../hooks/useScroll'
import useMedia from '../../hooks/useMedia'

const LogContainer = styled(Stack)(({theme, sm}) => ({
  width: sm === 'true' ? '95%' : theme.spacing(40),
  position: 'relative',
  top: sm === 'true' ? '0' : '20vh',
  height: sm === 'true' ? 'calc(90vh - 120vw)' : '50vh',
  border: '1px solid #000'
}))

const LogScreen = ({ws}) => {
  const [logs, setLogs] = useState({})
  
  const {scroll} = useScroll('#end')
  const media = useMedia()
  
  useEffect(() => {
    if (ws.data && ws.data.event && ws.data.event === LOG) {
      setLogs(ws.data.message || {})
    }
    setTimeout(scroll, 100)
  }, [ws.data])
  
  return <LogContainer border={2} sm={media.sm.toString()}>
    <Typography variant={'h5'} p={0.2} pl={1}>Logs (GameId: {logs.gameId})</Typography>
    <Divider color={'#000'}/>
    <Stack overflow={'scroll'} p={1} spacing={0.5}>
      {logs.logs && logs.logs.map((log, index) => <Typography variant={'body2'} key={index}>{log}</Typography>)}
      <div id={'end'}/>
    </Stack>
  </LogContainer>
}

export default LogScreen
