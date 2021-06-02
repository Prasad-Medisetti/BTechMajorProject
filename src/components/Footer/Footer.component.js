import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { LOGO_TEXT } from "../../constants";
import { titleCase } from "../../utils";

function Copyright() {
	return (
		<Typography variant="body1" color="textSecondary" align='center'>
			{"Copyright © "}
			<Link color="inherit" href="/">
				{titleCase(LOGO_TEXT)}
			</Link>{' '}
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
