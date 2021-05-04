import React, { useEffect, useState } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {
	Button,
	Divider,
	IconButton,
	Link,
	makeStyles,
	Toolbar,
	Typography,
} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import { useHistory, useLocation } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import { purple } from "@material-ui/core/colors";

import Footer from "../../components/Footer/Footer.component";
import MenuIcon from "@material-ui/icons/Menu";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import TemporaryDrawer from "../../components/TemporaryDrawer/TemporaryDrawer";

const useStyles = makeStyles((theme) => ({
	root: {},
	menuButton: {},
	appBar: {
		marginLeft: theme.spacing(1),
	},
	drawerTitle: {
		flexGrow: 1,
		letterSpacing: 0,
		textDecoration: "none",
		color: "#000000DE",
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
		cursor: "pointer",
		transition: ".4s",
		"&:hover": {
			color: purple[900],
			filter: "drop-shadow(0px 0px 1px inherit)",
			textDecoration: "none",
		},
		fontSize: theme.typography.fontSize * 1.5,
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
	const [mobileOpen, setMobileOpen] = useState(false);

	const [isLoaded, setIsLoaded] = useState(true);
	const [users, setUsers] = useState({});
	const menuItems = [
		{
			text: "SIGN IN",
			icon: <BiLogInCircle className={classes.icon} />,
			path: "#",
		},
		{
			text: "SIGN OUT",
			icon: <BiLogOutCircle />,
			path: "#",
		},
	];

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

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
			<AppBar position="sticky" className={classes.appbar}>
				<Toolbar className={classes.toolbar}>
					<Link className={classes.title} style={{ fontSize: 24 }} href="/">
						Online Notice Board
					</Link>
					<Hidden smDown implementation="css">
						<ButtonGroup
							orientation="horizontal"
							variant="text"
							color="inherit"
							size="large"
							aria-label="vertical contained primary button group"
						>
							{menuItems.map((item, index) => (
								<Button
									key={index}
									variant="text"
									color="inherit"
									fullWidth
									endIcon={item.icon}
								>
									{item.text}
								</Button>
							))}
						</ButtonGroup>
					</Hidden>
					<Hidden mdUp implementation="css">
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							onClick={handleDrawerToggle}
							aria-label="menu"
						>
							<MenuIcon />
						</IconButton>
					</Hidden>
				</Toolbar>
			</AppBar>

			<TemporaryDrawer
				anchor="right"
				style={{ width: "80vw" }}
				open={mobileOpen}
				onClose={handleDrawerToggle}
			>
				<List>
					<ListItem key="title" button>
						<Typography
							className={classes.drawerTitle}
							variant="h6"
							component="h4"
							children="Online Notice Board"
							onClick={() => {
								history.replace("/");
							}}
						/>
					</ListItem>
					<Divider style={{ margin: "1em" }} />
					<ListItem
						style={{
							minHeight: "80vh",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<ButtonGroup
							orientation="vertical"
							variant="text"
							fullWidth
							aria-label="vertical contained primary button group"
						>
							{menuItems.map((item, index) => (
								<Button
									key={index}
									variant="text"
									color="inherit"
									fullWidth
									startIcon={item.icon}
								>
									{item.text}
								</Button>
							))}
						</ButtonGroup>
					</ListItem>
				</List>
			</TemporaryDrawer>

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
