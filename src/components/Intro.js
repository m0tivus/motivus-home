import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import ReactPlayer from 'react-player/youtube'
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 400,
    color: theme.palette.secondary.main,
  },
}))

export default function Intro() {
  const classes = useStyles()
  return (
    <Box>
      <Container component='main' className={classes.heroContent}>
        <Typography
          variant='h3'
          align='center'
          color='primary'
          component='subtitle'
          display='block'
          gutterBottom
        >
          Join the revolution in distributed computing!
        </Typography>

        <Typography
          variant='body2'
          align='center'
          color='textPrimary'
          component='subtitle'
          display='block'
          gutterBottom
        >
          Motivus is a collaborative
          <span className={classes.bold}>
            {' '}
            High Performance Computing Network.
          </span>{' '}
          With our framework you can process big volumes of data, and also earn
          extra income by renting your computer power to process data.
        </Typography>
        <Box justifyContent='center' display='flex'>
          <ReactPlayer
            url='https://youtu.be/-AtRjZfEQ94'
            width='854px'
            height='480px'
            controls
            config={{
              youtube: {
                embedOptions: { controls: 1 },
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  )
}
