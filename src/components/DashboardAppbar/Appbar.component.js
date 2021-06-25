import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
// import Avatar from "@material-ui/core/Avatar";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/MenuOutlined";
// import { format } from "date-fns";
import React from "react";
import { useHistory } from "react-router-dom";

function Appbar(props) {
	const { classes, handleDrawerToggle, loggedUser } = props;
	const history = useHistory();
	const logout = () => {
		localStorage.clear();
		history.push("/signin");
	};

	return (
		<>
			<AppBar
				position="sticky"
				className={classes.appBar}
				elevation={2}
				color="default"
			>
				<Toolbar>
					<Hidden smUp>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerToggle}
						>
							<MenuIcon />
						</IconButton>
					</Hidden>
					<Typography className={classes.date}>
						{/* {console.log(loggedUser)} */}
						{loggedUser ? `Welcome ${loggedUser.firstName}!` : null}
						{/*Today is the {format(new Date(), "do MMMM Y")}*/}
					</Typography>
					<Hidden xsDown>
						<Button
							onClick={logout}
							size="small"
							disableElevation
							startIcon={
								<span className="material-icons-outlined">logout</span>
							}
						>
							Logout
						</Button>
					</Hidden>
					<Hidden smUp>
						<IconButton color="inherit" aria-label="logout" onClick={logout}>
							<span className="material-icons-outlined">logout</span>
						</IconButton>
					</Hidden>
				</Toolbar>
			</AppBar>
		</>
	);
}

export default Appbar;
