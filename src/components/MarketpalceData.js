import React from 'react'
import SEO from './seo'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import AlgorithmCards from './client/AlgorithmCards'
import AlgorithmFilter from './client/AlgorithmFilter'
import { Box, Grid } from '@material-ui/core'
import { graphql, StaticQuery } from 'gatsby'

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
              {console.log(data)}
              <AlgorithmFilter variant={variant} data={allAlgorithm} />

              <Grid container className={classes.gridContainer}>
                {allAlgorithm.map((a, k) => (
                  <Grid item key={k} xs={12}>
                    <AlgorithmCards
                      name={a.name}
                      author={a.author}
                      publishDate={a.publishDate}
                      abstract={a.abstract}
                      cost={a.cost}
                      stars={a.stars}
                    />
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
