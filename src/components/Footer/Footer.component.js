import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default function Footer({ classes }) {
	return (
		<footer className={classes.footer}>
			<Typography variant="body2" color="textSecondary">
				{"© " + new Date().getFullYear() + " "}
				<Link color="inherit" href="https://material-ui.com/">
					Online Notice Board
				</Link>
			</Typography>
		</footer>
	);
}
