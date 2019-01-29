import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Modal, Paper} from '@material-ui/core';

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

    return (
        <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        disableAutoFocus={true}
        onClose={()=>handleClose()}>
           {props.children}
        </Modal>
    );
}

export default DialogComponent;
