import React from 'react'
import { Box, Typography } from '@material-ui/core'
import '../../components/layout.css'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  backgroundTexture: {
    backgroundColor: '#ffffff',
    opacity: 1,
    backgroundImage: theme.palette.background.langSelectorTexture,
    backgroundSize: '8px 8px',
  },
  fade: {
    background: theme.palette.background.langSelectorFade,
  },
  body: {
    backgroundColor: theme.palette.background.langSelector,
  },
  title: {
    color: theme.palette.text.white,
  },
  underLine: { borderColor: 'red' },

  label: {
    display: 'block',
  },
  input: {
    width: 200,
  },

  autocompleteTextfield: {
    backgroundColor: '#ffffff',
  },
  popper: {
    borderRadius: 0,
    backgroundColor: theme.palette.background.langSelector,
    color: '#ffffff',
  },
  popperList: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}))

export default function AlgorithmFilter({ data }) {
  const classes = useStyles()
  return (
    <Box
      id='root'
      display='flex'
      ml='-2%'
      alignItems='center'
      flexDirection='column'
    >
      <Box
        display='flex'
        width='100%'
        height='100px'
        mt='20px'
        className={classes.backgroundTexture}
      >
        <Box
          width='100%'
          height='100px'
          display='flex'
          justifyContent='flex-start'
          className={classes.fade}
        >
          <Box
            mt='25px'
            width='90%'
            height='100px'
            className={classes.body}
            display='flex'
            justifyContent='flex-start'
            alignItems='center'
          >
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='flex-start'
              ml='2%'
              pr='30px'
            >
              <Typography className={classes.title} variant='h4'>
                Motivus
              </Typography>
              <Typography variant='h5' color='secondary'>
                Marketplace
              </Typography>
            </Box>
            <Box display='flex' alignContent='flex-end'>
              <ComboBox data={data} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function ComboBox({ data }) {
  const classes = useStyles()
  return (
    <Autocomplete
      id='combo-box-demo'
      options={data}
      getOptionLabel={(option) => option.name}
      style={{ width: 400 }}
      classes={{ paper: classes.popper, option: classes.popperList }}
      renderInput={(params) => (
        <TextField
          className={classes.autocompleteTextfield}
          {...params}
          label='Algorithm serach'
          variant='filled'
        />
      )}
    />
  )
}
