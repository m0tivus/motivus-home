import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MyAlgorithmCards from './MyAlgorithmCards'
import { Box, Grid } from '@material-ui/core'
import { motion } from 'framer-motion'
import { container, listItem } from './DropDownAnimation'
import { transformAlgorithm } from '../utils'
import { Algorithm } from '../models'

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    width: '100%',
  },
}))

export default function MyAlgorithms({ variant }) {
  const classes = useStyles()
  const [algorithms, setAlgorithms] = React.useState([])

  const getAlgorithmData = async () => {
    const algoritms_ = await Algorithm.all()
    setAlgorithms(algoritms_.map(transformAlgorithm))
  }
  React.useEffect(() => {
    getAlgorithmData()
  }, [])

  console.log(algorithms)

  return (
    <React.Fragment>
      <Box
        display='flex'
        flexDirection='column'
        alignItems={variant === 'home' ? 'center' : 'flex-start'}
        mb='70px'
      >
        {/*<AlgorithmFilter variant={variant} data={allAlgorithm} /> */}

        <Grid
          container
          className={classes.gridContainer}
          component={motion.div}
          variants={container}
          initial='hidden'
          animate='show'
        >
          {algorithms.map((a, k) => (
            <Grid
              item
              key={`my-algorithm-cards-${k}`}
              xs={12}
              component={motion.div}
              variants={listItem}
            >
              <MyAlgorithmCards variant={variant} {...a} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  )
}
