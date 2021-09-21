import React from 'react'

import { Link } from 'gatsby'
import {
  nav,
  navList,
  navItemver,
  activeNavItemver,
} from '../../styles/clientNav.module.css'

const routes = [
  { name: 'News', route: '/client', partialy: false },
  { name: 'Dashboard', route: '/client/dashboard', partialy: false },
  { name: 'Marketplace', route: '/client/marketplace', partialy: false },
  { name: 'Virtual Wallet', route: '/client/wallet', partialy: false },
  { name: 'Documentation', route: '/client/documentation', partialy: false },
  { name: 'Settings', route: '/client/settings', partialy: false },
  /*{ name: 'CONTACT US', route: '/contact', partialy: false },*/
]

export default function Nav() {
  return (
    <nav className={nav}>
      <ul className={navList}>
        {routes.map(({ name, route, partialy }) => (
          <li>
            <Link
              className={navItemver}
              activeClassName={activeNavItemver}
              partiallyActive={partialy}
              to={route}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
