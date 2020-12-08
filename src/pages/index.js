import React from "react"
import { Link, graphql } from "gatsby"
import { Router } from "@reach/router"

import Aboutpage from "./about"


import Layout from "../components/layout"
import SEO from "../components/seo"
import Pricing from "../components/ClientOptions"




const IndexPage = () => (
  <div>
    
    <Layout>
      <SEO title="Home" />
      <Pricing />
    </Layout>
  </div>
)

export default IndexPage

