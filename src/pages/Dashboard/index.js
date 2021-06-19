import { Link, makeStyles } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Link as RouterLink,
	Redirect,
	Route,
	Switch,
	useHistory,
	useLocation,
} from "react-router-dom";
import Appbar from "../../components/DashboardAppbar/Appbar.component";
import Footer from "../../components/Footer/Footer.component";
import { LOGO_TEXT } from "../../constants";
import Create from "../Create";
import Edit from "../Edit";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
	},
	main: {
		minHeight: "80vh",
		margin: theme.spacing(2),
		display: "flex",
		flexWrap: "wrap",
		// flexDirection: "column",
		justifyContent: "center",
		alignContent: "center",
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	appBar: {
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
		display: "flex",
	},
	footer: {
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		minHeight: "4vh",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[200]
				: theme.palette.grey[800],
		// backgroundColor: "#000000",
		// color: "#78909c",
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
	title: {
		display: "block",
		padding: theme.spacing(3, 1, 2, 1),
		flexGrow: 1,
		fontSize: "1rem",
		fontWeight: 600,
		textDecoration: "none",
		color: "#000000DE",
		transition: ".4s",
		"&:hover": {
			color: purple[900],
			filter: "drop-shadow(1px 1px 2px inherit)",
		},
	},
	date: {
		flexGrow: 1,
	},
	avatar: {
		marginLeft: theme.spacing(1),
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	toolbar: theme.mixins.toolbar,
}));

export default function Dashboard(props) {
	const { dashboardMenuItems } = props;
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [loggedUser, setLoggedUser] = useState({});

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("user"));
		if (data !== null) {
			setLoggedUser(data);
		}
	}, [history]);

	// useEffect(() => {
	// 	localStorage.setItem("user", JSON.stringify(loggedUser));
	// }, [loggedUser]);

	if (localStorage.getItem("token") === null) {
		<Redirect to="/signin" />;
	}
	return (
		<div className={classes.root}>
			{/* app bar */}
			<Appbar
				classes={classes}
				loggedUser={loggedUser}
				handleDrawerToggle={handleDrawerToggle}
			/>

			{/* side drawer */}

			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						variant="temporary"
						anchor="left"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						<div>
							<Link
								className={classes.title}
								onClick={() => history.replace("/")}
							>
								{LOGO_TEXT}
							</Link>
						</div>

						{/* links/list section */}
						<List>
							{dashboardMenuItems.map((item) => (
								<ListItem
									button
									key={item.text}
									onClick={() => {
										history.push(item.path);
										handleDrawerToggle();
									}}
									className={
										location.pathname === item.path ? classes.active : null
									}
								>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText primary={item.text} />
								</ListItem>
							))}
						</List>
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
					>
						<div>
							<RouterLink className={classes.title} to="/">
								{LOGO_TEXT}
							</RouterLink>
						</div>

						{/* links/list section */}
						<List>
							{dashboardMenuItems.map((item) => (
								<ListItem
									button
									key={item.text}
									onClick={() => {
										history.push(item.path);
									}}
									className={
										location.pathname === item.path ? classes.active : null
									}
								>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText primary={item.text} />
								</ListItem>
							))}
						</List>
					</Drawer>
				</Hidden>
			</nav>

			{/* main content */}
			<main className={classes.main}>
				{Object.entries(loggedUser).length !== 0
					? `Hello ${loggedUser.full_name}!`
					: null}
				<Router>
					<Switch>
						<Route path="/create">
							<Create />
						</Route>
						<Route path="/edit/:id">
							<Edit />
						</Route>
					</Switch>
				</Router>
			</main>

			<Footer classes={classes} />
		</div>
	);
}
