import {Stack, Typography} from '@mui/material'

const ChatMessage = ({players, chat}) => {
  const isMyMessage = players.user.playerId === chat.playerId
  return <Stack direction={'row'} justifyContent={isMyMessage ? 'flex-end' : 'flex-start'}>
    <Stack maxWidth={'80%'} border={1} pl={0.5} pr={0.5} borderRadius={1.5}>
      <Typography variant={'body1'} textAlign={isMyMessage ? 'right' : 'left'}>
        {chat.message}
      </Typography>
    </Stack>
  </Stack>
}

export default ChatMessage
