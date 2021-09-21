import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import CardActionArea from '@material-ui/core/CardActionArea'
import Divider from '@material-ui/core/Divider'
import styles from '../styles/blog.module.css'
import parseJSON from 'date-fns/parseJSON'
import formatISO from 'date-fns/formatISO'
import { title } from '../styles/blog.module.css'
import { Box } from '@material-ui/core'
import _ from 'lodash'
import LangSelectorBlog from '../components/LangSelectorBlog'

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

const BlogPage = ({ data, ...props }) => {
  const classes = useStyles()
  const languages = _.uniq(_.map(data.allSanityPost.edges, 'node.i18n_lang'))
  const [lang, setLang] = React.useState('en_US')
  return (
    <Layout {...props}>
      <SEO title='Blog' description='Blog Data' />
      <Box pb='90px'>
        <LangSelectorBlog languages={languages} lang={lang} setLang={setLang} />
      </Box>
      <Grid container spacing={2}>
        {data.allSanityPost.edges
          .sort(function (x, y) {
            return (
              new Date(y.node.publishedAt).getTime() -
              new Date(x.node.publishedAt).getTime()
            )
          })
          .filter((doc) => doc.node.i18n_lang === lang)
          .map((document) => (
            <Grid item key={document.node.id} xs={12} sm={6}>
              <Card className={classes.card}>
                <CardActionArea>
                  <Link to={`/blog/${document.node.slug.current}`}>
                    <CardMedia
                      component={() => (
                        <GatsbyImage
                          image={document.node.image.asset.gatsbyImageData}
                        ></GatsbyImage>
                      )}
                    />
                  </Link>
                </CardActionArea>
                <CardContent className={classes.cardContent}>
                  <Box p={1}>
                    <Link
                      className={title}
                      to={`/blog/${document.node.slug.current}`}
                    >
                      {document.node.title}
                    </Link>
                  </Box>
                  <Divider />
                  <Box p={1}>
                    <Typography align='justify' variant='body2'>
                      {document.node.abstract}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Box p={1}>
                    <Typography variant='caption' gutterBottom>
                      <span className={classes.author}>
                        {document.node.author.name}
                      </span>
                      ,{' '}
                      {formatISO(parseJSON(document.node.publishedAt), {
                        representation: 'date',
                      })}
                    </Typography>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Layout>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query IndexQuery {
    allSanityPost {
      edges {
        node {
          i18n_lang
          id
          slug {
            current
          }
          image {
            asset {
              gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
            }
          }
          title
          abstract
          author {
            id
            name
          }
          publishedAt
        }
      }
    }
  }
`
