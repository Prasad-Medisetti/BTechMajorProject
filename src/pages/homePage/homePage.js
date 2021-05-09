import React, { useEffect, useState, useRef } from "react";
import { purple } from "@material-ui/core/colors";
import { CircularProgress, makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

import "./home.css";
import HomeAppBar from "../../components/homeAppBar/homeAppBar";
import Footer from "../../components/Footer/Footer.component";

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
		maxWidth: "100vw",
		overflow: "scroll",
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
		backgroundColor: "rgba(0, 0, 0, 0.23)",
	},
	avatar: {
		marginLeft: theme.spacing(1),
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	toolbar: { display: "flex" },
}));

export default function HomePage() {
	const classes = useStyles();

	const initialState = { isloaded: false, users: [], mobileOpen: false };

	const [mobileOpen, setMobileOpen] = useState(initialState.mobileOpen);
	const [isLoaded, setIsLoaded] = useState(initialState.isLoaded);
	const [users, setUsers] = useState(initialState.users);

	const menuItems = [
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
			icon: <span className="material-icons">dashboard</span>,
			path: "/dashboard",
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
		setTimeout(() => {
			fetchData();
		}, 3000);
		setIsLoaded(true);
	}, [initialState.users]);

	return (
		<>
			{/* app bar */}
			<HomeAppBar
				classes={classes}
				menuItems={menuItems}
				mobileOpen={mobileOpen}
				setMobileOpen={setMobileOpen}
				handleDrawerToggle={handleDrawerToggle}
			/>
			<main className={classes.main}>
				{users.length > 0 && isLoaded === true ? (
					users.map((user) => {
						return (
							<div
								key={user.id}
								style={{
									display: "flex",
									flexWrap: "wrap",
									margin: ".5rem",
									textAlign: "center",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									fontFamily: "monospace",
								}}
							>
								<h2>{user.login}</h2>
								<img
									src={user.avatar_url}
									style={{ width: "300px", borderRadius: 8 }}
									alt={user.name}
								/>
								<a
									href={user.html_url}
									onClick={(e) => {
										e.preventDefault();
										window.open(user.html_url, "_blank");
									}}
									style={{ display: "block", color: "#000", margin: "1rem" }}
								>
									Goto Giyhub Profile
								</a>
							</div>
						);
					})
				) : (
					<CircularProgress color="inherit" />
				)}
			</main>
			<Footer classes={classes} />
		</>
	);
}
