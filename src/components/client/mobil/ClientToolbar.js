import React from 'react'
import { fade, makeStyles, withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import { Box, Typography } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import BottomNavigation from '@material-ui/core/BottomNavigation'

const useStyles = makeStyles((theme) => ({
  grow: {
    position: 'fixed',
    flexGrow: 1,
    zIndex: 2,

    width: '100%',
    bottom: '0%',
  },

  appBar: {
    backgroundColor: theme.palette.background.paper,
    position: 'static',
  },

  menuButton: {
    left: '0px',
  },
}))

export default function ButtonAppBar({ openDrawerHandler }) {
  const classes = useStyles()

  return (
    <div className={classes.grow}>
      <Box display='flex' width='100%' alignItems='flex-end' bottom='0%'>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='secondary'
              aria-label='open drawer'
              onClick={openDrawerHandler}
            >
              <MenuIcon />
            </IconButton>
            <Typography>Motivus | chuijse</Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}
