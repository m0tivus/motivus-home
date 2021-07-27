import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import image from '../../../static/Algorithm.png'
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '380px',
    height: '500px',
    borderRadius: '0px 50px',
  },
  media: {
    height: 215,
  },
  title: {
    background: '#000',
    width: '90%',
    marginTop: '-50px',
    padding: '10px',
  },
  detail: {
    color: theme.palette.secondary.main,
  },
}))

export default function MediaCard() {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title='Contemplative Reptile'
        />
        <CardContent className={classes.title}>
          <Typography variant='h5' component='h2' color='secondary'>
            Prediction RNa 3d Structures with Motivus
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box margin='10px' width='90%'>
        <Typography variant='body2' color='textPrimary' component='p'>
          Predicting and building 3D structures of RNA is key for understanding
          its function and behaviors. Learn how Simon Poblete, a chilean
          researcher, was able to create a program with Motivus that allowed him
          to obtain, the full structure of a RNA motif, based uniquely on its
          sequence.
        </Typography>
        <Box display='flex' flexDirection='row'>
          <Typography variant='body2' color='textPrimary' component='p'>
            <span className={classes.detail}>&#9614;</span> Rodrigo Inostroza,
            2020-12-29
          </Typography>
        </Box>
      </Box>
      <CardActions>
        <Button size='small' color='primary'>
          Share
        </Button>
        <Button size='small' color='primary'>
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}
