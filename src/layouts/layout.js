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
  makeStyles,
  ThemeProvider,
  useTheme,
} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import Header from '../components/header'
import Nav from '../components/nav'
import MobileNav from '../components/mobileNav'
import Footer from '../components/Footer'
import Theme from './LightTheme'
import SocialMedia from '../components/SocialMedia'
import { set } from 'lodash'
import ContactToggle from '../contexts/ContactToggle'
import { SnackbarProvider } from 'notistack'

const useStyles = makeStyles((theme) => ({
  content: {
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(8, 0, 6),
    },
  },
}))
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

  const [openContact, setOpenContact] = React.useState(false)

  const theme = useTheme()
  const classes = useStyles()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <SnackbarProvider
      classes={{ variantInfo: { backgroundColor: theme.palette.primary.main } }}
    >
      <ContactToggle.Provider value={[openContact, setOpenContact]}>
        <Theme>
          {matches ? (
            <MobileNav
              {...props}
              openContact={openContact}
              setOpenContact={setOpenContact}
            />
          ) : (
            <Nav
              {...props}
              openContact={openContact}
              setOpenContact={setOpenContact}
            />
          )}
          <Header siteTitle={data.site.siteMetadata?.title || 'Title'} />
          <SocialMedia />
          <div
            style={{
              margin: '0 auto',
              maxWidth: 960,
            }}
          >
            <main className={classes.content}>{children}</main>
            <Footer></Footer>
          </div>
        </Theme>
      </ContactToggle.Provider>
    </SnackbarProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
