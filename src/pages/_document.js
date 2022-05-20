import React from 'react'
import NextDocument, {Head, Html, Main, NextScript} from 'next/document'
import {ServerStyleSheet as StyledComponentSheets} from 'styled-components'
import {ServerStyleSheets} from '@mui/styles'

class MyDocument extends NextDocument {
  static async getInitialProps(ctx) {
    const styledComponentSheet = new StyledComponentSheets()
    const materialUiSheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => styledComponentSheet.collectStyles(materialUiSheets.collect(<App {...props} />))
      })
      const initialProps = await NextDocument.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </React.Fragment>
        ]
      }
    } finally {
      styledComponentSheet.seal()
    }
  }
  
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html>
        <Head/>
        <body style={{
          margin: 0,
          padding: 0,
          width: '100vw',
          backgroundColor: '#fff',
          fontSize: '16px',
          overflowX: 'hidden',
          fontFamily: 'Arial,Helvetica,sans-serif'
        }}>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

export default MyDocument
