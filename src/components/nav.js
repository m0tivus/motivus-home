import { Link } from "gatsby"
import React from "react"
import { List, ListItem, ListItemText, Toolbar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import {  Container } from "@material-ui/core"
import { Autorenew } from "@material-ui/icons"

const useStyles = makeStyles({
  navbarDisplayFlex: {
    width: 'auto',
    position: 'fixed',
    display: `flex`,
    justifyContent: `space-between`,
    border: '1px solid green',
    right: '0px',
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
    border: '1px solid red',
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
    border: '2px solid blue',
  }
});


const navLinks = [
  { title: `Home`, path: `` },
  { title: `Software Factory`, path: `/software-factory` },
  { title: `About`, path: `/about` },
  { title: `Blog`, path: `/blog` },
  { title: `Contact Us`, path: `/contact` },
]

const Nav = () => {
const classes = useStyles(); // Add this
return(
  <nav>
    <Container className={classes.navbarDisplayFlex}>
      <List
      component="nav"
      aria-labelledby="main navigation"
      className={classes.navDisplayFlex}
      >
        {navLinks.map(({ title, path }) => (
          <a href={path} key={title} className={classes.linkText}>
            <ListItem button>
              <ListItemText primary={title} />
            </ListItem>
          </a>
        ))}
      </List>
    </Container>
  </nav>
  )
}

export default Nav
