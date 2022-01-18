import React, { useContext } from 'react'
import { navigate } from 'gatsby'
import UserContext from '../../contexts/User'
import { User } from '../../models'
import axios from 'axios'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { user, setUser } = useContext(UserContext)
  const [isLoading, setIsLoading] = React.useState(!user.id)

  const getUserFromToken = async (token) => {
    let user_ = null
    try {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
      }
      user_ = await User.current(token)
    } catch (e) {
      delete axios.defaults.headers.common['Authorization']
      window.localStorage.removeItem('token')
    } finally {
      setIsLoading(false)
    }

    if (user_) {
      setUser(user_)
    }
    return user_
  }

  React.useEffect(() => {
    if (!user.id) {
      const token = window.localStorage.getItem('token')
      if (token) {
        if (!getUserFromToken(token)) {
          navigate('/account/login')
        } else if (location.pathname === '/account/login') {
          navigate('/account/my-algorithms')
        }
      } else if (location.pathname !== '/account/login') {
        navigate('/account/login')
      } else if (location.pathname === '/account/login') {
        setIsLoading(false)
      }
    } else if (location.pathname === '/account/login') {
      navigate('/account/my-algorithms')
    }
  }, [user.id, location.pathname])

  return isLoading ? <LoadingComponent /> : <Component {...rest} />
}

function LoadingComponent() {
  return <div>Loading...</div>
}

export default PrivateRoute
