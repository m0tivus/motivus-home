import { Box, Grid } from '@material-ui/core'
import React from 'react'
import ClienOptionsCards from './CLientOptionsCards'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import ReactPlayer from 'react-player/youtube'

const CardsContent = [
  {
    title: ' distribute my algoritm',
    description:
      'Distribute your algorithms in the motivus marketplace, and obtain all these benefits: distribution, selling and hosting.',
    textButton: 'marketplace',
  },
  {
    title: ' process data!',
    description:
      'Program your own drivers to work with the Motivus cluster and start processing your data now.',
    textButton: 'learn how',
  },
  {
    title: ' monetize my website',
    description:
      'Host the Motivus FloatingTool on your website and get paid whenever users process through it.',
    textButton: 'soon',
  },
  {
    title: ' share my computer power',
    description:
      'Share your computer power with researchers all around the world and get paid.',
    textButton: 'Share',
  },
]

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 400,
    color: theme.palette.secondary.main,
  },
}))

export default function ClientOptionsV2() {
  const classes = useStyles()
  const theme = useTheme()
  const dark = theme.palette.type
  return (
    <React.Fragment>
      <Intro />
      <Grid container l={12} spacing={5}>
        {CardsContent.map((cardContent, i) => (
          <Grid item sm={6} xs={12} key={`ClientOptionsCard-${i}`}>
            <ClienOptionsCards
              title={cardContent.title}
              description={cardContent.description}
              textButton={cardContent.textButton}
              index={i}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  )
}

function Intro() {
  const classes = useStyles()
  return (
    <Box marginBottom='80px'>
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
