import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from '../../layouts/ClientLayout'
import SEO from '../../components/seo'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import CardActionArea from '@material-ui/core/CardActionArea'
import Divider from '@material-ui/core/Divider'

import parseJSON from 'date-fns/parseJSON'
import formatISO from 'date-fns/formatISO'

import { Box, CssBaseline } from '@material-ui/core'
import Nav from '../../components/client/Nav'
import Title from '../../components/client/Title'

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
    height: '300px',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },

  author: {
    fontWeight: 500,
    fontFamily: 'Roboto',
    fontSize: '0.9rem',
    color: '#cc5de7',
  },
}))

const ClientPage = ({ data, ...props }) => {
  const classes = useStyles()

  return (
    <Layout {...props}>
      <Title text='Virtual Wallet' />
      <Typography variant='subtitle1'>
        You Motivus virtual wallet! send, recive and buy Motivus
      </Typography>
    </Layout>
  )
}

export default ClientPage
