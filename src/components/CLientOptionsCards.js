import React, { useRef, useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { motion } from 'framer-motion'
import CardButton from './client/CardButton'
import Scientist from '../images/scientist.png'
import ScientistLamp from '../images/scientist-lamp.png'
import algoritmChar from '../images/algorithmDeveloper.png'
import algoritm from '../images/algorithmDeveloper-net.png'
import WebDeveloperChar from '../images/webDevloper.png'
import WebDeveloperGraph from '../images/webDevloper-grpah.png'
import punk from '../images/punk.png'
import punkDolar from '../images/punk-dolar.png'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '15px',
  },
  container: {
    display: 'flex',
    width: 'max-content',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: cardHeight + border,
    overflow: 'hidden',
  },
  border: {
    display: 'flex',
    flexShrink: '0',
    width: '150%',
    height: '150%',
    background:
      'linear-gradient(90deg, rgba(38,93,237,1) 30%, rgba(245,78,221,1) 60%)',
  },
  card: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    height: cardHeight,
    background: 'linear-gradient(325.31deg, #8657E1 -1.24%, #5D25CA 100%)',
  },
  titleContainer: {
    marginTop: '10px',
    marginLeft: '-20px',
    background: '#000',
    width: '90%',
    padding: '10px',
    paddingLeft: '40px',
    height: 'max-content',
    zIndex: 2,
  },
  title: {
    fontSize: '1.7rem',
  },
  description: {
    fontSize: '1.1rem',
    color: theme.palette.text.white,
  },
}))

const cardHeight = 400
const border = 6

export default function ClienOptionsCards({
  title,
  description,
  textButton,
  index,
}) {
  const ref = useRef(null)
  const classes = useStyles()
  const theme = useTheme()
  const dark = theme.palette.type
  const [rootWidth, setRootWidth] = useState('')
  const [active, setactive] = useState(false)

  useEffect(() => {
    setRootWidth(ref.current && ref.current.offsetWidth)
    console.log(rootWidth)
  }, [ref.current])

  return (
    <motion.div
      className={classes.root}
      onHoverStart={() => setactive(true)}
      onHoverEnd={() => setactive(false)}
      animate={{ y: active ? -20 : 0, scale: active ? 1.05 : 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={classes.container} ref={ref}>
        <motion.div
          className={classes.border}
          animate={{ rotate: 360 }}
          transition={{ ease: 'linear', duration: 2, repeat: Infinity }}
        ></motion.div>
        <div className={classes.card} style={{ width: rootWidth - border }}>
          <div className={classes.titleContainer}>
            <Typography
              variant='h5'
              component='h2'
              color='secondary'
              className={classes.title}
            >
              {title}
            </Typography>
          </div>
          <Box display='flex' marginTop='10px' marginLeft='20px' height='100%'>
            <Box width='45%' display='flex' flexDirection='column'>
              <Typography variant='body2' className={classes.description}>
                {description}
              </Typography>
              <Box marginTop='40px'>
                <CardButton arrow={true} themeDark='dark' size='large'>
                  {textButton}
                </CardButton>
              </Box>
            </Box>
            <Box
              display='flex'
              width='55%'
              alignItems='flex-end'
              objectFit='cover'
            >
              {index === 0 ? <CharacterAlgorithm active={active} /> : null}
              {index === 1 ? <CharacterScientist active={active} /> : null}
              {index === 2 ? <CharacterWebDev active={active} /> : null}
              {index === 3 ? <CharacterPunk active={active} /> : null}
            </Box>
          </Box>
        </div>
      </div>
    </motion.div>
  )
}

function CharacterAlgorithm({ active }) {
  return (
    <React.Fragment>
      <Box
        height='130px'
        flexShrink='0'
        marginBottom='100px'
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{
          y: active ? -20 : 0,
          opacity: active ? 1 : 0.6,
          scale: active ? 1.1 : 1,
        }}
      >
        <img src={algoritm} height='100%' alt='motivus charater idea' />
      </Box>
      <Box
        position='absolute'
        height='200px'
        width='280px'
        marginLeft='45px'
        flexShrink='0'
      >
        <img src={algoritmChar} height='100%' alt='motivus charater' />
      </Box>
    </React.Fragment>
  )
}

function CharacterScientist({ active }) {
  return (
    <React.Fragment>
      <Box
        height='130px'
        flexShrink='0'
        marginLeft='120px'
        marginBottom='150px'
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{
          y: active ? -20 : 0,
          opacity: active ? 1 : 0.6,
          scale: active ? 1.1 : 1,
        }}
      >
        <img src={ScientistLamp} height='100%' alt='motivus charater idea' />
      </Box>
      <Box
        position='absolute'
        height='200px'
        width='280px'
        marginLeft='-40px'
        flexShrink='0'
      >
        <img src={Scientist} height='100%' alt='motivus charater' />
      </Box>
    </React.Fragment>
  )
}

function CharacterWebDev({ active }) {
  return (
    <React.Fragment>
      <Box
        height='130px'
        flexShrink='0'
        marginBottom='130px'
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{
          y: active ? -20 : 0,
          opacity: active ? 1 : 0.6,
          scale: active ? 1.1 : 1,
        }}
      >
        <img
          src={WebDeveloperGraph}
          height='100%'
          alt='motivus charater idea'
        />
      </Box>
      <Box
        position='absolute'
        height='200px'
        width='280px'
        marginLeft='-45px'
        flexShrink='0'
      >
        <img src={WebDeveloperChar} height='100%' alt='motivus charater' />
      </Box>
    </React.Fragment>
  )
}

function CharacterPunk({ active }) {
  return (
    <React.Fragment>
      <Box
        height='130px'
        flexShrink='0'
        marginLeft='100px'
        marginBottom='130px'
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{
          y: active ? -20 : 0,
          opacity: active ? 1 : 0.6,
          scale: active ? 1.1 : 1,
        }}
      >
        <img src={punkDolar} height='100%' alt='motivus charater idea' />
      </Box>
      <Box
        position='absolute'
        height='250px'
        width='280px'
        marginLeft='0px'
        marginBottom='-20px'
        flexShrink='0'
      >
        <img src={punk} height='100%' alt='motivus charater' />
      </Box>
    </React.Fragment>
  )
}
