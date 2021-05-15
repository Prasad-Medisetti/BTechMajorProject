import React, { useEffect, useState } from "react";
import { Button, IconButton, Typography } from "@material-ui/core";
import { useLocation } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import { purple } from "@material-ui/core/colors";

import HomeAppBar from "../../components/HomeAppBar/HomeAppBar";
import Footer from "../../components/Footer/Footer.component";

const useStyles = makeStyles((theme) => ({
	root: {},
	menuButton: {},
	appBar: {
		// marginLeft: theme.spacing(1),
		// background: "#000000",
		// color: "#78909c",
	},
	drawerTitle: {
		flexGrow: 1,
		letterSpacing: 0,
		textDecoration: "none",
		color: "#000000DE",
		textTransform: "uppercase",
		transition: ".4s",
		"&:hover": {
			color: purple[900],
			filter: "drop-shadow(0px 0px 1px inherit)",
		},
	},
	title: {
		flexGrow: 1,
		letterSpacing: 0,
		color: "#000000DE",
		// color: "#00e676",
		textTransform: "uppercase",
		cursor: "pointer",
		transition: ".4s",
		"&:hover": {
			// color: "#ffffff",
			filter: "drop-shadow(0px 0px 1px inherit)",
			textDecoration: "none",
		},
		fontSize: theme.typography.fontSize * 1.5,
	},
	main: {
		minHeight: "79vh",
		maxWidth: "100vw",
		// background: "#000000",
		// color: "#78909c",
		margin: theme.spacing(2),
		display: "flex",
		flexWrap: "wrap",
		// flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	footer: {
		margin: theme.spacing(0),
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		minHeight: "4vh",
		padding: theme.spacing(2, 0, 2, 0),
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[200]
				: theme.palette.grey[800],
		// backgroundColor: "#000000",
		// color: "#78909c",
	},
	circularProgress: {
		padding: theme.spacing(1.25),
		opacity: 0.8,
		backgroundColor: "#eeeeee",
		borderRadius: "50%",
	},
	listItem: {
		display: "flex",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	icon: {
		fill: theme.palette.primary,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	listItemText: { fontSize: theme.typography.fontSize * 1.15 },
	active: {
		textDecoration: "none",
		// color: "#ffffff",
		opacity: 0.9,
		backgroundColor: "rgba(0, 0, 0, 0.08)",
	},
	avatar: {
		marginLeft: theme.spacing(1),
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	toolbar: { display: "flex" },
}));

function SlideTransition(props) {
	return <Slide {...props} direction="up" />;
}

export default function NotFound(props) {
	const classes = useStyles();
	const location = useLocation();

	const [mobileOpen, setMobileOpen] = useState(false);
	const [path, setPath] = useState("");
	const [open, setOpen] = useState(null);

	const menuItems = [
		{
			text: "HOME",
			icon: <span className="material-icons-outlined">home</span>,
			path: "/",
		},
		{
			text: "SIGN IN",
			icon: <span className="material-icons-outlined">login</span>,
			path: "/signin",
		},
		{
			text: "SIGN UP",
			icon: <span className="material-icons-outlined">person_add_alt</span>,
			path: "/signup",
		},
		{
			text: "DASHBOARD",
			icon: <span className="material-icons-outlined">dashboard</span>,
			path: "/dashboard",
		},
	];

	const handleDrawerToggle = (open) => {
		setMobileOpen(open);
	};

	useEffect(() => {
		setPath(location.pathname);
		setOpen(true);
		console.log(location.pathname);
	}, [location.pathname]);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<HomeAppBar
				classes={classes}
				menuItems={menuItems}
				mobileOpen={mobileOpen}
				setMobileOpen={setMobileOpen}
				handleDrawerToggle={handleDrawerToggle}
			/>

			<main className={classes.main}>
				<Typography variant="h6" color="error">
					<code>{path}</code> is Not Found
				</Typography>
				<Snackbar
					open={open}
					className={classes.root}
					TransitionComponent={SlideTransition}
					autoHideDuration={10000}
					onClose={handleClose}
				>
					<Alert
						variant="standard"
						color="error"
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={handleClose}
							>
								<CloseIcon color="inherit" fontSize="inherit" />
							</IconButton>
						}
						icon={
							<span className="material-icons-outlined">error_outline</span>
						}
						onClose={handleClose}
						severity="error"
					>
						<code>{path}</code> is Not Found
					</Alert>
				</Snackbar>
			</main>

			<Footer classes={classes} />
		</>
	);
}
