import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

const useStyles = makeStyles((theme) => ({
  
root:{
  padding: theme.spacing(8, 0, 6),
  
},
head:{
  paddingBottom: '50px',
}
}));

const featuresContent = [
  {
    name: 'Secure',
    description: 'Your data and files are safe.',
    icon: <FitnessCenterIcon fontSize="large" />,
  },
  {
    name: 'Collaborative',
    description: 'People working together.',
    icon: <FitnessCenterIcon fontSize="large"/>,
  },
  {
    name: 'Democratic',
    description: 'Available for everyone.',
    icon: <FitnessCenterIcon fontSize="large"/>,
  },
  {
    name: 'Green',
    description: 'No need for server farms.',
    icon: <FitnessCenterIcon fontSize="large"/>,
  },
  {
    name: 'Easy',
    description: 'No coding skills needed.',
    icon: <FitnessCenterIcon fontSize="large"/>,
  },
  {
    name: 'Distributed',
    description: 'Compute anywhere around the world.',
    icon: <FitnessCenterIcon fontSize="large"/>,
  },
]


export default function Features() {
  const classes = useStyles();
  

  return (

    <React.Fragment>
      <CssBaseline />
      <Container className={classes.root}>
        <Grid container direction="row" className={classes.head}>
          <Grid  item container xs={12} justify="center"   >
          <Typography variant='h3' color="primary"> Features </Typography>
          </Grid>
        </Grid>
        <Grid id="2"container  
          direction="row"
          alignItems="center" >
          {featuresContent.map(feature => (
            <Grid id="3"container xs={12} sm={6} md={6} lg={6} style={{ padding:'10px 30px' }} >
                <Grid item xs={2} container justify="center">
                  {feature.icon}
                </Grid>
                <Grid item xs={10}>
                  <Typography variant='h4'>
                    {feature.name}
                  </Typography>
                  <p style={{ hyphens: 'auto', textJustify: 'auto' }}>
                  {feature.description}
                  </p>
                </Grid>
              
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment> 
  );
}