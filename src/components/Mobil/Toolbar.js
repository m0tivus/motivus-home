import React from "react";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from '@material-ui/core/Toolbar';
import { Box, Typography } from "@material-ui/core";
import Theme2 from '../StyleTheme';
import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';

const styles = Theme => ({
  grow: {
    position: 'fixed',
    flexGrow: 1,
    
    width: '100%',
    bottom:'0%',
  },
  menuButton: {
    left: '0px',
  },
  
 
});

class ToolbarComponent extends React.Component {
  state = {
    achorEl: false,
    MobileMoreAnchorEl: false
  };

  

  render() {
    const { classes } = this.props;
   

    return (
      <div className={classes.grow}>
         <Theme2>
            <Box display="flex" width='100%' alignItems="flex-end" bottom="0%">
              <AppBar position="static">
                <Toolbar >
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="secondary"
                    aria-label="open drawer"
                    onClick={this.props.openDrawerHandler}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography>Motivus | Get Started!</Typography>
                </Toolbar>
              </AppBar>
            </Box>
        </Theme2>
       
      </div>
    );
  }
}

export default withStyles(styles)(ToolbarComponent);
