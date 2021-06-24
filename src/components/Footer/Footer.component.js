import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";
import { LOGO_TEXT } from "../../constants";
import { titleCase } from "../../utils";

export default function Footer(props) {
	const { classes } = props;

	return (
		<footer className={classes.footer}>
			{/* <Typography variant="body1">
					My sticky footer can be found here.
				</Typography> */}
			<Typography variant="body1" color="textSecondary" align="center">
				{"Copyright © "}
				<Link className={classes.footer_link} to="/">
					{titleCase(LOGO_TEXT)}
				</Link>{" "}
				{new Date().getFullYear()}
				{"."}
			</Typography>
		</footer>
	);
}
