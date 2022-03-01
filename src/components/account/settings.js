import React from 'react'

import Title from '../client/Title'
import ApplicationTokens from '../client/ApplicationTokens'
import withClientLayout from '../../hoc/withClientLayout'
import PersonalAccessTokens from '../client/PersonalAccessTokens'

const Settings = () => {
  return (
    <React.Fragment>
      <Title text='Settings' />
      <PersonalAccessTokens />
      <ApplicationTokens />
    </React.Fragment>
  )
}

export default withClientLayout(Settings)
