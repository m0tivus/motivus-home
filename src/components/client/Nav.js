import React from 'react'

import { Link } from 'gatsby'
import {
  nav,
  navList,
  navItemver,
  activeNavItemver,
} from '../../styles/clientNav.module.css'

const routes = [
  { name: 'News', route: '/account/news/', partialy: false },
  { name: 'My Algorithms', route: '/account/my-algorithms/', partialy: true },
  { name: 'Dashboard', route: '/account/dashboard/', partialy: false },
  { name: 'Marketplace', route: '/account/marketplace/', partialy: true },
  { name: 'Virtual Wallet', route: '/account/wallet/', partialy: false },
  { name: 'Documentation', route: '/account/documentation/', partialy: false },
  { name: 'Settings', route: '/account/settings/', partialy: false },

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
