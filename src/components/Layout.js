import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
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

import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import { purple } from "@material-ui/core/colors";

import Appbar from "./Appbar/Appbar.component";
import Footer from "./Footer/Footer.component";
import Notes from "../pages/Notes";
import Create from "../pages/Create";
import Edit from "../pages/Edit";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
	},
	page: {
		background: "#f9f9f9",
		padding: theme.spacing(2, 0),
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
	title: {
		display: "block",
		margin: theme.spacing(2),
		flexGrow: 1,
		fontSize: 22,
		textDecoration: "none",
		color: "#000000DE",
		transition: ".4s",
		"&:hover": {
			color: purple[900],
			filter: "drop-shadow(0px 0px 1px inherit)",
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

export default function Layout({ children }) {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const menuItems = [
		{
			text: "My Posts",
			icon: <SubjectOutlined color="secondary" />,
			path: "posts",
		},
		{
			text: "Create Post",
			icon: <AddCircleOutlineOutlined color="secondary" />,
			path: "create",
		},
	];

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<div className={classes.root}>
			{/* app bar */}
			<Appbar classes={classes} handleDrawerToggle={handleDrawerToggle} />

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
							<RouterLink className={classes.title} variant="h6" to="/">
								Online Notice Board
							</RouterLink>
						</div>

						{/* links/list section */}
						<List>
							{menuItems.map((item) => (
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
						close
					>
						<div>
							<RouterLink className={classes.title} variant="h6" to="/">
								Online Notice Board
							</RouterLink>
						</div>

						{/* links/list section */}
						<List>
							{menuItems.map((item) => (
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
			<main className={classes.page}>
				<div className={classes.toolbar}></div>
				{children}
				<Router>
					<Switch>
						<Route exact path="/">
							<Notes />
						</Route>
						<Route path="create">
							<Create />
						</Route>
						<Route path="edit/:id">
							<Edit />
						</Route>
					</Switch>
				</Router>
			</main>

			<Footer classes={classes} />
		</div>
	);
}
