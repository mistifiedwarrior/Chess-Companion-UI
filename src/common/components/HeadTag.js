import React from 'react'
import Head from 'next/head'
import {useSelector} from 'react-redux'

const HeadTag = () => {
  const site = useSelector((state) => state.site)
  return <Head>
    <title>{site.title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"/>
  </Head>
}

export default HeadTag
