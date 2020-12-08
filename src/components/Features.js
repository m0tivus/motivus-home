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
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elementum diam massa, pulvinar facilisis ligula dapibus viverra. Praesent augue urna, ultrices eu molestie non, bibendum ac neque. In quis facilisis arcu. Cras pretium dapibus bibendum. Sed consequat, lacus nec vulputate laoreet, odio est pharetra dolor, non aliquam risus enim id mi.',
    icon: <FitnessCenterIcon fontSize="large" />,
  },
  {
    name: 'Collaborative',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elementum diam massa, pulvinar facilisis ligula dapibus viverra. Praesent augue urna, ultrices eu molestie non, bibendum ac neque. In quis facilisis arcu. Cras pretium dapibus bibendum. Sed consequat, lacus nec vulputate laoreet, odio est pharetra dolor, non aliquam risus enim id mi.',
    icon: <FitnessCenterIcon fontSize="large"/>,
  },
  {
    name: 'Democratic',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elementum diam massa, pulvinar facilisis ligula dapibus viverra. Praesent augue urna, ultrices eu molestie non, bibendum ac neque. In quis facilisis arcu. Cras pretium dapibus bibendum. Sed consequat, lacus nec vulputate laoreet, odio est pharetra dolor, non aliquam risus enim id mi.',
    icon: <FitnessCenterIcon fontSize="large"/>,
  },
  {
    name: 'Green',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elementum diam massa, pulvinar facilisis ligula dapibus viverra. Praesent augue urna, ultrices eu molestie non, bibendum ac neque. In quis facilisis arcu. Cras pretium dapibus bibendum. Sed consequat, lacus nec vulputate laoreet, odio est pharetra dolor, non aliquam risus enim id mi.',
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
          <Grid item container xs={12} justify="center"   >
          <Typography variant='h3'> Features </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={6}  
          direction="row"
          alignItems="center" >
          {featuresContent.map(feature => (
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Grid container
              irection="row">
                <Grid item xs={2} container justify="center">
                  {feature.icon}
                </Grid>
                <Grid item xs={10}>
                  <Typography variant='h4'>
                    {feature.name}
                  </Typography>
                  {feature.description}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment> 
  );
}