import { Box, Typography } from '@material-ui/core'
import { motion } from 'framer-motion'
import React from 'react'
import emptyAlgorithm from '../images/AlgorithmEmpty.png'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: '50px',
    width: '89.75%',
  },
  secondaryColor: {
    color: theme.palette.secondary.main,
  },
  animationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    //border: '1px solid red',
  },
  textColor: {
    color: '#343434',
  },
  fixedLoader: {
    background: '#fff',
    zIndex: '20',
  },
}))

export default function NoAlgorithms() {
  return (
    <React.Fragment>
      <Box
        display='flex'
        width='100%'
        justifyContent='center'
        alignItems='center'
        //border='1px solid red'
      >
        <img src={emptyAlgorithm} width='50%' height='50%' />
      </Box>
    </React.Fragment>
  )
}
