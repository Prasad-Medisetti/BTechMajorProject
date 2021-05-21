import { CircularProgress } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "./assets/font/material-icons.css";
import Footer from "./components/Footer/Footer.component";
import HomeAppBar from "./components/HomeAppBar";
import { dashboardMenuItems, menuItems } from "./constants";
import { theme, useStyles } from "./styles";
const HomePage = React.lazy(() => import("./pages/Landing"));
const NotFoundPage = React.lazy(() => import("./pages/NotFound"));
const SignInPage = React.lazy(() => import("./pages/SignIn"));
const SignUpPage = React.lazy(() => import("./pages/SignUp"));
const DashboardPage = React.lazy(() => import("./components/Layout"));

function App() {
	const classes = useStyles();
	const initialState = { mobileOpen: false };

	const [mobileOpen, setMobileOpen] = useState(initialState.mobileOpen);

	const handleDrawerToggle = (open) => {
		setMobileOpen(open);
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
							<HomeAppBar
								classes={classes}
								menuItems={menuItems}
								mobileOpen={mobileOpen}
								setMobileOpen={setMobileOpen}
								handleDrawerToggle={handleDrawerToggle}
							/>
							<Suspense
								fallback={
									<main className={classes.main}>
										<CircularProgress
											className={classes.circularProgress}
											color="inherit"
										/>
									</main>
								}
							>
								<HomePage classes={classes} menuItems={menuItems} />
							</Suspense>
							<Footer classes={classes} />
						</Route>
						<Route path="/signin">
							<HomeAppBar
								classes={classes}
								menuItems={menuItems}
								mobileOpen={mobileOpen}
								setMobileOpen={setMobileOpen}
								handleDrawerToggle={handleDrawerToggle}
							/>
							<Suspense
								fallback={
									<main className={classes.main}>
										<CircularProgress
											className={classes.circularProgress}
											color="inherit"
										/>
									</main>
								}
							>
								<SignInPage classes={classes} />
							</Suspense>
							<Footer classes={classes} />
						</Route>
						<Route path="/signup">
							<HomeAppBar
								classes={classes}
								menuItems={menuItems}
								mobileOpen={mobileOpen}
								setMobileOpen={setMobileOpen}
								handleDrawerToggle={handleDrawerToggle}
							/>
							<Suspense
								fallback={
									<main className={classes.main}>
										<CircularProgress
											className={classes.circularProgress}
											color="inherit"
										/>
									</main>
								}
							>
								<SignUpPage classes={classes} />
							</Suspense>
							<Footer classes={classes} />
						</Route>
						<Route path="/dashboard">
							<Suspense
								fallback={
									<main className={classes.main}>
										<CircularProgress
											className={classes.circularProgress}
											color="inherit"
										/>
									</main>
								}
							>
								<DashboardPage dashboardMenuItems={dashboardMenuItems} />
							</Suspense>
						</Route>
						<Route path="*">
							<Suspense
								fallback={
									<CircularProgress
										className={classes.circularProgress}
										color="inherit"
									/>
								}
							>
								<NotFoundPage classes={classes} menuItems={menuItems} />
							</Suspense>
							<Footer classes={classes} />
						</Route>
					</Switch>
				</Router>
			</ThemeProvider>
		</>
	);
}

export default App;
