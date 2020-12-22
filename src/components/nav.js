import { Link } from 'gatsby'
import React from 'react'
import { Box, Fade } from '@material-ui/core'
import navStyles from '../styles/nav.module.css'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import ContactUsDrawer from './ContactUsDrawer'

const routes = [
  { name: 'HOME', route: '/', partialy: false },
  { name: 'SOFTWARE FACTORY', route: '/softwarefactory', partialy: false },
  { name: 'ABOUT', route: '/about', partialy: false },
  { name: 'BLOG', route: '/blog', partialy: true },
  /*{ name: 'CONTACT US', route: '/contact', partialy: false },*/
]

const Nav = () => {
  const [checkedHorizontal, setcheckedHorizontal] = React.useState(true)
  const [openContact, setOpenContact] = React.useState(false)

  useScrollPosition(
    ({ currPos }) => {
      const navRight = currPos.y < -10
      if (navRight) {
        setcheckedHorizontal(false)
      } else {
        setcheckedHorizontal(true)
      }
    },
    [checkedHorizontal],
  )

  const toggleDrawer = () => {
    setOpenContact(false)
  }

  const openDrawer = () => {
    setOpenContact(true)
  }

  return (
    <div>
      <Box width='100%' display='flex' height='150px' />
      <Fade in={!checkedHorizontal} timeout={500}>
        <nav className={navStyles.navver}>
          <ul className={navStyles.navListver}>
            {routes.map(({ name, route, partialy }) => (
              <li>
                <Link
                  className={navStyles.navItemver}
                  activeClassName={navStyles.activeNavItemver}
                  partiallyActive={partialy}
                  to={route}
                >
                  {name}
                </Link>
              </li>
            ))}
            <li>
              <div onClick={openDrawer} className={navStyles.navItemver}>
                CONTACT US
              </div>
            </li>
          </ul>
        </nav>
      </Fade>
      <Fade in={checkedHorizontal} timeout={500}>
        <nav className={navStyles.navhor}>
          <ul className={navStyles.navListhor}>
            {routes.map(({ name, route, partialy }) => (
              <li>
                <Link
                  className={navStyles.navItemhor}
                  activeClassName={navStyles.activeNavItemhor}
                  partiallyActive={partialy}
                  to={route}
                >
                  {name}
                </Link>
              </li>
            ))}
            <li>
              <div onClick={openDrawer} className={navStyles.navItemhor}>
                CONTACT US
              </div>
            </li>
          </ul>
        </nav>
      </Fade>
      <ContactUsDrawer
        open={openContact}
        onClose={toggleDrawer}
      ></ContactUsDrawer>
    </div>
  )
}
export default Nav
