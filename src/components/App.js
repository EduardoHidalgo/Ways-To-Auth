import '../bootstrap';
import React, { useEffect, useState, Fragment } from "react";
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Paper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DialogComponent from "./commons/DialogComponent";
import Messages from './Messages';
import Principal from './Principal';

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
  content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2
  }
}));

function App(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);

  const handleDialog = (bool) => {
    setOpen(bool);
  }

  const handleLogin = (bool) => {
    setLogin(bool);

    if (bool) {
      setOpen(false);
    }
  }

  const handleLogout = () => {
    setLogin(false);
  }

  return (
    <div className={classes.root}>
      <DialogComponent open={open} handleDialog={handleDialog} handleLogin={handleLogin}/>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            App
          </Typography>
          {/* muestra el botó de login/logout según el estado de login */}
          { !login ? 
          <Button color="inherit" onClick={()=>handleDialog(true)}>Login</Button> :
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
          }
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        {/* muestra el contenido según el estado del login */}
        { login ? <Messages /> : <Principal />}
      </main>
  </div>
  )
}

export default App;