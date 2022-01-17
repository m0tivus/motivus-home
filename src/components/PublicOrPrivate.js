import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  inputStatement: {
    fontFamily: 'Roboto Mono',
    fontSize: '1.2rem',
  },

  secondary: {
    color: theme.palette.secondary.main,
  },
}))

export default function PublicOrPrivate({ setIsPublic }) {
  const classes = useStyles()
  const [publicCheckbox, setPublicCheckbox] = useState(false)
  const [privateCheckbox, setPrivateCheckbox] = useState(true)

  const handleChangePublicCheckbox = () => {
    setPublicCheckbox(true)
    setPrivateCheckbox(false)
    setIsPublic(true)
  }

  const handleChangePrivateCheckbox = () => {
    setPrivateCheckbox(true)
    setPublicCheckbox(false)
    setIsPublic(false)
  }

  return (
    <React.Fragment>
      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box>
          <Checkbox
            checked={publicCheckbox}
            onClick={handleChangePublicCheckbox}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </Box>
        <Box marginLeft='5px'>
          <Typography
            variant='h6'
            color='textPrimary'
            className={classes.inputStatement}
          >
            PUBLIC
          </Typography>
          <Typography variant='body1' color='textPrimary'>
            <span className={classes.secondary}>Anyone</span> can use this
            algorithm
          </Typography>
        </Box>
      </Box>
      <Box display='flex' flexDirection='row' alignItems='center' mt='30px'>
        <Box>
          <Checkbox
            checked={privateCheckbox}
            onClick={handleChangePrivateCheckbox}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </Box>
        <Box marginLeft='5px'>
          <Typography
            variant='h6'
            color='textPrimary'
            className={classes.inputStatement}
          >
            PRIVATE
          </Typography>
          <Typography variant='body1' color='textPrimary'>
            <span className={classes.secondary}>You choose who</span> can use
            this algorithm
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  )
}
