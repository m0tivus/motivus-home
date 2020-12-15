import { Link, navigate } from "gatsby"
import React from "react"
import { Box, List, ListItem, ListItemText, Toolbar, Fade } from "@material-ui/core"
import navStyles from '../styles/nav.module.css'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'



const routes = [
  { name: "HOME", route: "/", partialy: false },
  { name: "SOFTWARE FACTORY", route: "/softwarefactory", partialy: false },
  { name: "ABOUT", route: "/about", partialy: false },
  { name: "BLOG", route: "/blog", partialy: true },
  { name: "CONTACT US", route: "/contact", partialy: false },
]


const Nav = () => {
  const [checkedHorizontal, setcheckedHorizontal] = React.useState(true)
  console.log()

  useScrollPosition(
    ({ currPos }) => {
      console.log(currPos.y)
      const navRight = currPos.y < -10
      if (navRight) {
        setcheckedHorizontal(false)
      } else {
        setcheckedHorizontal(true)
      }
    },
    [checkedHorizontal]
  )


  return (
    <div>
      <Box width="100%" display="flex" height = "100px"/>
      <Fade in={!checkedHorizontal} timeout={1000}>
          <nav className={navStyles.navver}>
            <ul className={navStyles.navListver}>
              {routes.map(({ name, route, partialy }) => (
                <li>
                  <Link className={navStyles.navItemver} activeClassName={navStyles.activeNavItemver} partiallyActive={partialy} to={route}>{name}</Link>
                </li>
              ))}
            </ul>
          </nav>
      </Fade>
      <Fade in={checkedHorizontal} timeout={1000}>
        <nav className={navStyles.navhor}>
          <ul className={navStyles.navListhor}>
            {routes.map(({ name, route, partialy }) => (
              <li>
                <Link className={navStyles.navItemhor} activeClassName={navStyles.activeNavItemhor} partiallyActive={partialy} to={route}>{name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Fade>

    </div>
  )
}
export default Nav

