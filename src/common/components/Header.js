import React from 'react'
import {useSelector} from 'react-redux'
import {Stack, Typography} from '@mui/material'

const HeadTag = () => {
  const {site, players} = useSelector((state) => state)
  return <Stack>
    <Stack direction={'row'} spacing={1} ml={2}>
      <Typography variant={'h4'}>{site.title}</Typography>
      <Typography variant={'h4'}>|</Typography>
      {players.user && <Typography variant={'h4'}>{players.user.name}</Typography>}
    </Stack>
  </Stack>
}

export default HeadTag
