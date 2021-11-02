import React from 'react'
import Layout from '../components/layout'
import MarketplaceData from '../components/MarketpalceData'
import marketplaceData from '../components/MarketpalceData'

export default function Marketplace() {
  return (
    <React.Fragment>
      <Layout>
        <MarketplaceData variant='home' />
      </Layout>
    </React.Fragment>
  )
}
