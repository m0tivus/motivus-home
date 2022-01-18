import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import Title from '../client/Title'
import { Box } from '@material-ui/core'
import PublicOrPrivate from '../PublicOrPrivate'
import PricingSchema from '../PricingSchema'
import Permissions from '../Permissions'
import UsersList from '../usersList'
import Button from '@material-ui/core/Button'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AlgorithmName from '../AlgorithmName'
import withClientLayout from '../../hoc/withClientLayout'

const useStyles = makeStyles((theme) => ({
  divider: {
    background: theme.palette.text.primary,
  },
  darkButton: {
    color: theme.palette.calypso?.main,
    borderColor: theme.palette.calypso?.main,
  },

  lightButton: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
}))

function NewAlgorithmForms() {
  const classes = useStyles()
  const theme = useTheme()
  const dark = theme.palette.type
  const matches = useMediaQuery(theme.breakpoints.up('lg'))

  const [isPublic, setIsPublic] = useState(false)
  const [usersAndRole, setUsersAndRole] = useState([
    { user: 'chuijse', role: 'owner' },
  ])

  useEffect(() => {
    console.log(isPublic)
  }, [isPublic])

  return (
    <React.Fragment>
      <Title text='Create a New Algorithm' />
      <Box mt='50px' width={matches ? '70%' : '90%'}>
        <AlgorithmName />
      </Box>
      <DividerNew />
      <PublicOrPrivate setIsPublic={setIsPublic} />
      <DividerNew />
      <Box width={matches ? '70%' : '90%'}>
        <PricingSchema />
      </Box>
      <DividerNew />
      <Box width={matches ? '70%' : '90%'}>
        <Typography variant='h5' color='textPrimary' gutterBottom>
          Permissions
        </Typography>
        <Permissions
          usersAndRole={usersAndRole}
          setUsersAndRole={setUsersAndRole}
        />
      </Box>
      <DividerNew />
      <Box width={matches ? '70%' : '90%'}>
        <Typography variant='h5' color='textPrimary' gutterBottom>
          User List
        </Typography>
        <UsersList />
      </Box>
      <DividerNew />
      <Button
        size='large'
        variant='outlined'
        onClick={() => navigate('/client/my-algorithms/new')}
        className={dark === 'dark' ? classes.darkButton : classes.lightButton}
      >
        Submit algorithm
      </Button>
      <Box mb='20px' />
    </React.Fragment>
  )
}

function DividerNew() {
  const classes = useStyles()
  return <Box my='30px' height='1px' width='100%' className={classes.divider} />
}

export default withClientLayout(NewAlgorithmForms)
