import React from 'react'
import {useSelector} from 'react-redux'
import {Stack, Typography} from '@mui/material'
import useMedia from '../../hooks/useMedia'

const Header = ({viewer = false}) => {
  const {site, players} = useSelector((state) => state)
  const media = useMedia()
  return <Stack>
    <Stack direction={'row'} spacing={1} ml={media.sm ? 1 : 2}>
      <Typography variant={media.sm ? 'h6' : 'h4'}>{site.title}</Typography>
      {viewer || <Typography variant={media.sm ? 'h6' : 'h4'}>|</Typography>}
      {viewer || players.user && <Typography variant={media.sm ? 'h6' : 'h4'}>{players.user.name}</Typography>}
    </Stack>
  </Stack>
}

export default Header
