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
    .oneOf(['OWNER', 'MAINTAINER', 'USER'])
    .required('you must choose an option'),
  charge_schema: Yup.mixed()
    .oneOf(['PER_EXECUTION', 'PER_MINUTE'])
    .required('you must choose an option'),
})

function Permission({
  data,
  algorithmId,
  creating = false,
  setShowNew = () => null,
  refreshData = () => null,
  userList = false,
}) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const { enqueueSnackbar } = useSnackbar()

  const create = async (values) => {
    enqueueSnackbar('creating permission')
    try {
      await AlgorithmUser.create(algorithmId, values)
      enqueueSnackbar('New user added successfully', { type: 'success' })
      refreshData()
      setShowNew(false)
    } catch (e) {
      enqueueSnackbar('Permission could not be created', { type: 'error' })
    }
  }
  const remove = async () => {
    try {
      enqueueSnackbar('Deleting Permission')
      await AlgorithmUser.remove(algorithmId, data.id)
      refreshData()
    } catch (e) {
      enqueueSnackbar('Could not delete permission', { type: 'error' })
    }
  }
  return (
    <Formik
      initialValues={{
        ...data,
        username_or_email: data.user?.email || '',
        charge_schema: userList ? data.charge_schema || '' : undefined,
        role: userList ? 'USER' : data.role,
      }}
      validationSchema={validationSchema}
      onSubmit={() => null}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => {
        return (
          <React.Fragment>
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
              {userList ? (
                <TextField
                  color='secondary'
                  className={classes.field}
                  margin='normal'
                  label='Charge schema'
                  name='charge_schema'
                  onChange={handleChange}
                  InputLabelProps={{
                    classes: { root: classes.label },
                  }}
                  value={values.charge_schema}
                  onBlur={handleBlur}
                  required
                  select
                  SelectProps={{
                    MenuProps: { classes: { paper: classes.poper } },
                    SelectDisplayProps: {
                      'aria-label': 'charge schema',
                    },
                  }}
                  helperText={
                    touched.charge_schema && errors.charge_schema
                      ? errors.charge_schema
                      : ''
                  }
                  error={Boolean(touched.charge_schema && errors.charge_schema)}
                >
                  <MenuItem value='PER_EXECUTION'>Per execution</MenuItem>
                  <MenuItem value='PER_MINUTE'>Per minute</MenuItem>
                </TextField>
              ) : (
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
              )}
              {userList && (
                <TextField
                  color='secondary'
                  className={classes.field}
                  margin='normal'
                  label='Cost'
                  name='cost'
                  InputProps={{
                    classes: { root: classes.label },
                    'aria-label': 'Cost',
                  }}
                  inputProps={{
                    'aria-label': 'Cost',
                  }}
                  value={values.cost}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  helperText={touched.cost && errors.cost ? errors.cost : ''}
                  error={Boolean(touched.cost && errors.cost)}
                />
              )}
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
          </React.Fragment>
        )
      }}
    </Formik>
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

  const _users = userList
    ? filter(users, { role: 'USER' })
    : filter(users, ({ role }) => role === 'OWNER' || role === 'MAINTAINER')

  return (
    <React.Fragment>
      {_users.map((u) => (
        <Permission
          userList={userList}
          data={u}
          key={`permission-${u.id}`}
          algorithmId={algorithmId}
          refreshData={refreshData}
        />
      ))}
      {showNew ? (
        <section aria-label={userList ? 'new-user' : 'new-permission'}>
          <Permission
            userList={userList}
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
