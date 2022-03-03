import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { useFormik } from 'formik'
import TextField from '@material-ui/core/TextField'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { MenuItem, Box } from '@material-ui/core'
import * as yup from 'yup'

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
      charge_schema: Yup.mixed()
        .oneOf(['per_execution', 'per_minute'])
        .required('you must choose an option'),
      credits: Yup.number().positive('Credits must be positive'),
    }),
  ),
})*/

export default function PricingSchema({ formik }) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

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

      <Box
        className={classes.container}
        flexDirection={matches ? 'row' : 'column'}
      >
        <TextField
          color='secondary'
          className={classes.field}
          margin='normal'
          label='Cost'
          name='cost'
          id='cost'
          type='number'
          InputLabelProps={{ classes: { root: classes.label } }}
          value={formik.values.cost}
          onChange={formik.handleChange}
          required
          helperText={formik.touched.cost && formik.errors.cost}
          error={formik.touched.cost && Boolean(formik.errors.cost)}
        />
        <TextField
          color='secondary'
          className={classes.field}
          margin='normal'
          label='Charge schema'
          id='charge_schema'
          onChange={formik.handleChange('charge_schema')}
          InputLabelProps={{ classes: { root: classes.label } }}
          value={formik.values.charge_schema}
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
          <MenuItem value={'PER_EXECUTION'}>Per execution</MenuItem>
          <MenuItem value={'PER_MINUTE'}>Per Minute</MenuItem>
        </TextField>
      </Box>

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
      name={charge_schema}
      onChange={handleChange}
      InputLabelProps={{ classes: { root: classes.label } }}
      value={user.charge_schema}
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
