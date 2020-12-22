import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import { Box } from '@material-ui/core'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const reference = [
  {
    label: 'Dairylink',
    citation: 'No hay caminos para la paz; la paz es el camino',
    author: 'Carlos aguirre',
  },
  {
    label: 'Vigía Covid',
    citation: 'Haz el amor y no la guerra',
    author: 'Claudio Verdugo',
  },
  {
    label: 'Cristianaguirre.com',
    citation: 'Cada día sabemos más y entendemos menos',
    author: 'Cristian Aguirre',
  },
]

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '100%',
    flexGrow: 1,
    marginTop: 50,
  },

  citation: {
    fontFamily: 'Roboto',
    fontSize: '1.8rem',
    fontStyle: 'italic',
    fontWeight: '100',
  },
}))

function SwipeableTextMobileStepper() {
  const classes = useStyles()
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  return (
    <div className={classes.root}>
      <Typography variant='h5' color='primary' align='center' gutterBottom>
        Happy clients:
      </Typography>
      <Box mt={2}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {reference.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box maxWidth='550px' margin='auto'>
                  <Typography
                    align='center'
                    className={classes.citation}
                    gutterBottom
                  >
                    "{step.citation}"
                  </Typography>
                  <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='flex-end'
                    alignItems='center'
                  >
                    <Typography variant='h6' color='textSecondary'>
                      {step.author},&nbsp;
                    </Typography>
                    <Typography variant='h5' color='secondary'>
                      {step.label}
                    </Typography>
                  </Box>
                </Box>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
      </Box>
    </div>
  )
}

export default SwipeableTextMobileStepper
