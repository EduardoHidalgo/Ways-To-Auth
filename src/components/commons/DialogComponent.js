import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Modal, Paper, Avatar, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// solución de hover del botón!! importante -> https://stackoverflow.com/questions/40937061/material-ui-v0-x-raisedbutton-on-hover-styles

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        top: '50%',
        left: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: 'translate(-50%, -50%)'
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main
    },
    googleButton: {
        marginTop: theme.spacing.unit * 3,
        width: '100%',
        backgroundColor: '#d62d20',
        color: 'white',
        '&:hover': {
            backgroundColor: '#e26c62',
            color: 'white'
          }
    },
    facebookButton: {
        marginTop: theme.spacing.unit * 3,
        width: '100%',
        backgroundColor: '#3b5998',
        color: 'white',
        '&:hover': {
            backgroundColor: '#8b9dc3',
            color: 'white'
          }
    }
}));

function DialogComponent(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.open);

    // escucha por cambios en el valor
    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    // cierra el componente. se executa desde el componente padre
    // que renderea este componente.
    function handleClose() {
        props.handleDialog(false);
    }

    function handleLogin() {
        props.handleLogin(true);
    }

    return (
        <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={()=>handleClose()}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Iniciar Sesión
                </Typography>
                <Button variant="contained" className={classes.googleButton} onClick={()=>handleLogin()}>
                    INICIAR SESIÓN CON GOOGLE
                </Button>
                <Button variant="contained" className={classes.facebookButton} onClick={()=>handleLogin()}>
                    INICIAR SESIÓN CON FACEBOOK
                </Button>
            </Paper>
        </Modal>
    );
}

export default DialogComponent;
