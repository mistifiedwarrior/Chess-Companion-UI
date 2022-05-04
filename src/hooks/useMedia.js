import {useMediaQuery} from '@mui/material'
import {isWindow} from '../utils/utils'

const useMedia = () => {
  const sm = isWindow() && window.innerHeight > window.innerWidth
  const md = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const lg = useMediaQuery((theme) => theme.breakpoints.down('lg'))
  return {sm, md, lg}
}

export default useMedia
