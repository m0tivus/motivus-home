import React from 'react'
import { Link, graphql } from 'gatsby'
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
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}))

const BlogPage = ({ data, ...props }) => {
  const classes = useStyles()

  return (
    <Layout {...props}>
      <SEO title='Blog' description='Blog Data' />
      <Grid container spacing={2}>
        {data.allSanityPost.edges.map((document) => (
          <Grid item key={document.node.id} xs={12} sm={6}>
            <Card className={classes.card}>
              <CardActionArea>
                <Link to={`/blog/${document.node.slug.current}`}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={document.node.image.asset.fixed.src}
                  />
                </Link>
              </CardActionArea>
              <CardContent className={classes.cardContent}>
                <Link
                  className={styles.title}
                  to={`/blog/${document.node.slug.current}`}
                >
                  {document.node.title}
                </Link>
                <Divider />
                <Typography>{document.node.abstract}</Typography>
              </CardContent>
              <CardActions>
                {document.node.author.name},{' '}
                {formatISO(parseJSON(document.node.publishedAt), {
                  representation: 'date',
                })}
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
          id
          slug {
            current
          }
          image {
            asset {
              fixed(width: 960) {
                ...GatsbySanityImageFixed
              }
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
