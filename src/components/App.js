import React, { useEffect, useState, Fragment } from "react";
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DialogComponent from "./commons/DialogComponent";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}));

function App(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleLogin = (bool) => {
    setOpen(bool);
  }

  return (
    <div className={classes.root}>
    <DialogComponent open={open} handleLogin={handleLogin}/>
    <AppBar position="static">
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          News
        </Typography>
        <Button color="inherit" onClick={()=>handleLogin(true)}>Login</Button>
      </Toolbar>
    </AppBar>
  </div>
  )
}

export default App;