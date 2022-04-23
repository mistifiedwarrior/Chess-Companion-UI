import React from 'react'
import {styled} from '@mui/styles'

const Container = styled('div')(({theme}) => ({
  flexGrow: 1,
  minHeight: '100vh',
  width: '100vw',
  margin: 0,
  padding: 0,
  zIndex: -1,
  background: theme.palette.grey[100]
}))

const Layout = ({children}) => <Container>{children}</Container>

export default Layout
