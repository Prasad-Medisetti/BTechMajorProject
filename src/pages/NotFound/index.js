import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import NotFoundImg from "../../assets/images/undraw_page_not_found_su7k.svg";
import Grid from '@material-ui/core/Grid';
import grey from "@material-ui/core/colors/grey";
import { useHistory } from "react-router";

export default function NotFound(props) {
  const history = useHistory();
  const { classes } = props;

  // useScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.1.1/gsap.min.js')

  return (
    <>
      <main className={classes.main}>
      <Grid container>
        <Grid item container justify="center">
          <img
          alt="NotFound"
          style={{width:'80%', margin:"auto auto 4rem"}}
          src={NotFoundImg}
        />
        </Grid>
        <Grid item container justify="center" 
          style={{margin:"auto 2em"}}>
          <Typography gutterBottom variant="h4" align="center" >
            Page not found :(
          </Typography>
          <Typography gutterBottom variant="body1" align="center">
            The page you are looking for does not exist. But you can click the button below to go back to the
            homepage.
          </Typography>
          <Button
              size="large"
              variant="outlined"
              style={{
                backgroundColor: "#37474f",
                color: grey[100],
                marginTop:"2em"
              }}
              onClick={() => {
                history.push("/");
              }}
            >
              Go home
            </Button>
        </Grid> 
      </Grid>
      </main>
    </>
  );
}
