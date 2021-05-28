import { makeStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React, { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "fixed",
		bottom: theme.spacing(4),
		right: theme.spacing(4),
		background: "#37474f",
		color: "#fafafa",
		"&:hover": {
			background: "#37474fcc",
		},
	},
}));

const ScrollToTop = () => {
	const classes = useStyles();

	const { y: pageYOffset } = useWindowScroll();
	const [visibility, setVisibilty] = useState(false);

	useEffect(() => {
		setVisibilty(pageYOffset > 30);
	}, [pageYOffset]);

	const backToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<Zoom in={visibility}>
			<Fab
				color="inherit"
				size="small"
				aria-label="scroll back to top"
				onClick={backToTop}
				role="presentation"
				className={classes.root}
			>
				<KeyboardArrowUpIcon />
			</Fab>
		</Zoom>
	);
};

export default ScrollToTop;
