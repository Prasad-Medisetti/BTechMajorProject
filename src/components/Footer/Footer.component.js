import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router";

export default function Footer({ classes }) {
	const history = useHistory();
	return (
		<footer className={classes.footer}>
			<Typography variant="body2" color="textSecondary">
				{"© " + new Date().getFullYear() + " "}
				<Link
					color="inherit"
					onClick={() => {
						history.replace("/");
					}}
				>
					Online Notice Board
				</Link>
			</Typography>
		</footer>
	);
}
