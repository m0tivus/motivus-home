import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Container } from '@material-ui/core'
import ContactUsForm from './ContactUsForm'
import { PlayCircleFilledWhite } from '@material-ui/icons'
import ContactUsInfo from './ContactUsInfo'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
    height: '100%',
  },

  info: {
    textAlign: 'center',
    height: '100vh',
    backgroundColor: 'white',
    padding: '20%',
    margin: '0px',
  },

  fill: {
    textAlign: 'center',
    backgroundColor: '#5d25ca',
    height: '100%',
    color: 'white',
    padding: '10% 15% 10% 15%',
    margin: '0px',
  },
}))

export default function CenteredGrid(props) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Container className={classes.root} maxWidth='false'>
        <Grid container>
          <Grid item xs={12} md={6} lg={6}>
            <Container className={classes.info}>
              <ContactUsInfo></ContactUsInfo>
            </Container>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Container className={classes.fill}>
              <ContactUsForm onClose={props.onClose} />
            </Container>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
