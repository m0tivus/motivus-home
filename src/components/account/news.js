import React from 'react'
import { graphql } from 'gatsby'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import parseJSON from 'date-fns/parseJSON'
import formatISO from 'date-fns/formatISO'
import { Box } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Title from '../client/Title'
import Card from '../client/Card'
import LangSelectorBlog from '../LangSelectorBlog'
import _ from 'lodash'
import { motion } from 'framer-motion'
import { container, listItem } from '../DropDownAnimation'
import withClientLayout from '../../hoc/withClientLayout'

const useStyles = makeStyles((theme) => ({
  gridContainer: {},
}))

const News = ({ data, ...props }) => {
  const classes = useStyles()
  const languages = _.uniq(_.map(data.allSanityPost.edges, 'node.i18n_lang'))
  const [lang, setLang] = React.useState('en_US')

  return (
    <Box display='flex' flexDirection='column'>
      <Box>
        <Title text='News' />
          <Box pb='80px'>
          <Typography color='textPrimary' variant='subtitle1'>
            Don't miss out on the latest Motivus news
          </Typography>
            <LangSelectorBlog
            languages={languages}
            lang={lang}
            setLang={setLang}
            />
            </Box>
            <Grid
          container
            spacing={2}
            className={classes.gridContainer}
            component={motion.div}
            variants={container}
            key={`client-news-${lang}`}
            initial='hidden'
            animate='show'
            >
            {data.allSanityPost.edges
            .filter((doc) => doc.node.i18n_lang === lang)
                .map((document, i) => (
                  <Grid
                    item
                    key={document.node.id}
                    xs={12}
                    sm={4}
                    component={motion.div}
                    variants={listItem}
                  >
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
                    </Box>
                  </Box>
  )
}
export default withClientLayout(News)

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
