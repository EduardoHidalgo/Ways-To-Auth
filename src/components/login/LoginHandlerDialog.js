import React, { useState, useEffect } from 'react';
import DialogComponent from '../commons/DialogComponent';
import Login from './Login'

function LoginHandlerDialog(props) {
    const firebase = useState(props.firebase);

    const handleDialog = (bool) => {
        props.handleDialog(bool);
    }
    
    const handleLogin = (bool) => {
        props.handleLogin(bool);
    }

    return (
        <DialogComponent open={props.open} handleDialog={handleDialog}>
            <Login handleLogin={handleLogin}/>
        </DialogComponent>
    );
}

export default LoginHandlerDialog;
