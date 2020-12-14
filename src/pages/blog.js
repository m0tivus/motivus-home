import React from "react"
import { Link, graphql } from "gatsby"


import Layout from "../components/layout"
import Img from 'gatsby-image'
import SEO from "../components/seo"


const BlogPage = ({data, ...props}) => (
  <Layout {...props}>
    <SEO title="Blog" description="Blog Data" />
      <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <ul>
      {data.allSanityPost.edges.map(document => (
        <li key={document.node.id}>
          <h2>
            <Link to={`/blog/${document.node.id}`}>{document.node.title}</Link>
          </h2>
          <Img fixed={document.node.image.asset.fixed}/>
          <p>{document.node.abstract}</p>
        </li>
      ))}
    </ul>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default BlogPage

export const pageQuery = graphql`  
  query IndexQuery {
    allSanityPost {
      edges {
        node {
          id
          image {
            asset {
              fixed(width: 200, height: 200) {
                ...GatsbySanityImageFixed
              }
            }
          }
          title
          abstract
        }
      }
    }
  }
`