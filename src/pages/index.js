import React from 'react'

import Layout from '../layouts/layout'
import SEO from '../components/seo'
import CLientOptions from '../components/ClientOPtionsV2'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorksStep'
import Intro from '../components/Intro'
import { Box } from '@material-ui/core'
import Loading from '../components/Loading'
;/^\/account/.test('/account/;lasdasdas')

const IndexPage = (props) => (
  <div>
    <Layout {...props}>
      <SEO title='Home' image='https://motivus.cl/icons/icon-256x256.png' />
      {/^\/account/.test(props.location.pathname) && <Loading fullscreen />}
      <Intro />
      <Box mt='80px'>
        <CLientOptions />
      </Box>
      <HowItWorks></HowItWorks>
      <Features></Features>
    </Layout>
  </div>
)

export default IndexPage
