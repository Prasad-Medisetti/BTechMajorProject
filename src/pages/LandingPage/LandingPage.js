import React, { useEffect, useState } from "react";
import { purple } from "@material-ui/core/colors";
import { CircularProgress, makeStyles } from "@material-ui/core";

import "./LandingPage.css";
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
				: theme.palette.grey[800], // backgroundColor: "#000000",
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

export default function HomePage() {
	const classes = useStyles();

	const initialState = { isloaded: false, users: [], mobileOpen: false };

	const [mobileOpen, setMobileOpen] = useState(initialState.mobileOpen);
	const [isLoaded, setIsLoaded] = useState(initialState.isLoaded);
	const [users, setUsers] = useState(initialState.users);

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
									loading="lazy"
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
					<CircularProgress
						className={classes.circularProgress}
						color="inherit"
					/>
				)}
			</main>
			<Footer classes={classes} />
		</>
	);
}
