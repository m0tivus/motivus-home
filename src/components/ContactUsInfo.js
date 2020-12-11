import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Theme2 from './StyleTheme';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'left',
  },
  
  
}));

export default function ContatUsInfo() {
  const classes = useStyles();

  return (
    <Theme2>
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          
        </Grid>
        <Grid item xs={12}>
          <Typography  variant="h4" color="Primary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid itme xs={12}>Chile,</Grid>
          <Grid itme xs={12}>Perez Rosales 640,</Grid>
          <Grid itme xs={12}>Office 21,</Grid>
          <Grid itme xs={12}>Valdivia. </Grid>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <Grid itme xs={12}>Lorem ipsum dolor sit amet</Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography  variant="h6" color="Primary">
            <Grid itme xs={12}>Info@motivus.cl
            </Grid>
          </Typography>
        </Grid>
      </Grid>
    </div>
    </Theme2>
  );
}