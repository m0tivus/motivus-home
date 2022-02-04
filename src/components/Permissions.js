import React, { useState } from 'react'
import { Formik, Form, FieldArray, Field, getIn } from 'formik'
import TextField from '@material-ui/core/TextField'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Select, MenuItem, Button, Box } from '@material-ui/core'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { AlgorithmUser } from '../models'
import { filter } from 'lodash'

const debug = false

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    gap: '30px',
    //border: '1px solid red',
    width: '100%',
    marginBottom: '20px',
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

const validationSchema = Yup.object().shape({
  name: Yup.string().required('User name is required'),
  role: Yup.mixed()
    .oneOf(['OWNER', 'MAINTAINER', 'user'])
    .required('you must choose an option'),
})

function Permission({
  data,
  algorithmId,
  creating = false,
  setShowNew = () => null,
  refreshData = () => null,
}) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const { enqueueSnackbar } = useSnackbar()
  const create = async (values) => {
    enqueueSnackbar('creating permission')
    try {
      await AlgorithmUser.create(algorithmId, values)
      refreshData()
      setShowNew(false)
    } catch (e) {
      enqueueSnackbar('Permission could not be created', { type: 'error' })
    }
  }
  const remove = async () => {
    enqueueSnackbar('deleting permission')
    await AlgorithmUser.remove(algorithmId, data.id)
    refreshData()
  }

  return (
    <Formik
      initialValues={{ ...data, username_or_email: data.user?.email }}
      validationSchema={validationSchema}
      onSubmit={() => null}
      render={({ values, errors, touched, handleChange, handleBlur }) => {
        return (
          <Form>
            <Box
              className={classes.container}
              key={values.id}
              flexDirection={matches ? 'row' : 'column'}
            >
              <TextField
                color='secondary'
                className={classes.field}
                margin='normal'
                label={creating ? 'Username or email' : 'User email'}
                id='username_or_email'
                InputProps={{
                  classes: { root: classes.label },
                  'aria-label': creating ? 'Username or email' : 'User email',
                }}
                inputProps={{
                  'aria-label': creating ? 'Username or email' : 'User email',
                }}
                value={values.username_or_email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                helperText={touched.name && errors.name ? errors.name : ''}
                error={Boolean(touched.name && errors.name)}
              />
              <TextField
                color='secondary'
                className={classes.field}
                margin='normal'
                label='Role'
                name='role'
                onChange={handleChange}
                InputLabelProps={{
                  classes: { root: classes.label },
                }}
                value={values.role}
                onBlur={handleBlur}
                required
                select
                SelectProps={{
                  MenuProps: { classes: { paper: classes.poper } },
                  SelectDisplayProps: {
                    'aria-label': 'role',
                  },
                }}
                helperText={touched.role && errors.role ? errors.role : ''}
                error={Boolean(touched.role && errors.role)}
              >
                <MenuItem value='OWNER'>Owner</MenuItem>
                <MenuItem value='MAINTAINER'>Maintainer</MenuItem>
              </TextField>
              {creating ? (
                <Button
                  className={classes.button}
                  margin='normal'
                  type='button'
                  color='secondary'
                  variant='outlined'
                  aria-label='submit'
                  onClick={() => create(values)}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  aria-label='delete'
                  className={classes.button}
                  margin='normal'
                  type='button'
                  color='secondary'
                  variant='outlined'
                  onClick={remove}
                >
                  Delete
                </Button>
              )}
            </Box>
          </Form>
        )
      }}
    />
  )
}

export default function Permissions({
  users,
  algorithmId,
  refreshData,
  userList = false,
}) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const [showNew, setShowNew] = useState(false)
  //console.log(users)

  const _users = userList
    ? filter(users, { role: 'USER' })
    : filter(users, ({ role }) => role === 'OWNER' || role === 'MAINTAINER')

  console.log(_users, userList && 'users')

  return (
    <React.Fragment>
      {_users.map((u) => (
        <Permission
          userList
          data={u}
          key={`permission-${u.id}`}
          algorithmId={algorithmId}
          refreshData={refreshData}
        />
      ))}
      {showNew ? (
        <section aria-label='new-permission'>
          <Permission
            userList
            data={{}}
            algorithmId={algorithmId}
            creating
            refreshData={refreshData}
            setShowNew={setShowNew}
          />
        </section>
      ) : (
        <Button
          variant='outlined'
          color='secondary'
          onClick={() => setShowNew(true)}
        >
          +
        </Button>
      )}
    </React.Fragment>
  )
}
