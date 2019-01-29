import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    }
}));

function SnackbarComponent(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if(props.open) setOpen(props.open);
    }, []);

    function handleClick() {
        setOpen(true);
    }

    function handleClose(event, reason) {
        if (reason === 'clickaway') { 
            return 
        }
        setOpen(false);
    }

    return (
        <Fragment>
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            open={open}
            onClose={handleClose}
            ContentProps={{ 'aria-describedby': 'message-id'}}
            message={<span id="message-id">{props.text}</span>}
            action={[
                <IconButton key="close" aria-label="Close" color="inherit"
                className={classes.close} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            ]}
        />
        </Fragment>
    )
}

export default SnackbarComponent;