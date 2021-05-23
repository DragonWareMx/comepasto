import React from 'react';
import '/css/QuienesSomos.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor:727272,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const QuienesSomos = () => {
    const classes = useStyles();
    return (
        <>
            <Grid width="xl" className={classes.root, "Atma"}>
                Hola amigos
            </Grid>
        </>
    )
}

export default QuienesSomos