import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import { navigate } from 'gatsby'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  backgroundDark: {
    background:
      'linear-gradient(-90deg, rgba(38,93,237,1) 0%, rgba(245,78,221,1) 100%)',
  },

  backgroundLight: {
    background:
      'linear-gradient(-90deg, rgba(93,37,202,1) 0%, rgba(231,51,255,1) 100%)',
  },

  root: {
    backgroundColor: theme.palette.background.default,
    cursor: 'pointer',
  },

  createDate: {
    fontFamily: 'Roboto Mono',
    fontWeight: '300',
  },

  lastused: {
    marginTop: '5px',
    fontWeight: '300',
  },
  separate: {
    borderColor: theme.palette.secondary.main,
    borderLeft: '4px solid',
  },
  white: {
    color: theme.palette.text.primary,
  },
}))

export default function AccesTokenCard({
  name,
  publishDate,
  tokenId,
  lastused,
}) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const dark = theme.palette.type
  return (
    <React.Fragment>
      <Box
        className={
          dark === 'dark' ? classes.backgroundDark : classes.backgroundLight
        }
        display='flex'
        justifyContent='center'
        alignItems='center'
        paddingLeft='1px'
        paddingRight='1px'
        paddingTop='1px'
        paddingBottom='1px'
        marginBottom='30px'
      >
        <Box
          width='100%'
          display='flex'
          flexDirection={matches ? 'row' : 'column'}
          padding='10px'
          justifyContent='space-between'
          className={classes.root}
        >
          <Box>
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='space-between'
            >
              <Typography variant='h5'>{name}</Typography>
              <Box
                display='flex'
                flexDirection='row'
                className={classes.separate}
                pl='6px'
                ml='4px'
              >
                <Box display='flex' flexDirection='column' mt='5px'>
                  <Typography variant='h6' color='secondary'>
                    {tokenId} <span className={classes.white}>- Token Id</span>
                  </Typography>
                  <Box
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    mt='5px'
                  >
                    <Typography variant='body1' className={classes.createDate}>
                      Created {publishDate}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            display='flex'
            flexDirection={matches ? 'column' : 'row'}
            alignItems={matches ? 'flex-end' : 'flex-start'}
            justifyContent={matches ? 'flex-end' : 'space-between'}
            mt={matches ? '0px' : '15px'}
          >
            <Box
              display='flex'
              flexDirection='row'
              justifyContent='center'
              mb='5px'
            ></Box>
            <Box display='flex' flexDirection='column' alignItems='center'>
              <Button variant='outlined' color='secondary'>
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}
