import React from "react"
import { graphql } from "gatsby"


import Layout from "../components/layout"

import SEO from "../components/seo"



import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import _ from 'lodash'

/*---icons---*/
import HttpIcon from '@material-ui/icons/Http';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import RedditIcon from '@material-ui/icons/Reddit';
import GitHubIcon from '@material-ui/icons/GitHub';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    
  },

  root:{
    
  },
  
  cardGrid: {
    
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    margin: 'auto',
    width: 'auto',
    
  },
  card: {
    height: '100%',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '0%', // 16:9
    height: '400px',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const SocialNetworks = ( {networks} ) => (
  <Container>
      { ! _.isEmpty(networks)
          ? networks.map(({ icon, url }) => 
            {
              switch (icon) {
                case 'github':
                  return(
                  <Link href={url}>
                    <GitHubIcon/>  
                  </Link>)
                case 'linkedin':
                  return(
                  <Link href={url}>
                    <LinkedInIcon/>  
                  </Link>)
                case 'web':
                  return(
                  <Link href={url}>
                    <HttpIcon/>  
                  </Link>)
                case 'reddit':
                  return(
                  <Link href={url}>
                    <RedditIcon/>  
                  </Link>)
              }}
          )
          : <p>hola mundo</p>
      }
  </Container>
)




export default function Aboutpage ({data}) {
  const classes = useStyles();
  

  return (
    <React.Fragment>
      <SEO title="About us" />
      <CssBaseline />
      
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Equipo Motivus
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.allStrapiHuman.edges.map((card) => (
              <Grid item key={card.node.id} xs={12} sm={6} md={4} lg={4} xl={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.node.photography.childImageSharp.fixed.src}
                    title={card.node.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {card.node.name}
                    </Typography>
                    <Typography>
                    {card.node.description}
                    
                    </Typography> 
                  </CardContent>
                  <CardActions>
                  { !_.isNull(card.node.social)
                    ? <SocialNetworks networks={card.node.social.networks}/>
                    : <span></span>}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  
  );
}

 

export const humanQuery = graphql`  
  query AboutQuery {
    allStrapiHuman {
      edges {
        node {
          id
          photography {
            childImageSharp {
              fixed(width: 400, height: 400) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          name
          description
          role
          social{
            networks{
              icon
              url
            }
          }
        }
      }
    }
  }
`