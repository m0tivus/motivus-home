import React from 'react'

import Layout from '../layouts/layout'
import SEO from '../components/seo'
import Intro from '../components/ClientOPtionsV2'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorksStep'

const IndexPage = (props) => (
  <div>
    <Layout {...props}>
      <SEO title='Home' image='https://motivus.cl/icons/icon-256x256.png' />
      <Intro />
      <HowItWorks></HowItWorks>
      <Features></Features>
    </Layout>
  </div>
)

export default IndexPage
