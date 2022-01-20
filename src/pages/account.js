import React from 'react'
import { Redirect, Router } from '@reach/router'
import DarkTheme from '../layouts/DarkTheme'

import Login from '../components/account/login'
import Dashboard from '../components/account/dashboard'
import Documentation from '../components/account/documentation'
import Marketplace from '../components/account/marketplace'
import MyAlgorithms from '../components/account/my-algorithms'
import NewAlgorithm from '../components/account/new-algorithm'
import News from '../components/account/news'
import Settings from '../components/account/settings'
import Wallet from '../components/account/wallet'
import User from '../contexts/User'
import PrivateRoute from '../components/account/PrivateRoute'
import { navigate } from 'gatsby'

function App() {
  const [user, setUser] = React.useState({})

  return (
    <DarkTheme>
      <User.Provider value={{ user, setUser }}>
        <Router>
          <PrivateRoute component={Login} path='/account/login' />
          <PrivateRoute component={Dashboard} path='/account/dashboard' />
          <PrivateRoute
            component={Documentation}
            path='/account/documentation'
          />
          <PrivateRoute component={Marketplace} path='/account/marketplace' />
          <PrivateRoute
            component={MyAlgorithms}
            path='/account/my-algorithms'
          />
          <PrivateRoute
            component={NewAlgorithm}
            path='/account/my-algorithms/new'
          />
          <PrivateRoute component={News} path='/account/news' />
          <PrivateRoute component={Settings} path='/account/settings' />
          <PrivateRoute component={Wallet} path='/account/wallet' />
          <PrivateRoute
            component={() => {
              navigate('/account/login')
              return null
            }}
            path='/account'
            exact
          />
        </Router>
      </User.Provider>
    </DarkTheme>
  )
}

export default App
