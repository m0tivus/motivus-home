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
//import SocialMedia from './SocialMedia'
//import { set } from 'lodash'
//import ContactToggle from '../contexts/ContactToggle'
import { SnackbarProvider } from 'notistack'
import { Box } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Bar from '../components/client/Bar'

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

  return (
    <SnackbarProvider
      classes={{ variantInfo: { backgroundColor: theme.palette.primary.main } }}
    >
      <DarkTheme>
        <CssBaseline></CssBaseline>
        <Bar />
        <Box>
          <div
            style={{
              margin: '0 auto',
            }}
          >
            <main className={classes.content}>{children}</main>
          </div>
        </Box>
      </DarkTheme>
    </SnackbarProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
