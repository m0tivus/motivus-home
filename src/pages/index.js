import React from "react"
import { Link, graphql } from "gatsby"


import Layout from "../components/layout"
import SEO from "../components/seo"


const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
      <h1>Motivus home</h1>
    
    <Link to="/blog/">blog</Link>
    <Link to="/about/">About us</Link>
  </Layout>
)

export default IndexPage

