import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { classicNameResolver } from 'typescript'

const useStyles = makeStyles({
  divider: {
    //background: 'linear-gradient(90deg, #FE6B8B 30%, #FFFFFF 90%)',
    background:
      'linear-gradient(90deg, rgba(207,100,235,1) 0%, rgba(207,100,235,1) 50%, rgba(207,100,235,0) 100%)',
  },
})

const Title = ({ text }) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Box>
        <Box display='flex' alignItems='center'>
          <Box paddingRight={2}>
            <Typography noWrap variant='h2'>
              {text}
            </Typography>
          </Box>
          <Box
            className={classes.divider}
            maxWidth='100%'
            height='4px'
            width='100%'
          ></Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Title
