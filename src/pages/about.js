import React from "react"
import { Link, graphql } from "gatsby"


import Layout from "../components/layout"
import Img from 'gatsby-image'
import SEO from "../components/seo"


const Aboutpage = ({data}) => (
  <Layout>
    <SEO title="About us" />
      <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <ul>
      {data.allStrapiHuman.edges.map(document => (
        <li key={document.node.id}>
          <h2>
            <Link to={`/${document.node.id}`}>{document.node.name}</Link>
          </h2>
          <Img fixed={document.node.photography.childImageSharp.fixed}/>
          <p>{document.node.role}</p>
        </li>
      ))}
    </ul>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default Aboutpage

export const humanQuery = graphql`  
  query HumanQuery {
    allStrapiHuman {
      edges {
        node {
          id
          photography {
            childImageSharp {
              fixed(width: 200, height: 200) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          name
          description
          social
          role
        }
      }
    }
  }
`