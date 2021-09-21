import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import logo from '../../../public/logoBeta.svg'
import Divider from '@material-ui/core/Divider'
import Nav from './Nav'
import Switch from '@material-ui/core/Switch'
import Sun from '@material-ui/icons/Brightness5'
import Moon from '@material-ui/icons/Brightness2Outlined'

const useStyles = makeStyles((theme) => ({
  nav: {
    position: 'fixed',
    backgroundColor: theme.palette.background.headerBackground,
    width: 350,
    height: '100%',
  },

  divider: {
    background: theme.palette.secondary.main,
    width: '90%',
    height: 3,
  },

  textColor: {
    color: '#ffffff',
  },

  iconColor: {
    fill: '#ffffff',
  },
}))

export default function Header({ darkState, setDarkState }) {
  const classes = useStyles()

  const handleChange = (event) => {
    setDarkState(event.target.checked)
  }

  return (
    <div className={classes.nav}>
      <Box
        marginTop='25px'
        marginLeft='25px'
        width='325px'
        display='flex'
        flexDirection='column'
        //border='1px solid orange'
        height='95%'
        justifyContent='space-between'
      >
        <Box>
          <img alt='logoMotivus' src={logo} width='300px'></img>
          <Box marginTop='-35px' marginBottom='25px'>
            <Typography
              variant='h4'
              color='textPrimary'
              className={classes.textColor}
            >
              Cristian Huijse
            </Typography>
          </Box>
          <Divider className={classes.divider} />
          <Box marginTop={8}>
            <Nav />
          </Box>
        </Box>

        <Box display='flex' alignItems='center' marginBottom='20px'>
          <Sun className={classes.iconColor} />
          <Switch
            checked={darkState}
            onChange={handleChange}
            color='primary'
            name='checkedA'
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <Moon color='primary' />
        </Box>
      </Box>
    </div>
  )
}
