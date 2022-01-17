import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { useFormik } from 'formik'
import TextField from '@material-ui/core/TextField'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { MenuItem, Box } from '@material-ui/core'
import * as yup from 'yup'

const default_charge_schema = [
  { name: 'Per execution', value: 'per-execution' },
  { name: 'Per Time', value: 'per-time' },
]

const debug = false

const useStyles = makeStyles((theme) => ({
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

/*const validationSchema = Yup.object().shape({
  algorithm_users: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('User name is required'),
      default_charge_schema: Yup.mixed()
        .oneOf(['per_execution', 'per_minute'])
        .required('you must choose an option'),
      credits: Yup.number().positive('Credits must be positive'),
    }),
  ),
})*/

const validationSchema = yup.object({
  userName: yup.string('Enter your name').required('Enter your name'),
  default_charge_schema: yup
    .mixed()
    .oneOf(['per_execution', 'per_minute'])
    .required('you must choose an option'),
})

export default function PricingSchema({
  schema,
  setSchema,
  credits,
  setCredits,
}) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const formik = useFormik({
    initialValues: {
      userName: '',
      default_charge_schema: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <React.Fragment>
      <Typography
        //className={classes.inputStatement}
        variant='h5'
        color='textPrimary'
        gutterBottom
      >
        Pricing schema
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box
          className={classes.container}
          flexDirection={matches ? 'row' : 'column'}
        >
          <TextField
            color='secondary'
            className={classes.field}
            margin='normal'
            label='User Name'
            name='userName'
            InputLabelProps={{ classes: { root: classes.label } }}
            value={formik.values.userName}
            onChange={formik.handleChange}
            required
            helperText={formik.touched.userName && formik.errors.userName}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
          />
          <TextField
            color='secondary'
            className={classes.field}
            margin='normal'
            label='Charge schema'
            name='default_charge_schema'
            onChange={formik.handleChange}
            InputLabelProps={{ classes: { root: classes.label } }}
            value={formik.values.default_charge_schema}
            required
            select
            SelectProps={{
              MenuProps: { classes: { paper: classes.poper } },
            }}
            /*helperText={
            touchedDefault_charge_schema && errorDefault_charge_schema
              ? errorDefault_charge_schema
              : ''
          }
          error={Boolean(
            touchedDefault_charge_schema && errorDefault_charge_schema,
          )}*/
          >
            <MenuItem value={'per_execution'}>Per execution</MenuItem>
            <MenuItem value={'per_minute'}>Per Time</MenuItem>
          </TextField>
        </Box>
      </form>
      {debug && (
        <>
          <pre style={{ textAlign: 'left' }}>
            <strong>Values</strong>
            <br />
            {JSON.stringify(formik.values, null, 2)}
          </pre>
          <pre style={{ textAlign: 'left' }}>
            <strong>Errors</strong>
            <br />
            {JSON.stringify(formik.errors, null, 2)}
          </pre>
        </>
      )}
    </React.Fragment>
  )
}

/*<Box>
<Box display='flex' width='100%' justifyContent='space-betwenn'>
          <AlgorithmsInputSelec
            input={schema}
            setInput={setSchema}
            values={schemaType}
            text='Schema options:'
          />

          <Box ml='40px' />
          <AlgorithmInput
            inputTitle='credits *'
            input={credits}
            setInput={setCredits}
            numeric={true}
          />
        </Box>
      </Box>*/

/*<TextField
      color='secondary'
      className={classes.field}
      margin='normal'
      label='Charge schema'
      name={default_charge_schema}
      onChange={handleChange}
      InputLabelProps={{ classes: { root: classes.label } }}
      value={user.default_charge_schema}
      onBlur={handleBlur}
      required
      select
      SelectProps={{
        MenuProps: { classes: { paper: classes.poper } },
      }}
      helperText={
        touchedDefault_charge_schema && errorDefault_charge_schema
          ? errorDefault_charge_schema
          : ''
      }
      error={Boolean(
        touchedDefault_charge_schema && errorDefault_charge_schema,
      )}
    >
      <MenuItem value={'per_execution'}>Per execution</MenuItem>
      <MenuItem value={'per_minute'}>Per Time</MenuItem>
    </TextField>*/
