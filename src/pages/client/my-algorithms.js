import React from 'react'
import Layout from '../../layouts/ClientLayout'
import SEO from '../../components/seo'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import MyAlgorithmsList from '../../components/MyAlgorithmsList'
import Title from '../../components/client/Title'
import CreateAlgorithms from '../../components/client/CreateAlgorithm'
import { Box } from '@material-ui/core'

const MyAlgorithm = ({ ...props }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <Layout {...props}>
      <SEO title='My Algorithms' />
      <Title text='My Algorithms' />
      <Box width={matches ? '90%' : '100%'}>
        <CreateAlgorithms />
        <MyAlgorithmsList />
      </Box>
    </Layout>
  )
}

export default MyAlgorithm
