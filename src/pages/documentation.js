import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Layout from '../layouts/layout'
import Seo from '../components/seo'
import MarkdownDocumentationReader from '../components/MarkdownDocumentationReader'

const useStyles = makeStyles((theme) => ({}))

export default function HomeDocumentation({ data }) {
  return (
    <React.Fragment>
      <Seo title='Documentation' />
      <Layout>
        <Typography variant='h2'>Documentation</Typography>
        <MarkdownDocumentationReader />
      </Layout>
    </React.Fragment>
  )
}
