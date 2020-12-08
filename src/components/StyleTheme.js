
import React from "react"
import PropTypes from "prop-types"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme2 = createMuiTheme({
  typography: {
    fontFamily: 'Asap',

    h4: {
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: '1.5rem',
      lineHeight: 1.334,
      letterSpacing: '0em',
    },
  },

  palette: {
    primary: {
      light: '#9455fe',
      main: '#5d25ca',
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
      paper: '#9468e9',
      default: '#613bb6',
    },

    text: {
      primary: '#fff',
    },
  },
  overrides: {
    // Style sheet name ⚛️
    MuiTab: {
      // Name of the rule
      textColorSecondary: {
        // Some CSS
        color: '#aaa',
      },
    },
  },
})

const Theme2 = ({ children }) => {

  return (
    <ThemeProvider theme={theme2}>
     {children}
    </ThemeProvider>
  )
}

Theme2.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Theme2