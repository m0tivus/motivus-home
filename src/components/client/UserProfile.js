import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Title from '../client/Title'
import { Box, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { pick } from 'lodash'
import { navigate } from 'gatsby-link'
import TextField from '@material-ui/core/TextField'
import SettingTitle from '../../components/client/SettingsTitle'
import { User } from '../../models'

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
  container: {
    display: 'flex',
    gap: '30px',
    //border: '1px solid red',
    width: '100%',
  },
  field: {
    margin: '0',
    background: theme.palette.background.inputBackground,
    borderRadius: '0',
    width: '100%',
  },
  label: {
    color: theme.palette.text.primary,
    marginBottom: '10px',
    paddingLeft: '10px',
  },
  button: {},
  formControl: {
    width: '300px',
    background: theme.palette.background.inputBackground,
  },
  poper: {
    background: theme.palette.background.inputBackground,
  },
}))

const validationSchema = yup.object({
  username: yup.string('Enter a new name').required('Enter a new name'),
})

export default function UserProfile({ update, algorithm, refreshData }) {
  const classes = useStyles()
  const theme = useTheme()
  const dark = theme.palette.type
  const matches = useMediaQuery(theme.breakpoints.up('lg'))

  const getUser = async () => {
    const user_ = await User.current()
    formik.setFieldValue('username', user_.username)
  }

  React.useEffect(() => {
    getUser()
  }, [])

  const formik = useFormik({
    //enableReinitialize: true,
    initialValues: {
      username: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await User.update(values)
        enqueueSnackbar('Updating User Profile', {
          variant: 'info',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          preventDuplicate: true,
        })
        getUser()
      } catch (e) {
        enqueueSnackbar('Could not update user profile', { type: 'error' })
      }
    },
  })
  const { enqueueSnackbar } = useSnackbar()

  return (
    <form onSubmit={formik.handleSubmit}>
      <SettingTitle text='User Profile' />
      <Typography variant='body1' color='textPrimary'>
        Edit you personal information
      </Typography>
      <Box mt='50px' width={matches ? '70%' : '90%'}></Box>
      <Input formik={formik} id='username' />
      <Box mt='20px'>
        <Button
          size='large'
          variant='outlined'
          type='submit'
          className={dark === 'dark' ? classes.darkButton : classes.lightButton}
        >
          Update profile
        </Button>
      </Box>
      <Box mb={matches ? '20px' : '70px'} />
    </form>
  )
}

function Input({ formik, id }) {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <TextField
      color='secondary'
      className={classes.field}
      margin='normal'
      label='nickname'
      type='text'
      id={id}
      InputLabelProps={{ classes: { root: classes.label } }}
      value={formik.values.username}
      onChange={formik.handleChange}
      required
      helperText={formik.touched.username && formik.errors.username}
      error={formik.touched.username && Boolean(formik.errors.username)}
    />
  )
}
