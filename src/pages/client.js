import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../layouts/ClientLayout'
import SEO from '../components/seo'
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
import Styles from '../styles/blog.module.css'
import { Box, CssBaseline } from '@material-ui/core'
import Nav from '../components/client/Nav'
import Title from '../components/client/Title'
import Card from '../components/client/Card'
import { parse } from 'date-fns'

const useStyles = makeStyles((theme) => ({}))

const ClientPage = ({ data, ...props }) => {
  const classes = useStyles()

  return (
    <Layout {...props}>
      <Title text='News' />
      <Typography variant='subtitle1'>
        Don't miss out on the latest Motivus news
      </Typography>
      {data.allSanityPost.edges
        .sort(function (x, y) {
          return (
            new Date(y.node.publishedAt).getTime() -
            new Date(x.node.publishedAt).getTime()
          )
        })
        .map((document) => (
          <Card
            title={document.node.title}
            image={document.node.image.asset.gatsbyImageData}
            abstract={document.node.abstract}
            author={document.node.author.name}
            date={formatISO(parseJSON(document.node.publishedAt), {
              representation: 'date',
            })}
          />
        ))}
    </Layout>
  )
}
export default ClientPage

export const clientPageQuery = graphql`
  query clientBlog {
    allSanityPost {
      edges {
        node {
          id
          slug {
            current
          }
          image {
            asset {
              path
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
