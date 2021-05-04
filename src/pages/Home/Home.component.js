import React, { useEffect, useState } from "react";
import {
	Button,
	IconButton,
	makeStyles,
	Toolbar,
	Typography,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import {
	Link as RouterLink,
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
	useLocation,
} from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import { purple } from "@material-ui/core/colors";

import Footer from "../../components/Footer/Footer.component";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	appBar: {
		display: "flex",
	},
	title: {
		minwidth: "max-width",
		flexGrow: 1,
		fontSize: 18,
		letterSpacing: 0,
		textDecoration: "none",
		color: "#000000DE",
		transition: ".4s",
		"&:hover": {
			color: purple[900],
			filter: "drop-shadow(0px 0px 1px inherit)",
		},
	},
	main: {
		background: "#f9f9f9",
		minHeight: "79vh",
		padding: theme.spacing(2, 0),
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
	},
	// necessary for content to be below app bar
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	drawerPaper: {
		width: drawerWidth,
	},
	active: {
		background: "#f4f4f4",
	},
	avatar: {
		marginLeft: theme.spacing(1),
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	toolbar: { display: "flex" },
}));

export default function Home() {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const [isLoaded, setIsLoaded] = useState(true);
	const [users, setUsers] = useState({});

	const fetchData = async () => {
		const response = await fetch(`https://api.github.com/users`);
		const data = await response.json();
		if (!response.ok) {
			const message = `An error has occured: ${response.status}`;
			throw new Error(message);
		} else {
			setUsers([...data]);
			return data;
		}
	};

	useEffect(() => {
		setIsLoaded(false);
		fetchData();
		setIsLoaded(true);
		return;
	}, [users]);

	return (
		<div className={classes.root}>
			{/* app bar */}
			<AppBar position="static">
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<MenuIcon />
					</IconButton>
					<Button variant="text" className={classes.title}>
						Online Notice Board
					</Button>
					<Button color="inherit">SIGN IN</Button>
					<Button color="inherit">SIGN UP</Button>
				</Toolbar>
			</AppBar>

			{/* main content */}
			<main className={classes.main}>
				{isLoaded && (
					<div className="lds-spinner">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				)}
				{!isLoaded && Array.isArray(users) && (
					<div>
						{users.map((user) => (
							<p key={user.id}>{user.login}</p>
						))}
					</div>
				)}
			</main>

			<Footer classes={classes} />
		</div>
	);
}
