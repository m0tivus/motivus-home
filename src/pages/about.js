import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

import SEO from '../components/seo'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import _ from 'lodash'

/*---icons---*/
import HttpIcon from '@material-ui/icons/Http'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import RedditIcon from '@material-ui/icons/Reddit'
import GitHubIcon from '@material-ui/icons/GitHub'
import { CenterFocusStrong } from '@material-ui/icons'
import Fade from '@material-ui/core/Fade'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },

  root: {},

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
  description: {
    display: 'flex',
    background: 'white',
    height: '100%',
    alignItems: 'center',
    padding: '15px',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}))

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const SocialNetworks = ({ networks }) => (
  <Container>
    {!_.isEmpty(networks) ? (
      networks.map(({ icon, url }) => {
        switch (icon) {
          case 'github':
            return (
              <Link href={url} key={url}>
                <GitHubIcon />
              </Link>
            )
          case 'linkedin':
            return (
              <Link href={url} key={url}>
                <LinkedInIcon />
              </Link>
            )
          case 'web':
            return (
              <Link href={url} key={url}>
                <HttpIcon />
              </Link>
            )
          case 'reddit':
            return (
              <Link href={url} key={url}>
                <RedditIcon />
              </Link>
            )
        }
      })
    ) : (
        <p>hola mundo</p>
      )}
  </Container>
)

function HumanCard(props) {
  const classes = useStyles()

  const [checked, setChecked] = React.useState(false)

  const toggleChecked = () => setChecked((prev) => !prev)

  const { data } = props

  return (
    <Grid item key={data.node.id} xs={12} sm={6} md={4} lg={4} xl={4}>
      <Card
        className={classes.card}
        onMouseEnter={() => setChecked(true)}
        onMouseLeave={() => setChecked(false)}
      >
        <CardMedia
          onClick={toggleChecked}
          className={classes.cardMedia}
          image={data.node.photography.asset.fixed.src}
          title={data.node.name}
        >
          <Fade in={checked}>
            <Box className={classes.description}>
              <Typography color='primary' align='justify'>
                {data.node.description}
              </Typography>
            </Box>
          </Fade>
        </CardMedia>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant='h5' component='h2'>
            {data.node.name}
          </Typography>
          <Typography variant='subtitle1' color='secondary'>
            {data.node.role}
          </Typography>
        </CardContent>
        <CardActions>
          {!_.isNull(true) ? (
            <SocialNetworks networks={data.node.networks} />
          ) : (
              <span></span>
            )}
        </CardActions>
      </Card>
    </Grid>
  )
}

export default function Aboutpage({ data, ...props }) {
  const classes = useStyles()

  return (
    <Layout {...props}>
      <SEO title='About us' />
      <CssBaseline />
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth='lg'>
          <Typography
            component='h1'
            variant='h2'
            align='center'
            color='primary'
            gutterBottom
          >
            Motivus Team
          </Typography>
          <Typography
            variant='h5'
            align='center'
            color='textSecondary'
            paragraph
          >
            Our team is made up of smart and curious human beings that love to
            interact with technology, get to know them a little bit more by
            hovering over their profiles.
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth='lg'>
        {/* End hero unit */}
        <Grid container spacing={4}>
          {data.allSanityHuman.edges.map((card) => (
            <HumanCard data={card}></HumanCard>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}

export const humanQuery = graphql`
  query AboutQuery {
    allSanityHuman {
      edges {
        node {
          id
          role
          photography {
            asset {
              fixed(width: 400, height: 400) {
                ...GatsbySanityImageFixed
              }
            }
          }
          name
          description
          role
          networks {
            icon
            url
          }
        }
      }
    }
  }
`
