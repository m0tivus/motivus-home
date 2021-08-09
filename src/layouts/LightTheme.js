import React from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { dark } from '@material-ui/core/styles/createPalette'
import { typography } from './BaseTheme'

const theme2 = createMuiTheme({
  typography,
  palette: {
    type: 'light',

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
      paper: '#FFFFFF',
      headerBackground: '#2C2771',
      paperGradient: 'linear-gradient(180deg, #F0EEEE 60%, #FFFFFF 100%)',
      borderGradient: 'linear-gradient(135deg, #ACACAC 0%, #FFFFFF 100%)',
      filter: 'linear-gradient(180deg, #8657E1 0%, #FF72EB 100%)',
      default: '#ffffff',
    },

    text: {
      primary: '#000000',
      secondary: '#424242',
    },

    button: {
      text: '#2C2771',
    },
  },
  shadows: [
    'none',
    '1px 3px 2px 0px rgb(0, 0, 0, 0.2)',
    '1px 3px 2px 1px rgb(0, 0, 0, 0.3)',
  ],

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
