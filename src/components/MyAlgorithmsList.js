import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MyAlgorithmCards from './MyAlgorithmCards'
import { Box, Grid } from '@material-ui/core'
import { motion } from 'framer-motion'
import { container, listItem } from './DropDownAnimation'
import { transformAlgorithm } from '../utils'
import { Algorithm } from '../models'
import NoAlgorithms from './NoAlgorithms'

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    width: '100%',
  },
}))

export default function MyAlgorithms({ variant }) {
  const classes = useStyles()
  const [algorithms, setAlgorithms] = React.useState([])

  const getAlgorithmData = async () => {
    const [owned, maintained] = await Promise.all([
      Algorithm.owned(),
      Algorithm.maintained(),
    ])
    const owned_ = owned.map((a) => ({ ...a, role: 'OWNER' }))
    const maintained_ = maintained.map((a) => ({ ...a, role: 'MAINTAINER' }))
    setAlgorithms([...owned_, ...maintained_].map(transformAlgorithm))
  }
  React.useEffect(() => {
    getAlgorithmData()
  }, [])

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
          {algorithms ? (
            algorithms.map((a, k) => (
              <Grid
                item
                key={`my-algorithm-cards-${k}`}
                xs={12}
                component={motion.div}
                variants={listItem}
              >
                <MyAlgorithmCards variant={variant} {...a} />
              </Grid>
            ))
          ) : (
            <NoAlgorithms />
          )}
        </Grid>
      </Box>
    </React.Fragment>
  )
}
