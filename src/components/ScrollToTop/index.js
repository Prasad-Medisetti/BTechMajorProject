import { makeStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import KeyboardArrowUpRoundedIcon from "@material-ui/icons/KeyboardArrowUpRounded";
import React, { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";

const useStyles = makeStyles((theme) => ({
	// "@global": {
	// 	"@keyframes scrollTop": {
	// 		from: {
	// 			transform: "translateY(2px)",
	// 		},
	// 		to: {
	// 			transform: "translateY(-2px)",
	// 		},
	// 	},
	// },
	scroll_to_top: {
		position: "fixed",
		bottom: theme.spacing(4),
		right: theme.spacing(4),
		backgroundColor: "transparent",
		borderRadius: "50%",
	},
	scroll_to_top__icon: {
		// backgroundColor: "#37474f",
		backgroundColor: "#424242",
		color: "#fafafa",
		padding: "1.5em",
		"&:hover": {
			// backgroundColor: "#455A64",
			backgroundColor: "#535353",
		},
		animation: `$myAnim 0.4s alternate ${theme.transitions.easing.easeInOut} infinite`,
	},
	"@keyframes myAnim": {
		from: {
			transform: "translateY(3px)",
		},
		to: {
			transform: "translateY(-2px)",
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
			<div className={classes.scroll_to_top}>
				<Fab
					className={classes.scroll_to_top__icon}
					color="inherit"
					size="small"
					aria-label="scroll back to top"
					onClick={backToTop}
					role="presentation"
				>
					<KeyboardArrowUpRoundedIcon />
				</Fab>
			</div>
		</Zoom>
	);
};

export default ScrollToTop;
