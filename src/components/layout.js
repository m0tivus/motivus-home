/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import {
  createMuiTheme,
  ThemeProvider,
  useTheme,
} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import Header from './header'
import Nav from './nav'
import MobileNav from './mobileNav'
import Footer from './Footer'
import Theme2 from './StyleTheme'

const Layout = ({ children, ...props }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Theme2>
      {matches ? <MobileNav {...props} /> : <Nav {...props} />}
      <Header siteTitle={data.site.siteMetadata?.title || 'Title'} />
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
        }}
      >
        <main>{children}</main>
        <Footer></Footer>
      </div>
    </Theme2>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
