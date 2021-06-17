import { makeStyles } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  root: {},
  menuButton: {},
  drawerTitle: {
    flexGrow: 1,
    letterSpacing: 0,
    textDecoration: "none",
    color: "#000000DE",
    textTransform: "uppercase",
    transition: ".4s",
    "&:hover": {
      color: purple[900],
      filter: "drop-shadow(0px 0px 1px inherit)"
    }
  },
  title: {
    flexGrow: 1,
    letterSpacing: 0,
    color: "#000000DE",
    // color: "#00e676",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: ".4s",
    "&:hover": {
      color: purple[900],
      filter: "drop-shadow(0px 0px 1px inherit)",
      textDecoration: "none"
    },
    fontSize: theme.typography.fontSize * 1.5
  },
  appBar: {
    // padding: theme.spacing(0),
    minHeight: "4vh"
    // marginLeft: theme.spacing(1),
    // background: "#000000",
    // color: "#78909c",
  },
  main: {
    minHeight: "80vh",
    maxWidth: "100vw",
    // background: "#000000",
    // color: "#78909c",
    margin: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  footer: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "4vh",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800]
    // backgroundColor: "#000000",
    // color: "#78909c",
  },
  circularProgress: {
    padding: theme.spacing(1.25),
    opacity: 0.8,
    backgroundColor: "#eeeeee",
    borderRadius: "50%"
  },
  listItem: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  icon: {
    fill: theme.palette.primary,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  listItemText: { fontSize: theme.typography.fontSize * 1.15 },
  active: {
    textDecoration: "none",
    // color: "#ffffff",
    opacity: 0.9,
    backgroundColor: "rgba(0, 0, 0, 0.08)"
  },
  avatar: {
    marginLeft: theme.spacing(1),
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  toolbar: { display: "flex" }
}));
