import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import PortableText from '../components/PortableText'
import SEO from '../components/seo'
import { Box, Grid, Typography } from '@material-ui/core'
import '../components/layout.css'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  header: {
    background: 'white',
    zIndex: -100,
  },
}))

export default function AricleTemplate({ data, ...props }) {
  const classes = useStyles()

  return (
    <Layout {...props}>
      <SEO
        title={data.sanityPost.title}
        description={data.sanityPost.abstract}
      />
      <Box display='flex' width='100%' justifyContent='center'>
        <Box
          pl={5}
          pb={2}
          pt={2}
          display='flex'
          width='90%'
          className={classes.header}
          boxShadow={2}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='h3' color='primary' bottomgutter>
                {data.sanityPost.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Link to={`/authors/User_${data.sanityPost.author.id}`}>
                {data.sanityPost.author.name}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box display='flex' width='100%' justifyContent='center' boxShadow={6}>
        <Img fixed={data.sanityPost.image.asset.fixed} />
      </Box>
      <Box display='flex' width='100%' justifyContent='center'>
        <Box
          p={5}
          display='flex'
          width='90%'
          justifyContent='center'
          boxShadow={2}
        >
          {data.sanityPost._rawContent && (
            <PortableText blocks={data.sanityPost._rawContent} />
          )}
        </Box>
      </Box>
    </Layout>
  )
}

export const query = graphql`
  query ArticleTemplate($id: String!) {
    sanityPost(id: { eq: $id }) {
      title
      _rawContent(resolveReferences: { maxDepth: 5 })
      abstract
      image {
        asset {
          fixed(width: 960, height: 400) {
            ...GatsbySanityImageFixed
          }
        }
      }
      author {
        id
        name
      }
    }
  }
`
