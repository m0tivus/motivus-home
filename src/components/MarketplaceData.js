import React from 'react'
import SEO from './seo'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import AlgorithmCards from './client/AlgorithmCards'
import AlgorithmFilter from './client/AlgorithmFilter'
import { Box, Grid } from '@material-ui/core'
import { graphql, StaticQuery } from 'gatsby'
import { container, listItem } from './DropDownAnimation'
import { motion } from 'framer-motion'

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: '50px',
    width: '89.75%',
  },
}))

export default function MarketplaceData({ variant }) {
  const classes = useStyles()

  return (
    <StaticQuery
      query={graphql`
        query MyAlgorithms {
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
              <AlgorithmFilter variant={variant} data={allAlgorithm} />

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
                    <AlgorithmCards variant={variant} {...a} />
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
