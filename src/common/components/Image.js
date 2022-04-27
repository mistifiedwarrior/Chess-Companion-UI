import React from 'react'
import {styled} from '@mui/styles'
import {Box, Stack} from '@mui/material'
import {isWindow} from '../../utils/utils'

const ChessImage = styled('img')(({ theme, state }) => {
  if (!isWindow()) {
    return {}
  }
  const side = window.innerWidth < window.innerHeight ? 'w' : 'h'
  return {
    height: `4v${side}`,
    width: `4v${side}`,
    padding: state.color ? `1.4v${side}` : 0,
    border: state.color ? `0.6v${side} solid ${theme.palette[state.color].main}` : 0
  }
})

const Dot = styled(Box)(({ theme, color }) => ({
  border: `${(isWindow() && window.innerWidth < window.innerHeight) ? '1.2vw' : '1.2vh'} solid ${color}`,
  borderRadius: '50%'
}))

const state = {
  POSSIBLE: { color: 'warning' },
  SELECTED: { color: 'success' },
  CHECK: { color: 'error' },
  getState(item, prev) {
    if ((item.possible && item.piece && item.piece[1] === 'K') || item.check) {
      return this.CHECK
    }
    if (item.selected || item.position === prev) {
      return this.SELECTED
    }
    if (item.possible) {
      return this.POSSIBLE
    }
    return {}
  }
}

const Image = ({ src, alt, item, prev, ...rest }) => {
  return <Stack direction={'row'} justifyContent={'center'} height={'inherit'} alignItems={'center'}>
    {/* {(!src && item.possible) && <Dot color={'green'} />} */}
    {/* {(!src && item.replaceable) && <Dot color={'blue'} />} */}
    {/* {(!src && item.position === prev.from) && */}
    {/* <RemoveCircleOutline fontSize={'large'} color={'error'} fontWeight={'bold'} />} */}
    {src && <ChessImage src={src} alt={alt} state={state.getState(item, prev.to)} {...rest} />}
  </Stack>
}

export default Image
