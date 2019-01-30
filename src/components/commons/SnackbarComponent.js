import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Snackbar, SnackbarContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
    error: {
        backgroundColor: "#f44336"
    },
    success: { 
        backgroundColor: "#4caf50"
    },
    default: {
        backgroundColor: "#9e9e9e"
    }
}));

function SnackbarComponent(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [snackType, setSnackType] = useState(props.type);

    function handleClick() { setOpen(true) }

    function handleClose(event, reason) {
        if (reason === 'clickaway') { 
            return 
        }
        setOpen(false);
    }

    // segun el prop "type", puede recibir el color del snackbar
    useEffect(() => {
        switch (props.type) {
            case "error":
                setSnackType("error");
                break;
            case "success":
                setSnackType("success");
                break;
            case null:
                setSnackType("default");
                break;
            default:
                setSnackType("default");
                break;
        }
    }, []);

    useEffect(() => {
        if(props.open) setOpen(props.open);
    }, []);

    return (
        <Snackbar
            anchorOrigin={ {vertical: 'bottom', horizontal: 'left'} }
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <SnackbarContent
                className={classes[snackType]}
                aria-describedby="client-snackbar"
                onClose={handleClose}
                message={<span id="message-id">{props.text}</span>}
                action={[
                    <IconButton key="close" aria-label="Close" color="inherit"
                    className={classes.close} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        </Snackbar>
    )
}

export default SnackbarComponent;