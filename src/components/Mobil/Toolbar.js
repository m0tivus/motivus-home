import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import { Box, Typography } from '@material-ui/core'
import Theme2 from '../StyleTheme'
import AppBar from '@material-ui/core/AppBar'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import Button from '@material-ui/core/Button'
import { navigate } from 'gatsby-link'
import Div100vh from 'react-div-100vh'

const styles = (Theme) => ({
  root: {
    position: 'fixed',
    display: 'flex',
    width: '100%',
    border: '2px solid red',
    zIndex: '5',
    top: '0%',
  },
  grow: {
    position: 'fixed',
    flexGrow: 1,
    zIndex: 10,

    width: '100%',
    bottom: '0%',
  },
  menuButton: {
    left: '0px',
  },
})

const useStyles = makeStyles((theme) => ({
  loginButton: {
    borderRadius: '0px',
    height: '30px',
    marginLeft: '20px',
  },
}))

class ToolbarComponent extends React.Component {
  state = {
    achorEl: false,
    MobileMoreAnchorEl: false,
  }

  render() {
    const { classes } = this.props

    return (
      <Div100vh className={classes.root}>
        <Theme2>
          <Box
            display='flex'
            width='100%'
            alignItems='flex-end'
            bottom='0%'
            border='3px solid blue'
          >
            <AppBar position='static'>
              <Toolbar>
                <IconButton
                  edge='start'
                  className={classes.menuButton}
                  color='secondary'
                  aria-label='open drawer'
                  onClick={this.props.openDrawerHandler}
                >
                  <MenuIcon />
                </IconButton>
                <Typography>
                  {this.props.account ? 'Motivus' : 'Motivus | Get In!'}
                </Typography>
                <AccountAccess account={this.props.account} />
              </Toolbar>
            </AppBar>
          </Box>
        </Theme2>
      </Div100vh>
    )
  }
}

export default withStyles(styles)(ToolbarComponent)

function AccountAccess({ account }) {
  const classes = useStyles()

  return (
    <React.Fragment>
      {!account ? (
        <Button
          variant='outlined'
          color='secondary'
          size='large'
          className={classes.loginButton}
          onClick={() => navigate('/account/login')}
        >
          login
        </Button>
      ) : (
        <Button
          variant='outlined'
          color='secondary'
          size='large'
          className={classes.loginButton}
          onClick={() => navigate('/')}
        >
          logout
        </Button>
      )}
    </React.Fragment>
  )
}
