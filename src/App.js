import { ThemeProvider } from "@material-ui/styles";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "./assets/font/material-icons.css";
import Footer from "./components/Footer/Footer.component";
import HomeAppBar from "./components/HomeAppBar";
import DashboardPage from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import { dashboardMenuItems, menuItems } from "./constants";
import HomePage from "./pages/Landing";
import NotFoundPage from "./pages/NotFound";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import { theme, useStyles } from "./styles";

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
							<HomePage classes={classes} menuItems={menuItems} />
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
							<SignInPage classes={classes} />
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
							<SignUpPage classes={classes} />
							<Footer classes={classes} />
						</Route>
						<Route path="/dashboard">
							<DashboardPage dashboardMenuItems={dashboardMenuItems} />
						</Route>
						<Route path="*">
							<NotFoundPage classes={classes} menuItems={menuItems} />
							<Footer classes={classes} />
						</Route>
					</Switch>
				</Router>

				<ScrollToTop />
			</ThemeProvider>
		</>
	);
}

export default App;
