import React from 'react'
import Layout from '../layouts/ClientLayout'
import Title from '../components/client/Title'
import { graphql } from 'gatsby'
import Algorithm from '../components/Algorithm'

export default function AlgorithmTemplate({ data, ...props }) {
  return (
    <Layout {...props}>
      <Title text={data.algorithm.name} />
      <Algorithm data={data} {...props} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query AlgorithmTemplate($id: String!) {
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
