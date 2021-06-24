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
	Link as RouterLink,
	Route,
	Switch,
	useHistory,
	useLocation,
  useParams,
  useRouteMatch
} from "react-router-dom";
import RouteWithSubRoutes from "src/utils/RouteWithSubRoutes";
import Appbar from "../../components/DashboardAppbar/Appbar.component";
import Footer from "../../components/Footer/Footer.component";
import axios from "../../configs/axios";
import { LOGO_TEXT } from "../../constants";
import Create from "../Create";
import Edit from "../Edit";
import Notes from "../Notes";

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
		padding: theme.spacing(2, 0),
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
	footer_link: {
		color: "inherit",
		textDecoration: "none",
		cursor: "pointer",
		"&:hover": { textDecoration: "underline" },
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
	const { dashboardMenuItems, toast } = props;
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	 let { path, url } = useRouteMatch();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [loggedUser, setLoggedUser] = useState(() => {
		const user = localStorage.getItem("user");
		return user !== null;
	});

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	useEffect(() => {
		axios
			.get("/api/auth/user")
			.then((res) => {
				const user = res.data;
				setLoggedUser(user);
				localStorage.setItem("user", JSON.stringify(user));
			})
			.catch((error) => {
				if (error.response) {
					// client received an error response (5xx, 4xx)
					console.log("error.response.data", error.response.data);
					console.log("error.response.status", error.response.status);
					console.log("error.response.headers", error.response.headers);
					toast.handleToastClick({
						toastOpen: true,
						toastMessage: error.response.data.error,
						toastVariant: "standard",
						toastColor: "error",
					});
				} else if (error.request) {
					// client never received a response, or request never left
					console.log("error.request", error.request);
					toast.handleToastClick({
						toastOpen: true,
						toastMessage: error.message,
						toastVariant: "standard",
						toastColor: "error",
					});
				} else {
					// anything else
					console.log("Error", error.message);
					toast.handleToastClick({
						toastOpen: true,
						toastMessage: error.message,
						toastVariant: "standard",
						toastColor: "error",
					});
					console.log("error.request", error.config);
				}
			});
		const data = JSON.parse(localStorage.getItem("user"));
		if (data !== null) {
			setLoggedUser(data);
		} else {
			setLoggedUser(null);
			history.replace("/signin");
		}
	}, [history, toast]);

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
						// ModalProps={{
						// 	keepMounted: true, // Better open performance on mobile.
						// }}
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
				<Switch>
					<Route exact path="/dashboard">
						<Notes />
					</Route>
					<Route path="/dashboard/create">
						<Create />
					</Route>
					<Route path="/dashboard/edit/:id">
						<Edit />
					</Route>
				</Switch>
			</main>

			<Footer classes={classes} />
		</div>
	);
}
