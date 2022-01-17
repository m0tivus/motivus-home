import React, { useState } from 'react'
import { Formik, Form, FieldArray, Field, getIn } from 'formik'
import TextField from '@material-ui/core/TextField'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Select, MenuItem, Button, Box } from '@material-ui/core'
import * as Yup from 'yup'

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

const initialValues = {
  algorithm_users: [
    {
      id: Math.random(),
      name: '',
      role: '',
    },
  ],
}

const validationSchema = Yup.object().shape({
  algorithm_users: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('User name is required'),
      role: Yup.mixed()
        .oneOf(['owner', 'manteiner', 'user'])
        .required('you must choose an option'),
    }),
  ),
})

export default function Permissions({ usersAndRole, setUsersAndRole }) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('onSubmit', JSON.stringify(values, null, 2))
        }}
        render={({ values, errors, touched, handleChange, handleBlur }) => {
          return (
            <Form>
              <FieldArray
                name='algorithm_users'
                render={({ remove, push }) => (
                  <div>
                    {values.algorithm_users.map((user, index) => {
                      const name = `algorithm_users.${index}.name`
                      const touchedName = getIn(touched, name)
                      const errorName = getIn(errors, name)

                      const role = `algorithm_users.${index}.role`
                      const touchedRole = getIn(touched, role)
                      const errorRole = getIn(errors, role)

                      return (
                        <Box
                          className={classes.container}
                          key={user.id}
                          flexDirection={matches ? 'row' : 'column'}
                        >
                          <TextField
                            color='secondary'
                            className={classes.field}
                            margin='normal'
                            label='User Name'
                            name={name}
                            InputLabelProps={{
                              classes: { root: classes.label },
                            }}
                            value={user.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            helperText={
                              touchedName && errorName ? errorName : ''
                            }
                            error={Boolean(touchedName && errorName)}
                          />
                          <TextField
                            color='secondary'
                            className={classes.field}
                            margin='normal'
                            label='Role'
                            name={role}
                            onChange={handleChange}
                            InputLabelProps={{
                              classes: { root: classes.label },
                            }}
                            value={user.role}
                            onBlur={handleBlur}
                            required
                            select
                            SelectProps={{
                              MenuProps: { classes: { paper: classes.poper } },
                            }}
                            helperText={
                              touchedRole && errorRole ? errorRole : ''
                            }
                            error={Boolean(touchedRole && errorRole)}
                          >
                            <MenuItem value={'owner'}>Owner</MenuItem>
                            <MenuItem value={'manteiner'}>Manteiner</MenuItem>
                            <MenuItem value={'user'}>User</MenuItem>
                          </TextField>
                          <Button
                            className={classes.button}
                            margin='normal'
                            type='button'
                            color='secondary'
                            variant='outlined'
                            onClick={() => remove(index)}
                          >
                            x
                          </Button>
                        </Box>
                      )
                    })}

                    {debug && (
                      <>
                        <pre style={{ textAlign: 'left' }}>
                          <strong>Values</strong>
                          <br />
                          {JSON.stringify(values, null, 2)}
                        </pre>
                        <pre style={{ textAlign: 'left' }}>
                          <strong>Errors</strong>
                          <br />
                          {JSON.stringify(errors, null, 2)}
                        </pre>
                      </>
                    )}
                    <Button
                      type='button'
                      variant='outlined'
                      color='secondary'
                      size='large'
                      onClick={() =>
                        push({
                          id: Math.random(),
                          name: '',
                          role: '',
                        })
                      }
                    >
                      add User
                    </Button>
                  </div>
                )}
              />
            </Form>
          )
        }}
      />
    </React.Fragment>
  )
}
