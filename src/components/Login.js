import React, { useEffect, useState, Fragment } from "react";
import Link from 'next/link';
import '../bootstrap';
import { makeStyles } from '@material-ui/styles';
import { Paper, Avatar, Typography, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles(theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto'
        }
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit
    },
    submit: {
        marginTop: theme.spacing.unit * 3
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        width: '100%'
    }
}));

function Login(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <main className={classes.main}>
        <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Iniciar Sesión
            </Typography>
            <Button variant="contained" color="primary" className={classes.button}>
                INICIAR SESIÓN CON GOOGLE
            </Button>
        </Paper>
      </main>
    </Fragment>
  )
}

Login.getInitialProps() = async ({ query }) => {

};

export default Login;