import React from 'react'
import Layout from '../layouts/layout'
import { graphql } from 'gatsby'
import { Typography } from '@material-ui/core'
import Algorithm from '../components/Algorithm'

export default function AlgorithmTemplate({ data, ...props }) {
  return (
    <Layout {...props}>
      <Typography variant='h2' color='secondary'>
        {data.algorithm.name}
      </Typography>{' '}
      <Algorithm data={data} {...props} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query AlgorithmTemplateHome($id: String!) {
    algorithm(_id: { eq: $id }) {
      author
      github
      description
      longDescription
      name
      publishDate
      stars
      cost
      version
      web
      license
      id
    }
  }
`
