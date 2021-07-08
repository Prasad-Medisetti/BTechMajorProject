import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

// import { useStyles } from "../../styles";

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
	},
}));

function Loading({ isLoading }) {
	const classes = useStyles();

	return (
		<Backdrop className={classes.backdrop} open={isLoading}>
			<CircularProgress color="inherit" disableShrink />
		</Backdrop>
	);
}

export default Loading;
