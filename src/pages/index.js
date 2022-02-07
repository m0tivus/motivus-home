import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import ClientOptions from '../components/ClientOptions'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorksStep'

const IndexPage = (props) => (
  <div>
    <Layout {...props}>
      <SEO title='Home' image='https://motivus.cl/icons/icon-256x256.png' />
      <ClientOptions />
      <HowItWorks></HowItWorks>
      <Features></Features>
    </Layout>
  </div>
)

export default IndexPage
