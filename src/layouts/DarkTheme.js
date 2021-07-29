import React from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { dark } from '@material-ui/core/styles/createPalette'
import { typography } from './BaseTheme'

const DarkTheme = createMuiTheme({
  typography,

  palette: {
    type: 'dark',

    primary: {
      light: '#9455fe',
      main: '#8657E1',
      dark: '#1a0098',
      contrastText: '#fff',
    },

    secondary: {
      light: '#ff8fff',
      main: '#cc5de7',
      dark: '#98D8b4',
      contrastText: '#fff',
    },

    background: {
      paper: '#2C2771',
      default: '#131144',
    },

    text: {
      primary: '#ffffff',
      secondary: '#424242',
    },
  },

  overrides: {
    MuiTypography: {
      gutterBottom: {
        marginBottom: 16,
      },
    },
  },
  MuiTab: {
    // Name of the rule
    textColorSecondary: {
      // Some CSS
      color: '#aaa',
    },
  },
})

/*const nivoTheme = {
  color: '#FFFFFF',
}*/

const ThemeD = ({ children }) => {
  return <ThemeProvider theme={DarkTheme}>{children}</ThemeProvider>
}

ThemeD.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ThemeD
