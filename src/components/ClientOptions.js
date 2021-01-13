import React from 'react'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import StarIcon from '@material-ui/icons/StarBorder'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Theme2 from './StyleTheme'
import { FormatItalic, PlayCircleFilledWhite } from '@material-ui/icons'
import ContactToggle from '../contexts/ContactToggle'
import { navigate } from 'gatsby'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(0, 0, 6),
  },
  cardDistribution: {
    padding: '10px',
  },
  cardside: {
    padding: '10px',
    background: 'linear-gradient(45deg, #5d25ca 30%, #cc5de7 90%)',
  },
  cardmid: {
    padding: '10px',
    background: 'linear-gradient(45deg, #cc5de7 30%, #5d25ca 90%)',
  },
  cardHeader: {
    color: 'white',
    fontFamily: 'Asap, san serif',
    fontWeight: '700',
    fontStyle: 'italic',
  },

  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },

  test: {
    color: theme.palette.primary.light,
  },
  bold: {
    fontWeight: 400,
    color: theme.palette.secondary.main,
  },
}))

const getTiers = (onClickEmbed, onClickProcess, onClickShare) => [
  {
    title: 'I want to embed Motivus on my website',
    description: [
      'Host the Motivus application on your website and get paid whenever users process through it.',
    ],
    position: 'side',
    buttonText: 'Coming soon',
    // buttonText: 'Host the Floating Tool',
    buttonVariant: 'outlined',
    onClick: onClickEmbed,
  },
  {
    title: 'I want to process data!',
    description: [
      'Program your own drivers to work with the Motivus cluster and start processing.',
      'Want to process data but not sure where to begin? Visit our Software Factory to create a tailored made solution for your business.',
    ],
    position: 'mid',
    buttonText: 'Contact us',
    buttonVariant: 'contained',
    onClick: onClickProcess,
  },
  {
    title: 'I want to share my computer power',
    description: [
      'Share your computer power with researchers all around the world and get paid.',
    ],
    position: 'side',
    buttonText: 'Start sharing',
    buttonVariant: 'outlined',
    onClick: onClickShare,
  },
]

export default function Intro() {
  const [, setOpenContact] = React.useContext(ContactToggle)
  const classes = useStyles()
  const tiers = getTiers(
    () =>
      setTimeout(() => {
        // navigate('/blog/hola-mundo')
      }, 200),
    () => setOpenContact(true),
    // eslint-disable-next-line no-undef
    () => window.Motivus.openFloatingTool(),
  )

  return (
    <Theme2>
      {/* Hero unit */}
      <Container component='main' className={classes.heroContent}>
        <Typography
          variant='h3'
          align='center'
          color='Primary'
          component='subtitle'
          display='block'
          gutterBottom
        >
          Join the revolution in distributed computing!
        </Typography>

        <Typography
          variant='body2'
          align='center'
          color='textPrimary'
          component='subtitle'
          display='block'
          gutterBottom
        >
          Motivus is a collaborative
          <span className={classes.bold}>
            {' '}
            High Performance Computing Network.
          </span>{' '}
          With our framework you can process big volumes of data, and also earn
          extra income by renting your computer power to process data.
          <br></br> Choose one of the following options to begin:
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth='lg' component='main'>
        <Grid container alignItems='center'>
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={4}
              md={4}
              className={classes.cardDistribution}
            >
              <Card
                boxShadow={3}
                className={
                  tier.position === 'mid' ? classes.cardmid : classes.cardside
                }
              >
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ variant: 'h4', align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />

                <CardContent>
                  <div className={classes.cardPricing}>
                    {/*<Typography component="h2" variant="h3" color="textPrimary">
                     ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /mo
                    </Typography>*/}
                  </div>

                  {tier.description.map((line) => (
                    <p
                      style={{
                        hyphens: 'auto',
                        textJustify: 'auto',
                        color: 'white',
                        fontSize: '1rem',
                        fontFamily: 'roboto, san-serof',
                        fontWeight: '300',
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    onClick={tier.onClick}
                    color='secondary'
                    size='large'
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Theme2>
  )
}
