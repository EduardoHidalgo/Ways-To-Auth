import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Modal, Paper, Avatar, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

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
    button: {
        marginTop: theme.spacing.unit * 3,
        width: '100%'
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
                <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleLogin()}>
                    INICIAR SESIÓN CON GOOGLE
                </Button>
            </Paper>
        </Modal>
    );
}

export default DialogComponent;
