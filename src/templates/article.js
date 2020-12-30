import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import PortableText from '../components/PortableText'
import SEO from '../components/seo'
import { Box, Divider, Grid, Typography } from '@material-ui/core'
import '../components/layout.css'
import { makeStyles } from '@material-ui/core/styles'
import parseJSON from 'date-fns/parseJSON'
import formatISO from 'date-fns/formatISO'
import Theme2 from '../components/StyleTheme'

const useStyles = makeStyles((theme) => ({
  header: {
    background: 'white',
    zIndex: -100,
  },
  author: {
    fontWeight: 600,
    fontSize: '1.2rem',
    color: '#cc5de7',
  },
}))

export default function AricleTemplate({ data, ...props }) {
  const classes = useStyles()

  return (
    <Theme2>
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
                <Typography variant='h2' color='primary' bottomgutter>
                  {data.sanityPost.title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box
                  display='flex'
                  flexDirection='row'
                  justifyContent='flex-start'
                  alignItems='center'
                >
                  <Typography variant='body2'>
                    <span className={classes.author}>
                      {data.sanityPost.author.name}
                    </span>
                    ,{' '}
                    {formatISO(parseJSON(data.sanityPost.publishedAt), {
                      representation: 'date',
                    })}
                  </Typography>
                </Box>
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
    </Theme2>
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
          fixed(width: 960) {
            ...GatsbySanityImageFixed
          }
        }
      }
      author {
        id
        name
      }
      publishedAt
    }
  }
`
