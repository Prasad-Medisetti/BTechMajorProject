import { ThemeProvider } from "@material-ui/styles";
import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
// import "./assets/font/material-icons.css";
import Footer from "./components/Footer/Footer.component";
import HomeAppBar from "./components/HomeAppBar";
import ScrollToTop from "./components/ScrollToTop";
import MySnackbar from "./components/Snackbar";
import { dashboardMenuItems, menuItems } from "./constants";
import DashboardPage from "./pages/Dashboard";
import HomePage from "./pages/Landing";
import NotFoundPage from "./pages/NotFound";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import { theme, useStyles } from "./styles";

function App() {
	const classes = useStyles();
	const initialState = { mobileOpen: false, loggedUser: null };
	const [loggedUser, setLoggedUser] = useState(initialState.loggedUser);
	const [mobileOpen, setMobileOpen] = useState(initialState.mobileOpen);
	const [toast, setToast] = useState({
		toastOpen: false,
		toastMessage: "",
		toastVariant: "standard",
		toastColor: "",
	});
	localStorage.getItem("token");

	const handleDrawerToggle = (open) => {
		setMobileOpen(open);
	};

	const handleToastClick = (options) => {
		setToast({ ...options, toastOpen: true });
		setTimeout(() => {
			setToast({ ...options, toastOpen: false });
		}, 6000);
	};

	const handleToastClose = () => {
		setToast({ ...toast, toastOpen: false });
	};

	return (
		<>
			<ThemeProvider theme={theme}>
				<Router
				// basename={process.env.PUBLIC_URL}
				>
					{/* main content */}
					<Switch>
						<Route exact path="/">
							{localStorage.getItem("token") !== null && (
								<Redirect to="/dashboard" />
							)}
							<HomeAppBar
								classes={classes}
								menuItems={menuItems}
								mobileOpen={mobileOpen}
								setMobileOpen={setMobileOpen}
								handleDrawerToggle={handleDrawerToggle}
							/>
							<HomePage
								classes={classes}
								menuItems={menuItems}
								toast={{
									...toast,
									setToast,
									handleToastClick,
									handleToastClose,
								}}
							/>
							<Footer classes={classes} />
						</Route>
						<Route path="/signin">
							{localStorage.getItem("token") !== null && (
								<Redirect to="/dashboard" />
							)}
							<HomeAppBar
								classes={classes}
								toast={{
									...toast,
									setToast,
									handleToastClick,
									handleToastClose,
								}}
								menuItems={menuItems}
								mobileOpen={mobileOpen}
								setMobileOpen={setMobileOpen}
								handleDrawerToggle={handleDrawerToggle}
							/>
							<SignInPage
								classes={classes}
								toast={{
									...toast,
									setToast,
									handleToastClick,
									handleToastClose,
								}}
							/>
							<Footer classes={classes} />
						</Route>
						<Route path="/signup">
							{localStorage.getItem("token") !== null && (
								<Redirect to="/dashboard" />
							)}
							<HomeAppBar
								classes={classes}
								menuItems={menuItems}
								mobileOpen={mobileOpen}
								setMobileOpen={setMobileOpen}
								handleDrawerToggle={handleDrawerToggle}
							/>
							<SignUpPage
								classes={classes}
								toast={{
									...toast,
									setToast,
									handleToastClick,
									handleToastClose,
								}}
							/>
							<Footer classes={classes} />
						</Route>
						<Route path="/dashboard">
							{localStorage.getItem("token") === null ? (
								<Redirect to="/signin" />
							) : null}
							<DashboardPage dashboardMenuItems={dashboardMenuItems} />
						</Route>
						<Route path="*">
							<HomeAppBar
								classes={classes}
								menuItems={menuItems}
								mobileOpen={mobileOpen}
								setMobileOpen={setMobileOpen}
								handleDrawerToggle={handleDrawerToggle}
							/>
							<NotFoundPage
								classes={classes}
								menuItems={menuItems}
								toast={{
									...toast,
									setToast,
									handleToastClick,
									handleToastClose,
								}}
							/>
							<Footer classes={classes} />
						</Route>
					</Switch>
				</Router>

				<MySnackbar
					toast={{ ...toast, setToast, handleToastClick, handleToastClose }}
				/>
				<ScrollToTop />
			</ThemeProvider>
		</>
	);
}

export default App;
