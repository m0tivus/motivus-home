import { Typography } from '@material-ui/core'
import React from 'react'

export default function Intro() {
  return (
    <React.Fragment>
      <Typography variant='h3' color='secondary' align='center' gutterBottom>
        Software factory
      </Typography>
      <Typography variant='body1' align='center'>
        If you have data that you need to analyse or process, but don’t have the
        technical expertise to program your own application, then you can use
        our Software Factory services. Please contact us using the form below to
        request a meeting, and we’ll create the best tailored solution for your
        data science needs. Request a meeting.
      </Typography>
    </React.Fragment>
  )
}
