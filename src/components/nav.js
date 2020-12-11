import { Link, navigate } from "gatsby"
import React from "react"
import { Box, List, ListItem, ListItemText, Toolbar } from "@material-ui/core"
import { Container } from "@material-ui/core"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, withStyles } from '@material-ui/core/styles';


import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { endsWith, startCase } from "lodash";

const AntTabs = withStyles({
  root: {

  },

  indicator: {
    backgroundColor: '#1890ff',
    left: '0px',
  },
})(Tabs);


const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    textAlign: 'end',
    fontWeight: theme.typography.fontWeightMedium,
    marginRight: theme.spacing(0),
    
    fontFamily: [
      'Roboto',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },


  wrapper:{
    alignItems: 'unset',
  },
  

}))((props) => <Tab disableRipple {...props} />);

const routes = [
  {name: "HOME", route: "/"},
  {name: "SOFTWARE FACTORY", route: "/softwarefactory"},
  {name: "ABOUT", route: "/about"},
  {name: "BLOG", route: "/blog"},
  {name: "CONTACT US", route: "/contact"},
]


export default function CustomizedTabs(props) {

  const [value, setValue] = React.useState(props.location.state.from);
  React.useEffect(() => {setTimeout(() => {
    setValue(props.location.state.to)
    console.log('animating')
  }, 100);} )
  console.log(props.location.state)

  const [orientation, setOrientation] = React.useState('horizontal')
  const [justifyContent, setJustifyContent] = React.useState('center')
  console.log()

  useScrollPosition(
    ({ currPos }) => {
      console.log(currPos.y)
      const navRight = currPos.y < -10
      if (navRight) {
        setOrientation('vertical')
        setJustifyContent('flex-end')
      } else {
        setOrientation('horizontal')
        setJustifyContent('center')
      }
    },
    [orientation, justifyContent]

  )


  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(routes[newValue].route, {state:{from:value, to: newValue}})
  };

  return (
    <div>
      <Box position="fixed" width="100%" display="flex" justifyContent={justifyContent}>
        <AntTabs orientation={orientation} value={value} onChange={handleChange} aria-label="ant example">
          {routes.map((route,index) => <AntTab label={route.name} key={index} />)}
        </AntTabs>
      </Box>
    </div>
  );
}

/*const Nav = () => {
const classes = useStyles(); // Add this
return(
  <nav>
    <Container maxWidth="xl" className={classes.navbarDisplayFlex}>
      <List
      component="nav"
      aria-labelledby="main navigation"
      className={classes.navDisplayFlex}
      >
        {navLinks.map(({ title, path }) => (
          <Link to={path} key={title} className={classes.linkText}>
            <ListItem button className={classes.element}>
              <ListItemText primary={title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Container>
  </nav>
  )
}
*/

