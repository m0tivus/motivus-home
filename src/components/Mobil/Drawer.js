import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import { Link } from 'gatsby'
import { Box } from '@material-ui/core'
import navStyles from '../../styles/mobileNav.module.css'
import Grow from '@material-ui/core/Grow'

const routes = [
  { name: 'HOME', route: '/', partialy: false },
  { name: 'SOFTWARE FACTORY', route: '/softwarefactory', partialy: false },
  { name: 'ABOUT', route: '/about', partialy: false },
  { name: 'BLOG', route: '/blog', partialy: true },
  { name: 'CONTACT US', route: '/contact', partialy: false },
]

class DrawerComponent extends React.Component {
  state = {
    left: false,
  }

  render() {
    const { classes } = this.props

    const sideList = (side) => (
      <Box width='100vw' height='100%'>
        <div
          role='presentation'
          onClick={this.props.toggleDrawerHandler}
          onKeyDown={this.props.toggleDrawerHandler}
        >
          <nav className={navStyles.nav}>
            <ul className={navStyles.navList}>
              {routes.map(({ name, route, partialy }) => (
                <li>
                  <Link
                    className={navStyles.navItem}
                    activeClassName={navStyles.activeNavItem}
                    partiallyActive={partialy}
                    to={route}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Box className={navStyles.background} />
        </div>
      </Box>
    )

    return (
      <Drawer open={this.props.left} onClose={this.props.toggleDrawerHandler}>
        {sideList('left')}
      </Drawer>
    )
  }
}

export default DrawerComponent
