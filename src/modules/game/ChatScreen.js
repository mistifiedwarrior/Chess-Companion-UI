import {useEffect, useState} from 'react'
import {Box, Divider, IconButton, Stack, TextField, Typography} from '@mui/material'
import {CHAT} from '../../constants/eventNames'
import {styled} from '@mui/styles'
import useScroll from '../../hooks/useScroll'
import useMedia from '../../hooks/useMedia'
import {Send} from '@mui/icons-material'
import ChatMessage from './components/ChatMessage'
import {useSelector} from 'react-redux'

const ChatContainer = styled(Stack)(({theme, sm}) => ({
  width: sm === 'true' ? '95%' : theme.spacing(40),
  position: 'relative',
  height: sm === 'true' ? 'calc(90vh - 120vw)' : '45vh',
  border: '1px solid #000'
}))

const SendButton = styled(Box)(({theme}) => ({
  borderRadius: '50%',
  background: theme.palette.grey[800],
  padding: theme.spacing(0.2),
  '&>*>*': {
    color: theme.palette.common.white
  }
}))

const ChatScreen = ({ws}) => {
  const [message, setMessage] = useState('')
  const [chats, setChats] = useState({})
  
  const {players} = useSelector((state) => state)
  const {scroll} = useScroll('#end')
  const media = useMedia()
  
  useEffect(() => {
    if (ws.data && ws.data.event && ws.data.event === CHAT) {
      setChats(ws.data.message || {})
    }
    setTimeout(scroll, 100)
  }, [ws.data])
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if (message.trim()) {
      ws.send({event: CHAT, message: message.trim()})
      setMessage('')
    }
  }
  
  return <ChatContainer border={2} sm={media.sm.toString()} justifyContent={'space-between'}>
    <div>
      <Typography variant={'h5'} p={0.2} pl={1}>Chat</Typography>
      <Divider color={'#000'}/>
    </div>
    <div>
      <Stack overflow={'scroll'} p={1} spacing={0.5}>
        {chats.chats && chats.chats.map((chat, index) =>
          <ChatMessage chat={chat} players={players} key={index}/>)}
        <div id={'end'}/>
      </Stack>
      <Divider color={'#000'}/>
      <form onSubmit={handleSubmit}>
        <Stack p={1} direction={'row'} justifyContent={'space-evenly'} alignSelf={'center'}>
          <TextField p={0} placeholder={'enter your message here...'} fullWidth variant="standard" value={message}
                     onChange={(event) => setMessage(event.target.value)}/>
          <SendButton>
            <IconButton size={'small'} type={'submit'}>
              <Send fontSize={'small'}/>
            </IconButton>
          </SendButton>
        </Stack>
      </form>
    </div>
  </ChatContainer>
}

export default ChatScreen
