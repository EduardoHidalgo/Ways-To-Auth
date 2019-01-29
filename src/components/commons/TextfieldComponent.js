import '../../bootstrap';
import React from "react";
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: "4px",
        marginBottom: "0px",
        width: '100%'
    }
}));

function TextfieldComponent(props) {
  const classes = useStyles();

  return (
    <TextField
        disabled={!props.disabled ? false : props.disabled}
        id="standard-name"
        label={props.label}
        className={classes.textField}
        value={""}
        margin="normal"
    />
  )
}

export default TextfieldComponent;