import React from 'react'
import SEO from './seo'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import MyAlgorithmCards from './MyAlgorithmCards'
//import AlgorithmFilter from './client/AlgorithmFilter'
import { Box, Grid } from '@material-ui/core'
import { graphql, StaticQuery } from 'gatsby'
import { motion } from 'framer-motion'
import { container, listItem } from './DropDownAnimation'

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    width: '100%',
  },
}))

export default function MarketplaceData({ variant }) {
  const classes = useStyles()

  return (
    <StaticQuery
      query={graphql`
        query Algorithms {
          allAlgorithm {
            nodes {
              author
              github
              abstract
              description
              name
              publishDate
              stars
              version
              web
              cost
              image
            }
          }
        }
      `}
      render={(data) => {
        const allAlgorithm = data.allAlgorithm?.nodes
        return (
          <React.Fragment>
            <Box
              display='flex'
              flexDirection='column'
              alignItems={variant === 'home' ? 'center' : 'flex-start'}
            >
              {/*<AlgorithmFilter variant={variant} data={allAlgorithm} /> */}

              <Grid
                container
                className={classes.gridContainer}
                component={motion.div}
                variants={container}
                initial='hidden'
                animate='show'
              >
                {allAlgorithm.map((a, k) => (
                  <Grid
                    item
                    key={k}
                    xs={12}
                    component={motion.div}
                    variants={listItem}
                  >
                    <MyAlgorithmCards variant={variant} {...a} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </React.Fragment>
        )
      }}
    />
  )
}
