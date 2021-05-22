import React from "react";
import { useStyles } from "../../styles";

export default function CircularProgress() {
	const classes = useStyles();

	return (
		<main className={classes.main}>
			<CircularProgress className={classes.circularProgress} color="inherit" />
		</main>
	);
}
