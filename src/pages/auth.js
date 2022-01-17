import { navigate } from 'gatsby-link'
import * as React from 'react'
import withLocation from '../hoc/withLocation'
import { User } from '../models'

const isBrowser = typeof window !== 'undefined'

function Auth({ search }) {
  if (window.localStorage.getItem('token')) {
    //Obtener usuario
    //si existe redirigir a client/news si no existe borrar el token y mandarlo al login
    if (window.localStorage.getItem('token') === User.current(search.token)) {
      navigate('/client/news/')
    } else {
      window.localStorage.setItem('token', search.token)
    }
  } else {
    navigate('/client/')
    return null
  }

  if (isBrowser) {
    window.localStorage.setItem('token', search.token)
  }
}

export default withLocation(Auth)
