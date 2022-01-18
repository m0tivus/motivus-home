import { navigate } from 'gatsby-link'
import withLocation from '../hoc/withLocation'

const isBrowser = typeof window !== 'undefined'

function Auth({ search }) {
  if (isBrowser) {
    window.localStorage.setItem('token', search.token)
    navigate('/account/login')
  }
  return null
}

export default withLocation(Auth)
