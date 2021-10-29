import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import SettingTitle from './SettingsTitle'
import AccesTokenCard from './AccessTokenCard'
import Button from '@material-ui/core/Button'
import { classicNameResolver } from 'typescript'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles((theme) => ({
  createTokenDark: {
    color: theme.palette.calypso.main,
    borderColor: theme.palette.calypso.main,
  },

  createTokenLight: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
}))

export default function ApplicationTokens({}) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const dark = theme.palette.type
  return (
    <React.Fragment>
      <SettingTitle text='Application tokens' />
      <Box
        mb='30px'
        display='flex'
        alignItems='flex-start'
        flexDirection={matches ? 'row' : 'column'}
        justifyContent='space-between'
      >
        <Typography variant='body1' gutterBottom>
          Create, delete and manage yours tokens
        </Typography>
        <Box display='flex' justifyContent='space-between' width='245px'>
          <Button
            variant='outlined'
            className={
              dark === 'dark'
                ? classes.createTokenDark
                : classes.createTokenLight
            }
          >
            Create Token
          </Button>
          <Button variant='outlined' color='secondary'>
            Revoke all
          </Button>
        </Box>
      </Box>
      <AccesTokenCard
        name='example-token'
        tokenId='MWBatasdasdad'
        publishDate='21/11/2021'
        lastused='29/12/2020'
      />
    </React.Fragment>
  )
}
