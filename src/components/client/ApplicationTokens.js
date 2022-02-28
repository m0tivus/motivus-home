import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Box, TextField, Typography } from '@material-ui/core'
import SettingTitle from './SettingsTitle'
import AccesTokenCard from './AccessTokenCard'
import Button from '@material-ui/core/Button'
import { classicNameResolver } from 'typescript'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { ApplicationToken } from '../../models'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles((theme) => ({
  createTokenDark: {
    color: theme.palette.calypso?.main,
    borderColor: theme.palette.calypso?.main,
  },

  createTokenLight: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
}))

const validationSchema = yup.object({
  description: yup
    .string('Enter a description')
    .required('Enter a description'),
})

export default function ApplicationTokens({}) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const { enqueueSnackbar } = useSnackbar()
  const dark = theme.palette.type
  const [tokens, setTokens] = React.useState([])

  const [open, setOpen] = React.useState(false)

  const getApplicationTokens = async () => {
    const tokens_ = await ApplicationToken.all()
    setTokens(tokens_)
  }
  React.useEffect(() => {
    getApplicationTokens()
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const formik = useFormik({
    initialValues: { description: '' },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await ApplicationToken.create(values)
      enqueueSnackbar('Application Token created successfully', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
      getApplicationTokens()
      handleClose()
    },
  })

  return (
    <React.Fragment>
      <SettingTitle text='Application tokens' />
      <Box
        mb='30px'
        display='flex'
        alignItems='flex-start'
        flexDirection={matches ? 'row' : 'column'}
        justifyContent='space-between'
      >
        <Typography variant='body1' gutterBottom>
          Create, delete and manage yours tokens
        </Typography>
        <Box display='flex' justifyContent='flex-end'>
          <Button
            variant='outlined'
            className={
              dark === 'dark'
                ? classes.createTokenDark
                : classes.createTokenLight
            }
            onClick={handleClickOpen}
          >
            Create Token
          </Button>
        </Box>
      </Box>
      {tokens.map((t) => (
        <AccesTokenCard
          key={`apptoken-${t.id}`}
          name={t.description}
          tokenId={t.value}
          publishDate={t.inserted_at}
        />
      ))}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-label='new-application-token'
      >
        <DialogTitle id='form-dialog-title'>Application Token</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Application tokens lets you provide access to algorithms and
            computing capabilities to your drivers using the Motivus Cluster.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='description'
            label='Description'
            fullWidth
            onChange={formik.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={formik.submitForm} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
