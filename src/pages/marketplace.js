import React from 'react'
import Layout from '../layouts/layout'
import MarketplaceData from '../components/MarketplaceData'
import Seo from '../components/seo'

export default function Marketplace() {
  return (
    <React.Fragment>
      <Seo title='Marketplace' />
      <Layout>
        <MarketplaceData variant='home' />
      </Layout>
    </React.Fragment>
  )
}
