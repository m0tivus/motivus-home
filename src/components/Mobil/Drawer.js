import React from 'react'
import { Link } from 'gatsby'
import { Box, Dialog, Slide } from '@material-ui/core'
import {
  nav,
  background,
  navList,
  navItem,
  activeNavItem,
} from '../../styles/mobileNav.module.css'

import { homeRoutes } from '../Routes'

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
        <Box className={background} />
        <nav className={nav}>
          <ul className={navList}>
            {homeRoutes.map(({ name, route, partialy }) => (
              <li>
                <Link
                  className={navItem}
                  activeClassName={activeNavItem}
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
