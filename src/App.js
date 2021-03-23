import React from "react";
// import ReactDOM from "react-dom";

import AppBar from "./components/appBar/appBar.component";
import Footer from "./components/footer/footer.component";

import SignInPage from "./pages/SignIn/SignIn.page";

function App() {
	return (
		<div className="App">
			<AppBar />
			<SignInPage />
			<Footer />
		</div>
	);
}

export default App;
