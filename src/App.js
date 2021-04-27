import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

import Layout from "./components/Layout";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

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

// import AppBar from "./components/appBar/appBar.component";
// import Footer from "./components/footer/footer.component";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Router>
					<Layout>
						<Switch>
							<Route exact path="/">
								<Notes />
							</Route>
							<Route path="/create">
								<Create />
							</Route>
							<Route path="/edit/:id">
								<Edit />
							</Route>
						</Switch>
					</Layout>
				</Router>
				{/* <AppBar /> */}
				{/* <Footer /> */}
			</div>
		</ThemeProvider>
	);
}

export default App;
