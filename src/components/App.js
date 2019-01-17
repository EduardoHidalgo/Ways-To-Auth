import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
    width: '100vw',
    flexGrow: 1,
  },
  appFrame: {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  button: {
    marginLeft: -12,
    marginRight: 20,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  fabMoveUp: {
    transform: 'translate3d(0, -46px, 0)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  fabMoveDown: {
    transform: 'translate3d(0, 0, 0)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
  },
  snackbar: {
    position: 'absolute',
    width: '100vw !important',
  },
  snackbarContent: {
    width: '100vw',
  },
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const fabClassName = classNames(classes.fab, open ? classes.fabMoveUp : classes.fabMoveDown);

  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Button color="inherit" className={classes.button} onClick={handleClick}>Login</Button>
          </Toolbar>
        </AppBar>
        <Fab color="secondary" className={fabClassName}>
          <AddIcon />
        </Fab>
        <Snackbar
          open={open}
          onClose={handleClose}
          ContentProps={{
            'aria-describedby': 'snackbar-fab-message-id',
            className: classes.snackbarContent,
          }}
          message={<span id="snackbar-fab-message-id">Archived</span>}
          action={
            <Button color="inherit" size="small" onClick={handleClose}>
              Undo
            </Button>
          }
          className={classes.snackbar}
        />
      </div>
    </div>
  );
}

export default App;
