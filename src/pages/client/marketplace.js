import React from 'react'
import Layout from '../../layouts/ClientLayout'
import SEO from '../../components/seo'
import Typography from '@material-ui/core/Typography'
import MarketplaceData from '../../components/MarketplaceData'
import Title from '../../components/client/Title'

const ClientMarketplace = ({ ...props }) => {
  return (
    <Layout {...props}>
      <Title text='Algorithm Marketplace' />
      <Typography color='textPrimary' variant='subtitle1'>
        Look for the algorithm that best fit to carry out your project
      </Typography>
      <MarketplaceData />
    </Layout>
  )
}

export default ClientMarketplace

/*const algorithmsData = [
  {
    name: 'rna-folding',
    author: 'simon-poblete',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    publishDate: '01/10/2021',
    image: simonImg,
    version: '0.0.1',
    cost: '0.12',
    web: 'www.example.com',
    github: 'github.com',
    stars: '1.9k',
  },
  {
    name: 'traveling-salesman',
    author: 'motivus',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    publishDate: '01/10/2021',
    image: motivusImg,
    version: '0.0.1',
    cost: '0.12',
    web: 'www.example.com',
    github: 'github.com',
    stars: '1.9k',
  },
  {
    name: 'sii-scrapers',
    author: 'motivus',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    publishDate: '01/10/2021',
    image: motivusImg,
    version: '0.0.1',
    cost: '0.12',
    web: 'www.example.com',
    github: 'github.com',
    stars: '1.9k',
  },
]*/
