import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Layout from '../../layouts/ClientLayout'
import Seo from '../../components/seo'
import Title from '../../components/client/Title'
import MarkdownDocumentationReader from '../../components/MarkdownDocumentationReader'
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({}))

export default function HomeDocumentation({ data }) {
  return (
    <React.Fragment>
      <Seo title='Documentation' />
      <Layout>
        <Title text='Documentation' />
        <Box maxWidth='1000px'>
          <MarkdownDocumentationReader />
        </Box>
      </Layout>
    </React.Fragment>
  )
}
