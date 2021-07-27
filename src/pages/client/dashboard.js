import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../../layouts/ClientLayout'
import SEO from '../../components/seo'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import parseJSON from 'date-fns/parseJSON'
import formatISO from 'date-fns/formatISO'

import { Box, CssBaseline } from '@material-ui/core'
import Title from '../../components/client/Title'
import BoxScore from '../../components/client/BoxScore'

const useStyles = makeStyles((theme) => ({}))

const ClientPage = ({ data, ...props }) => {
  const classes = useStyles()

  return (
    <Layout {...props}>
      <Box></Box>
      <Title text='Dasboard' />
      <Typography variant='subtitle1'>
        Welcome to your dashboard, here you can monitor the different processors
        related to your algorithms
      </Typography>
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='center'
      >
        <Grid item>
          <BoxScore title='Total Task' score='2050' />
        </Grid>
        <Grid item>
          <BoxScore title='Task / hour' score='10.5' />
        </Grid>
        <Grid item>
          <BoxScore title='Duration Prom' score='234' />
        </Grid>
        <Grid item>
          <BoxScore title='Node Prom' score='5350' />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ClientPage
