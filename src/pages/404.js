import { Box, Typography } from '@material-ui/core'
import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import styles from '../styles/404v2.module.css'

const NotFoundPage = () => (
  <Layout>
    <SEO title='404: Not found' />
    <Box width='100%'>
      <div className={styles.glitch} data-text='404'>
        404
      </div>
    </Box>
    <Box width='100%' justifyContent='center'>
      <Typography variant='h3' align='center' color='secondary'>
        Oops...
      </Typography>
      <Typography variant='h4' align='center'>
        You just hit a route that doesn't exist...
      </Typography>
    </Box>
  </Layout>
)

export default NotFoundPage
