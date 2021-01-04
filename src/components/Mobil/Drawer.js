import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import { Link } from 'gatsby'
import { Box, Dialog, Slide } from '@material-ui/core'
import navStyles from '../../styles/mobileNav.module.css'
import Grow from '@material-ui/core/Grow'

const routes = [
  { name: 'HOME', route: '/', partialy: false },
  { name: 'SOFTWARE FACTORY', route: '/softwarefactory', partialy: false },
  { name: 'ABOUT', route: '/about', partialy: false },
  { name: 'BLOG', route: '/blog', partialy: true },
  { name: 'CONTACT US', route: '/contact', partialy: false },
]

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='right' ref={ref} {...props} />
})

class DrawerComponent extends React.Component {
  state = {
    left: false,
    open: false,
  }

  render() {
    const { classes } = this.props

    return (
      <Dialog
        fullScreen
        open={this.props.open}
        onClose={this.props.toggleDrawerHandler}
        TransitionComponent={Transition}
      >
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
      </Dialog>
    )
  }
}

export default DrawerComponent
