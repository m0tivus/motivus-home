import React from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { dark } from '@material-ui/core/styles/createPalette'
import { typography } from './BaseTheme'

const theme2 = createMuiTheme({
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
      dark: '#9828b4',
      contrastText: '#fff',
    },

    background: {
      paper: '#2C2771',
      default: '#FFFFFF',
    },

    text: {
      primary: '#000000',
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

const Theme2 = ({ children }) => {
  return <ThemeProvider theme={theme2}>{children}</ThemeProvider>
}

Theme2.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Theme2
