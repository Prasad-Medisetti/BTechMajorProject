import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { LOGO_TEXT } from "../../constants";
import { titleCase } from "../../utils";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800]
  },
  footer_link: {
    color: "inherit",
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": { textDecoration: "underline" }
  }
}));

function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="body1" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        className={classes.footer_link}
        variant="text"
        color="inherit"
        to="/"
      >
        {titleCase(LOGO_TEXT)}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer(props) {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          // flexDirection: "column",
          justifyContent: "center",
          alignContent: "center"
        }}
      >
        {/* <Typography variant="body1">
					My sticky footer can be found here.
				</Typography> */}
        <Copyright />
      </Container>
    </footer>
  );
}
