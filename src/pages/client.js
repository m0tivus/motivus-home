import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../layouts/ClientLayout'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import parseJSON from 'date-fns/parseJSON'
import formatISO from 'date-fns/formatISO'
import { Box, CssBaseline } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Title from '../components/client/Title'
import Card from '../components/client/Card'
import LangSelectorBlog from '../components/LangSelectorBlog'
import _ from 'lodash'

const useStyles = makeStyles((theme) => ({
  gridContainer: {},
}))

const ClientPage = ({ data, ...props }) => {
  const classes = useStyles()
  const languages = _.uniq(_.map(data.allSanityPost.edges, 'node.i18n_lang'))
  const [lang, setLang] = React.useState('en_US')

  return (
    <Layout {...props}>
      <Title text='News' />
      <Box pb='80px'>
        <Typography variant='subtitle1'>
          Don't miss out on the latest Motivus news
        </Typography>
        <LangSelectorBlog languages={languages} lang={lang} setLang={setLang} />
      </Box>
      <Grid container spacing={2} className={classes.gridContainer}>
        {data.allSanityPost.edges
          .filter((doc) => doc.node.i18n_lang === lang)
          .map((document) => (
            <Grid item key={document.node.id} xs={12} sm={4}>
              <Card
                title={document.node.title}
                image={document.node.image.asset.gatsbyImageData}
                abstract={document.node.abstract}
                author={document.node.author.name}
                date={formatISO(parseJSON(document.node.publishedAt), {
                  representation: 'date',
                })}
              />
            </Grid>
          ))}
      </Grid>
    </Layout>
  )
}
export default ClientPage

export const clientPageQuery = graphql`
  query clientBlog {
    allSanityPost(sort: { fields: [publishedAt], order: DESC }, limit: 6) {
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
