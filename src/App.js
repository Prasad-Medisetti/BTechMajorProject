import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

import Layout from "./components/Layout";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Home from "./pages/Home/Home.component";

// import AppBar from "./components/appBar/appBar.component";

const theme = createMuiTheme({
	root: {
		// transition: "1s",
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
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Router basename={process.env.PUBLIC_URL}>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						{/* <Route path="/posts">
							<Layout />
						</Route> */}
					</Switch>
				</Router>
			</div>
		</ThemeProvider>
	);
}

export default App;
