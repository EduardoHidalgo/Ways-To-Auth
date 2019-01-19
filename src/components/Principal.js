import '../bootstrap';
import React from "react";
import { makeStyles } from '@material-ui/styles';
import { Typography, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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

function Principal() {
  const classes = useStyles();

  return (
        <main className={classes.content}>
            <Paper className={classes.paper} elevation={1}>
                <Typography variant="h5" component="h3">
                    Menu principal
                </Typography>
                <Typography component="p">
                    Este es el menú principal
                </Typography>
            </Paper>
        </main>
  )
}

export default Principal;