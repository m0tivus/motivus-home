import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'

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
  },

  info: {
    fontFamily: 'Roboto Mono',
  },
  author: {
    fontWeight: 'bold',
  },
  publishDate: {
    fontWeight: '400',
  },
  separate: {
    borderColor: theme.palette.secondary.main,
    borderLeft: '4px solid',
  },
  img: {
    width: '25px',
    borderRadius: '100px',
    marginRight: '5px',
  },
  cost: {
    fontFamily: 'Roboto Mono',
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
  },
  stars: {
    fontFamily: 'Roboto Mono',
    fontWeight: 'bold',
  },
  starIcon: {
    fill: theme.palette.calypso.main,
    marginRight: '15px',
  },
}))

export default function AlgorithmCards({
  name,
  author,
  publishDate,
  description,
  image,
  cost,
  stars,
}) {
  const classes = useStyles()
  const theme = useTheme()
  const dark = theme.palette.type
  return (
    <React.Fragment>
      <Box
        height='110px'
        className={
          dark === 'dark' ? classes.backgroundDark : classes.backgroundLight
        }
        display='flex'
        justifyContent='center'
        alignItems='center'
        paddingLeft='1px'
        paddingRight='1px'
        marginBottom='30px'
      >
        <Box
          width='100%'
          height='108px'
          display='flex'
          flexDirection='row'
          padding='10px'
          justifyContent='space-between'
          className={classes.root}
        >
          <Box>
            <Box
              display='flex'
              height='100%'
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
                <Box display='flex' flexDirection='column'>
                  <Typography variant='body'>{description}</Typography>
                  <Box
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    mt='5px'
                  >
                    <img src={image} alt={name} className={classes.img}></img>
                    <Typography variant='body1' className={classes.info}>
                      <span className={classes.author}>{author}</span> published{' '}
                      <span className={classes.publishDate}>{publishDate}</span>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            display='flex'
            flexDirection='column'
            alignItems='flex-end'
            justifyContent='flex-end'
          >
            <Box
              display='flex'
              flexDirection='row'
              justifyContent='center'
              mb='5px'
            >
              <StarIcon className={classes.starIcon} fontSize='small' />
              <Typography variant='body1' className={classes.stars}>
                {stars}
              </Typography>
            </Box>
            <Typography variant='body1' className={classes.info}>
              Motivus Coin / mins
            </Typography>
            <Typography variant='h4' className={classes.cost}>
              {cost}
            </Typography>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}
