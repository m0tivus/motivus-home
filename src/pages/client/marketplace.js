import React from 'react'
import Layout from '../../layouts/ClientLayout'
import SEO from '../../components/seo'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Title from '../../components/client/Title'
import AlgorithmCards from '../../components/client/AlgorithmCards'
import AlgorithmFilter from '../../components/client/AlgorithmFilter'
import { Box, Grid } from '@material-ui/core'
import simonImg from '../../images/Simon-Poblete.jpg'
import motivusImg from '../../images/gatsby-icon.png'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  gridContainer: {
    marginTop: '50px',
    width: '89.75%',
  },
}))

const ClientPage = ({ data, ...props }) => {
  const classes = useStyles()

  return (
    <Layout {...props}>
      <Title text='Algorithm Marketplace' />
      <Typography color='textPrimary' variant='subtitle1'>
        Look for the algorithm that best fit to carry out your project
      </Typography>
      <AlgorithmFilter data={algorithmsData} />

      <Grid container className={classes.gridContainer}>
        {algorithmsData.map((a, k) => (
          <Grid item key={k} xs={12}>
            <AlgorithmCards
              name={a.name}
              author={a.author}
              publishDate={a.publishDate}
              description={a.description}
              image={a.image}
              cost={a.cost}
              stars={a.stars}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export default ClientPage

const algorithmsData = [
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
]
