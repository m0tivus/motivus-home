import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../../layouts/ClientLayout'
import SEO from '../../components/seo'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import parseJSON from 'date-fns/parseJSON'
import formatISO from 'date-fns/formatISO'

import { Box, CssBaseline } from '@material-ui/core'
import Title from '../../components/client/Title'
import BoxScore from '../../components/client/BoxScore'
import Graph from '../../components/client/dashboard/DashBoardCard'
import {
  duration,
  invocations,
  excutions,
  TFLOPS,
  credits,
} from '../../components/client/dashboard/data/data'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles((theme) => ({}))

const ClientPage = ({ data, ...props }) => {
  const theme = useTheme()
  const classes = useStyles()
  console.log(duration, invocations)
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Layout {...props}>
      <Box></Box>
      <Title text='Dasboard' />
      <Typography variant='subtitle1'>
        Welcome to your dashboard, here you can monitor the different processors
        related to your algorithms
      </Typography>
      <Box marginY='50px'>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='center'
          spacing={matches ? 2 : 4}
        >
          <Grid item item xs={12} md={6} lg={3}>
            <BoxScore title='Total Task' score='2050' />
          </Grid>
          <Grid item item xs={12} md={6} lg={3}>
            <BoxScore title='Task / hour' score='10.5' />
          </Grid>
          <Grid item item xs={12} md={6} lg={3}>
            <BoxScore title='Duration Prom' score='234' />
          </Grid>
          <Grid item item xs={12} md={6} lg={3}>
            <BoxScore title='Node Prom' score='5350' />
          </Grid>
        </Grid>
      </Box>

      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='center'
        spacing={matches ? 2 : 4}
      >
        <Grid item xs={12} md={6}>
          <Graph
            title='Use of credits and TFLOPS'
            axis={2}
            data1={TFLOPS}
            data2={credits}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Graph title='Duration' axis={1} data={duration} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Graph title='Concurrent excutions' axis={1} data={excutions} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Graph title='Invocations' axis={1} data={invocations} />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ClientPage
