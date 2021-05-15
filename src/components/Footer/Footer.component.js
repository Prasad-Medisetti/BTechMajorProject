import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router";

export default function Footer(props) {
	const history = useHistory();
	return (
		<footer className={props.classes.footer}>
			<Typography variant="body2" color="inherit">
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
