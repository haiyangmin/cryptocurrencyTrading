import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function DeleteButton() {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      startIcon={<DeleteIcon />}
      onClick={onClick}
    >
      Delete
    </Button>
  );
}