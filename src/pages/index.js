import React from "react"
import { Link, graphql } from "gatsby"
import { Router } from "@reach/router"

import Aboutpage from "./about"


import Layout from "../components/layout"
import SEO from "../components/seo"
import Intro from "../components/ClientOptions"
import Features from "../components/Features"
import HowItWorks from "../components/HowItWorks"




const IndexPage = (props) => (
  <div>
    
    <Layout {... props}>
      <SEO title="Home" />
      <Intro />
      <HowItWorks></HowItWorks>
      <Features></Features>
    </Layout>
  </div>
)

export default IndexPage

