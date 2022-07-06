import React from 'react'
import {useSelector} from 'react-redux'
import {Stack, Typography} from '@mui/material'
import useMedia from '../../hooks/useMedia'

const TournamentHeader = () => {
  const {site, tournament} = useSelector((state) => state)
  const {user} = tournament
  const media = useMedia()
  return <Stack>
    <Stack direction={'row'} spacing={1} ml={media.sm ? 1 : 2}>
      <Typography variant={media.sm ? 'h6' : 'h4'}>{site.title} Tournament</Typography>
      <Typography variant={media.sm ? 'h6' : 'h4'}>|</Typography>
      <Typography variant={media.sm ? 'h6' : 'h4'}>{user.name}</Typography>
    </Stack>
  </Stack>
}

export default TournamentHeader
