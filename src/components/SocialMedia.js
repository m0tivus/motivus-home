import { Box, IconButton } from '@material-ui/core'
import { Facebook, GitHub, LinkedIn } from '@material-ui/icons'
import { navigate } from 'gatsby'

import React from 'react'
import logo from '../../static/logoVertical.svg'

export default function SocialMedia() {
  return (
    <Box
      display='flex'
      position='fixed'
      height='100vh'
      left='5%'
      paddingBottom='50px'
      width='150px'
      top='0%'
      justifyContent='flex-end'
      flexDirection='column'
      alignItems='center'
    >
      <Box
        position='fixed'
        top='7.5%'
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
      >
        <img alt='logoMotivus' src={logo} height='200px'></img>
      </Box>
      {/*<Box>
        <IconButton color='primary'>
          <Facebook />
        </IconButton>
      </Box>*/}
      <Box>
        <IconButton
          color='primary'
          onClick={() => window.open('https://github.com/m0tivus')}
        >
          <GitHub></GitHub>
        </IconButton>
      </Box>
      <Box>
        <IconButton
          color='primary'
          onClick={() =>
            window.open('https://www.linkedin.com/company/motivus')
          }
        >
          <LinkedIn></LinkedIn>
        </IconButton>
      </Box>
    </Box>
  )
}
