import { ThemeProvider } from "@material-ui/styles";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "./assets/font/material-icons.css";
import Footer from "./components/Footer/Footer.component";
import HomeAppBar from "./components/HomeAppBar";
import Layout from "./components/Layout";
import { dashboardMenuItems, menuItems } from "./constants";
import HomePage from "./pages/Landing";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
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
							<SignIn classes={classes} />
							<Footer classes={classes} />
						</Route>
						<Route path="/dashboard">
							<Layout dashboardMenuItems={dashboardMenuItems} />
						</Route>
						<Route path="*">
							<NotFound classes={classes} menuItems={menuItems} />
						</Route>
					</Switch>
				</Router>
			</ThemeProvider>
		</>
	);
}

export default App;
