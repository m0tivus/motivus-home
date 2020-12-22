import { Box, Typography } from '@material-ui/core'
import { Link } from 'gatsby'
import React from 'react'

export default function Ending() {
  return (
    <Box py={8} mx={4}>
      <Typography
        variant='body1'
        align='left'
        color='textSecondary'
        gutterBottom
      >
        Please contact us using the form below to request a meeting, and we’ll
        create the best tailored solution for your data science needs.
      </Typography>
      <Link to='/contact'>Request a meeting.</Link>
    </Box>
  )
}
