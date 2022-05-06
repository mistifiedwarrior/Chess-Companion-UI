import React from 'react'
import {styled} from '@mui/styles'
import {Box, Stack} from '@mui/material'
import {isWindow} from '../../utils/utils'
import {RemoveCircleOutline} from '@mui/icons-material'
import useMedia from '../../hooks/useMedia'

const ChessImage = styled('img')(({theme, state}) => {
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

const Dot = styled(Box)(({color}) => ({
  border: `1.2v${isWindow() && window.innerWidth < window.innerHeight ? 'w' : 'h'} solid ${color}`,
  borderRadius: '50%'
}))

const state = {
  POSSIBLE: {color: 'warning'},
  SELECTED: {color: 'success'},
  CHECK: {color: 'error'},
  getState({selected, possibleMoves, prev}, {square, type, check}) {
    if (check && type === 'k') {
      return this.CHECK
    }
    if (square === selected || prev.to === square) {
      return this.SELECTED
    }
    if (possibleMoves.some((move) => move.to === square) && type === 'k') {
      return this.CHECK
    }
    if (possibleMoves.some((move) => move.to === square)) {
      return this.POSSIBLE
    }
    return {}
  }
  
}

const Image = ({src, alt, item, prev = {}, ...rest}) => {
  const media = useMedia()
  const {selected, possibleMoves} = item
  return <Stack direction={'row'} justifyContent={'center'} height={'inherit'} alignItems={'center'}>
    {!src && possibleMoves.some((move) => move.to === item.square) && <Dot sm={media.sm.toString()} color={'green'}/>}
    {!src && item.square === prev.from &&
      <RemoveCircleOutline fontSize={'large'} color={'error'} fontWeight={'bold'}/>}
    {src && <ChessImage sm={media.sm.toString()} src={src} alt={alt}
                        state={state.getState({selected, possibleMoves, prev}, item)} {...rest} />}
  </Stack>
}

export default Image
