import React from "react";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Box } from "@material-ui/core";
import Theme2 from '../StyleTheme';


const styles = Theme => ({
  grow: {
    flexGrow: 1,
    
  },
  menuButton: {
    left: '20px',
  },
  
  root: {
    postion: 'fixed',
  }
 
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
            <Box position="fixed" display="flex"  width="100vw" border="1px solid green" bottom={0} >
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="secondary"
                aria-label="open drawer"
                onClick={this.props.openDrawerHandler}
              >
                <MenuIcon />
              </IconButton>
            </Box>
        </Theme2>
       
      </div>
    );
  }
}

export default withStyles(styles)(ToolbarComponent);
