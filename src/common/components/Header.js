import React from 'react'
import {useSelector} from 'react-redux'
import {Stack, Typography} from '@mui/material'

const HeadTag = ({viewer = false}) => {
  const {site, players} = useSelector((state) => state)
  return <Stack>
    <Stack direction={'row'} spacing={1} ml={2}>
      <Typography variant={'h4'}>{site.title}</Typography>
      {viewer || <Typography variant={'h4'}>|</Typography>}
      {viewer || players.user && <Typography variant={'h4'}>{players.user.name}</Typography>}
    </Stack>
  </Stack>
}

export default HeadTag
