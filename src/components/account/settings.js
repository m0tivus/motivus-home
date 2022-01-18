import React from 'react'

import Title from '../client/Title'
import ApplicationTokens from '../client/ApplicationTokens'
import withClientLayout from '../../hoc/withClientLayout'

const Settings = () => {
  return (
    <React.Fragment>
      <Title text='Settings' />
      <ApplicationTokens />
    </React.Fragment>
  )
}

export default withClientLayout(Settings)
