import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core";

import "./App.css";
import Layout from "./components/Layout";
import NotFound from "./pages/notFoundPage/notFoundPage";
import HomePage from "./pages/LandingPage/LandingPage";

// import AppBar from "./components/appBar/appBar.component";

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
		display: "flex",
		flexDirection: "column",
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

const theme = createMuiTheme({
	root: {
		transition: "1s",
	},
	palette: {
		primary: {
			main: "#fefefe",
		},
		secondary: purple,
	},
	typography: {
		fontFamily: "Quicksand",
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
		fontWeightBold: 700,
	},
});

function App() {
	const classes = useStyles();

	return (
		<>
			<ThemeProvider theme={theme}>
				<Router
				// basename={process.env.PUBLIC_URL}
				>
					{/* main content */}
					<Switch>
						<Route exact path="/">
							<HomePage />
						</Route>
						<Route path="/dashboard">
							<Layout />
						</Route>
						<Route path="*">
							<NotFound />
						</Route>
					</Switch>
				</Router>
			</ThemeProvider>
		</>
	);
}

export default App;
