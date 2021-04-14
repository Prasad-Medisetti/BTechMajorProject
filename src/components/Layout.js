import React from "react";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { Link, useHistory, useLocation } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import { purple } from "@material-ui/core/colors";

import Appbar from "./Appbar/Appbar.component";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	page: {
		background: "#f9f9f9",
		padding: theme.spacing(2),
		width: '100%'
	},
	appBar: {
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
		display: "flex",
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
			text: "My Notes",
			icon: <SubjectOutlined color="secondary" />,
			path: "/",
		},
		{
			text: "Create Note",
			icon: <AddCircleOutlineOutlined color="secondary" />,
			path: "/create",
		}
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
							<Link className={classes.title} variant="h6" to="/">
								Online Notice Board
							</Link>
						</div>

						{/* links/list section */}
						<List>
							{menuItems.map((item) => (
								<ListItem
									button
									key={item.text}
									onClick={() => history.push(item.path)}
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
							<Link className={classes.title} variant="h6" to="/">
								Online Notice Board
							</Link>
						</div>

						{/* links/list section */}
						<List>
							{menuItems.map((item) => (
								<ListItem
									button
									key={item.text}
									onClick={() => history.push(item.path)}
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
			<div className={classes.page}>
				<div className={classes.toolbar}></div>
				{children}
			</div>
		</div>
	);
}
