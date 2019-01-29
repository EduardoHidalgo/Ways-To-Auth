import '../../bootstrap';
import React from "react";
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  divider: {
    width: "100%",
    textAlign: "center",
    borderBottom: "1px solid #7b7b7b",
    lineHeight: "0.1em",
    paddingTop: theme.spacing.unit * 4
  },
  text: {
    background: "#fff",
    color: "#7b7b7b",
    padding: "0 10px",
    fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
  }
}));

function DividerComponent(props) {
  const classes = useStyles();

  return (
    <div className={classes.divider}>
        <span className={classes.text}>
            {props.text}
        </span>
    </div>
  )
}

export default DividerComponent;