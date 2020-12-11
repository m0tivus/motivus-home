import React from "react"
import { Link, graphql } from "gatsby"
import { Router } from "@reach/router"

import Aboutpage from "./about"


import Layout from "../components/layout"
import SEO from "../components/seo"
import Pricing from "../components/ClientOptions"
import Features from "../components/Features"




const IndexPage = (props) => (
  <div>
    
    <Layout {... props}>
      <SEO title="Home" />
      <Pricing />
      <Features></Features>
    </Layout>
  </div>
)

export default IndexPage

