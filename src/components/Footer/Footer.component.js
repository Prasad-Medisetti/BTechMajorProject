import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary">
			{"Copyright © "}
			<Link color="inherit" href="/">
				Online Notice Board
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	footer: {
		padding: theme.spacing(3, 2),
		marginTop: "auto",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[200]
				: theme.palette.grey[800],
	},
}));

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
					alignContent: "center",
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
