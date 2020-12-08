import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import AddressForm from "./ContactUsForm"
import { PlayCircleFilledWhite } from '@material-ui/icons';
import ContactUsInfo from './ContactUsInfo'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
    height: '100%',
    
  },
 
  info: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100vh',
    backgroundColor: 'white',
    padding: '20%',
    
  },

  fill: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#5d25ca',
    height: '100vh',
    color: 'white',
    padding: '15%',

  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <React.Fragment>
    <Container className={classes.root} maxWidth="false">
      <Grid container spacing={0}>
        <Grid item xs={12}  md={6} lg={6}>
         <Container className={classes.info}>
          <ContactUsInfo></ContactUsInfo>
          </Container>
        </Grid>
        <Grid item xs={12}  md={6} lg={6}>
          <Container className={classes.fill}>
          <AddressForm />
          </Container>
         </Grid>
       </Grid>   
    </Container>
    </React.Fragment>
  );
}