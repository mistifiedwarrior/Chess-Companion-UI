import React, {useEffect} from 'react'
import theme from '../theme/theme'
import HeadTag from '../common/components/HeadTag'
import Layout from '../common/components/Layout'
import {Router} from 'next/router'
import {onRouteChange} from '../utils/routing'
import {Provider} from 'react-redux'
import store from '../store'
import {ThemeProvider} from '@mui/styles'

const MyApp = ({Component, pageProps}) => {
  useEffect(() => {
    Router.events.on('routeChangeComplete', onRouteChange)
  }, [])
  
  return <Provider store={store}>
    <ThemeProvider theme={theme}>
      <HeadTag/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  </Provider>
}

export default MyApp
