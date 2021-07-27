import React from 'react'
import { Link } from 'gatsby'
import { Box, Dialog, Slide } from '@material-ui/core'
import navStyles from '../../../styles/mobileNav.module.css'

const routes = [
  { name: 'News', route: '/client', partialy: false },
  { name: 'Dashboard', route: '/client/dashboard', partialy: false },
  { name: 'Marketplace', route: '/client/marketplace', partialy: false },
  { name: 'Virtual Wallet', route: '/client/wallet', partialy: false },
  { name: 'Documentation', route: '/client/documentation', partialy: false },
  { name: 'Settings', route: '/client/settings', partialy: false },
  /*{ name: 'CONTACT US', route: '/contact', partialy: false },*/
]

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='right' ref={ref} {...props} />
})

const DrawerComponent = (props) => {
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.toggleDrawerHandler}
      TransitionComponent={Transition}
    >
      <div
        role='presentation'
        onClick={props.toggleDrawerHandler}
        onKeyDown={props.toggleDrawerHandler}
      >
        <Box className={navStyles.background} />
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
      </div>
    </Dialog>
  )
}

export default DrawerComponent
