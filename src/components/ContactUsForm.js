import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Theme2 from './StyleTheme'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import IconButton from '@material-ui/core/IconButton'
import { Grow } from '@material-ui/core'

const useStylesReddit = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    color: 'white',
  },

  customHoverFocus: {
    color: theme.palette.secondary.light,
  },

  underline: {
    color: theme.palette.common.white,
    borderBottom: theme.palette.common.white,
    '&:after': {
      borderBottom: `3px solid ${theme.palette.secondary.light}`,
    },
    '&:focused::after': {
      borderBottom: `3px solid ${theme.palette.secondary.light}`,
    },
    '&:before': {
      borderBottom: `0.5px solid ${theme.palette.common.white}`,
    },
    '&:hover:not($disabled):not($focused):not($error):before': {
      borderBottom: '0.5px solid rgb(255, 255, 255) !important',
    },
    '&$disabled:before': {
      borderBottom: `0.5px dotted ${theme.palette.common.white}`,
    },
  },
}))

const useStylesRedditLabel = makeStyles((theme) => ({
  cssLabel: {
    color: 'white',
    '&.Mui-focused': {
      color: theme.palette.secondary.light,
    },
  },

  cssFocused: {},
}))

function CustomeTextField(props) {
  const classes = useStylesReddit()
  const classeslabel = useStylesRedditLabel()

  return (
    <TextField
      InputProps={{ classes, disableUnderline: false }}
      InputLabelProps={{
        classes: {
          root: classeslabel.cssLabel,
          focused: classeslabel.cssFocused,
        },
      }}
      {...props}
    />
  )
}

function CustomButton(props) {
  const classes = useStylesReddit()

  return <IconButton className={classes.customHoverFocus} {...props} />
}

export default function AddressForm(props) {
  return (
    <Theme2>
      <Grid
        item
        xs={12}
        container
        direction='row'
        justify='flex-end'
        alignItems='flex-start'
      >
        <Grow in timeout={1000}>
          <CustomButton aria-label='close' onClick={props.onClose}>
            <CancelOutlinedIcon fontSize='large' />
          </CustomButton>
        </Grow>
      </Grid>

      <Grid container spacing={8}>
        <Grid item xs={12} sm={12}>
          <Grow in timeout={1000}>
            <CustomeTextField
              required
              id='Name'
              name='Name'
              label='Name'
              fullWidth
              autoComplete='given-name'
            />
          </Grow>
        </Grid>

        <Grid item xs={12}>
          <Grow in timeout={2000}>
            <CustomeTextField
              required
              id='email'
              name='email'
              label='Email address'
              fullWidth
              autoComplete='give-email'
            />
          </Grow>
        </Grid>

        <Grid item xs={12}>
          <Grow in timeout={2500}>
            <CustomeTextField
              id='Telephon'
              name='Telephon'
              label='Telephone'
              fullWidth
              autoComplete='give-telephon'
            />
          </Grow>
        </Grid>
        <Grid item xs={12}>
          <Grow in timeout={3000}>
            <CustomeTextField
              required
              id='country'
              name='country'
              label='Country'
              fullWidth
              autoComplete='give-country'
            />
          </Grow>
        </Grid>
        <Grid item xs={12}>
          <Grow in timeout={3500}>
            <CustomeTextField
              id='Your message'
              required
              name='Your message'
              label='Your message'
              multiline
              fullWidth
            />
          </Grow>
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction='row'
          justify='flex-end'
          alignItems='flex-start'
        >
          <Grow in timeout={3500}>
            <Button color='secondary' variant='outlined' size='large'>
              {' '}
              Send message{' '}
            </Button>
          </Grow>
        </Grid>
      </Grid>
    </Theme2>
  )
}
