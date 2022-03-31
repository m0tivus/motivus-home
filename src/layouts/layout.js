/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import Header from '../components/header'
import Nav from '../components/nav'
import MobileNav from '../components/mobileNav'
import Footer from '../components/Footer'
import Theme from './LightTheme'
import SocialMedia from '../components/SocialMedia'
import ContactToggle from '../contexts/ContactToggle'
import { SnackbarProvider } from 'notistack'
import Button from '@material-ui/core/Button'
import { navigate } from 'gatsby'
import { homeRoutes } from '../components/Routes'

const useStyles = makeStyles((theme) => ({
  content: {
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(8, 0, 6),
    },
  },
  loginButton: {
    borderRadius: '0px',
    height: '40px',
  },
}))

const isBrowser = typeof window !== 'undefined'

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
  const [user, setUser] = React.useState({})
  const theme = useTheme()
  const classes = useStyles()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    if (isBrowser) {
      const user_ = window.localStorage.getItem('user_data')
      if (user_?.id) {
        setUser(user_)
      }
    }
  }, [user])

  console.log(`usuario: ${user}`)

  return (
    <SnackbarProvider
      classes={{ variantInfo: { backgroundColor: theme.palette.primary.main } }}
    >
      <ContactToggle.Provider value={[openContact, setOpenContact]}>
        <Theme>
          {matches ? (
            <MobileNav
              {...props}
              routes={homeRoutes}
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
          <Box
            position='fixed'
            right='5%'
            top={matches ? '21px' : '55px'}
            //height={matches ? '75px' : '150px'}
            //border='1px solid green'
            display='flex'
            justifyContent='center'
            alignItems='center'
            zIndex='20'
          >
            {!matches && <AccountAccess user={user} />}
          </Box>
          <SocialMedia />
          <div
            style={{
              margin: '0 auto',
              maxWidth: 960,
            }}
          >
            <main className={classes.content}>{children}</main>
            <Box mb={matches ? '60px' : '0px'}>
              <Footer />
            </Box>
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

function AccountAccess({ user }) {
  const theme = useTheme()
  const classes = useStyles()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <React.Fragment>
      {user.id ? (
        <Button
          variant='outlined'
          color='secondary'
          size='large'
          className={classes.loginButton}
          onClick={() => navigate('/account/login')}
        >
          test
        </Button>
      ) : (
        <Button
          variant='outlined'
          color='secondary'
          size='large'
          className={classes.loginButton}
          onClick={() => navigate('/account/login')}
        >
          login
        </Button>
      )}
    </React.Fragment>
  )
}
