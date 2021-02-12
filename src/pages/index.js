import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Intro from '../components/ClientOptions'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorksStep'

const IndexPage = (props) => (
  <div>
    <Layout {...props}>
      <SEO title='Home' image='https://motivus.cl/icons/icon-192x192.png' />
      <Intro />
      <HowItWorks></HowItWorks>
      <Features></Features>
    </Layout>
  </div>
)

export default IndexPage
