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

//import Header from './header'
//import Nav from './nav'
//import MobileNav from './mobileNav'
//import Footer from './Footer'
import DarkTheme from './DarkTheme'
import LightTheme from './LightTheme'
//import SocialMedia from './SocialMedia'
//import { set } from 'lodash'
//import ContactToggle from '../contexts/ContactToggle'
import { SnackbarProvider } from 'notistack'
import { Box } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from '../components/client/Header'

const useStyles = makeStyles((theme) => ({
  content: {
    //border: '1px solid red',
    marginLeft: 400,
    paddingTop: 25,
    marginRight: 50,
  },
}))
const Layout = ({ children, ...props }) => {
  const [openContact, setOpenContact] = React.useState(false)

  const theme = useTheme()
  const classes = useStyles()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const [darkState, setDarkState] = React.useState(false)

  const Theme = darkState ? DarkTheme : LightTheme

  return (
    <SnackbarProvider
      classes={{ variantInfo: { backgroundColor: theme.palette.primary.main } }}
    >
      <Theme>
        <CssBaseline></CssBaseline>
        <Header setDarkState={setDarkState} darkState={darkState} />
        <Box>
          <div
            style={{
              margin: '0 auto',
            }}
          >
            <main className={classes.content}>{children}</main>
          </div>
        </Box>
      </Theme>
    </SnackbarProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
