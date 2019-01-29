import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper, Typography, Avatar, Button} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import DividerComponent from '../commons/DividerComponent';
import TextfieldComponent from '../commons/TextfieldComponent';

// solución de hover del botón!! importante -> https://stackoverflow.com/questions/40937061/material-ui-v0-x-raisedbutton-on-hover-styles

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        [theme.breakpoints.up('sm')]: {
            width: '400px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '60vw',
        },
        [theme.breakpoints.down('xs')]: {
            width: '80vw',
        },
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 2,
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
        backgroundColor: "#3f51b5"
    },
    title: {
        fontSize: '24px'
    },
    description: {
        fontSize: '14px',
        textAlign: 'center'
    },
    loginButton: {
        textTransform: 'none',
        marginTop: theme.spacing.unit * 2,
        width: '100%'
    },
    googleButton: {
        textTransform: 'none',
        marginTop: theme.spacing.unit * 4,
        width: '100%',
        backgroundColor: '#d62d20',
        color: 'white',
        '&:hover': {
            backgroundColor: '#e26c62',
            color: 'white'
          }
    },
    facebookButton: {
        textTransform: 'none',
        marginTop: theme.spacing.unit * 2,
        width: '100%',
        backgroundColor: '#3b5998',
        color: 'white',
        '&:hover': {
            backgroundColor: '#8b9dc3',
            color: 'white'
          }
    },
    registrer: {
        marginTop: theme.spacing.unit * 2,
        fontSize: '14px',
        color: 'blue',
        cursor: 'pointer'
    },
    forgot: {
        marginTop: theme.spacing.unit * 2,
        fontSize: '14px',
        cursor: 'pointer'
    },
    forgotLink: {
        fontSize: '14px',
        color: 'blue',
        cursor: 'pointer'
    }
}));

function Login(props) {
    const classes = useStyles();
    const [sign, setSign] = useState(false);
    const [forgotPass, setForgotPass] = useState(false);

    function signHandle(bool) { setSign(bool) }

    const signin = (
        <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="body1" className={classes.title}>
                Iniciar sesión
            </Typography>
            <TextfieldComponent label={"Usuario:"} disabled={true}/>
            <TextfieldComponent label={"Contraseña:"} disabled={true}/>
            <Button variant="contained" color="inherit" className={classes.loginButton} disabled={true}>
                Iniciar sesión
            </Button>
            <Typography variant="body1" className={classes.forgot}>
                ¿Olvidaste tu contraseña? <span className={classes.forgotLink} onClick={()=>setForgotPass(true)}> haz click aquí</span>
            </Typography>

            <DividerComponent text="O"/>
            
            <Button variant="contained" className={classes.googleButton} onClick={()=>props.handleLogin(true)}>
                Iniciar sesión con Google
            </Button>
            <Button variant="contained" className={classes.facebookButton} onClick={()=>props.handleLogin(true)}>
                Iniciar sesión con Facebook
            </Button>

            <DividerComponent text="¿No tienes una cuenta?"/>

            <Typography variant="body1" className={classes.registrer}  onClick={()=>signHandle(true)}>
                Regístrate aquí
            </Typography>
        </Paper>
    );

    const signup = (
        <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="body1" className={classes.title}>
                Crear cuenta
            </Typography>
            <TextfieldComponent label={"Usuario:"}/>
            <TextfieldComponent label={"Contraseña:"}/>
            <Button variant="contained" color="inherit" className={classes.loginButton}>
                Crear cuenta
            </Button>
            <DividerComponent text="¿Ya tienes una cuenta?"/>
            <Typography variant="body1" className={classes.registrer} onClick={()=>signHandle(false)}>
                Inicia sesión aquí
            </Typography>
        </Paper>
    );

    const forgot = (
        <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="body1" className={classes.title}>
                ¿Olvidaste tu contraseña?
            </Typography>
            <Typography variant="body1" className={classes.description}>
                Escribe el correo electrónico de la cuenta en la que olvidaste tu contraseña.
            </Typography>
            <TextfieldComponent label={"Correo:"}/>
            <Button variant="contained" color="inherit" className={classes.loginButton}>
                Enviar correo de recuperación
            </Button>
            <DividerComponent text="¿Ya tienes una cuenta?"/>
            <Typography variant="body1" className={classes.registrer} onClick={()=>setForgotPass(false)}>
                Inicia sesión aquí
            </Typography>
        </Paper>
    );

    return (
        <React.Fragment>
            {!sign ? !forgotPass ? signin : forgot : signup}
        </React.Fragment>
    );
}

export default Login;
