import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {
	Button,
	Divider,
	IconButton,
	Link,
	Toolbar,
	Typography,
} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";

import TemporaryDrawer from "../TemporaryDrawer/TemporaryDrawer";

function HomeAppBar(props) {
	const location = useLocation();
	const history = useHistory();

	return (
		<>
			<div className={props.classes.root}>
				{/* app bar */}
				<AppBar position="sticky" className={props.classes.appbar}>
					<Toolbar className={props.classes.toolbar}>
						<Link
							className={props.classes.title}
							style={{ fontSize: 22 }}
							onClick={() => history.replace("/")}
						>
							Online Notice Board
						</Link>
						<Hidden smDown implementation="css">
							<ButtonGroup
								orientation="horizontal"
								variant="text"
								color="inherit"
								size="large"
								aria-label="vertical contained primary button group"
							>
								{props.menuItems.map((item, index) => (
									<Button
										key={index}
										className={
											location.pathname === item.path
												? props.classes.active
												: null
										}
										variant="text"
										color="inherit"
										fullWidth
										endIcon={item.icon}
										onClick={() => history.replace(item.path)}
									>
										{item.text}
									</Button>
								))}
							</ButtonGroup>
						</Hidden>
						<Hidden mdUp implementation="css">
							<IconButton
								edge="start"
								className={props.classes.menuButton}
								color="inherit"
								onClick={props.handleDrawerToggle}
								aria-label="menu"
							>
								<MenuIcon />
							</IconButton>
						</Hidden>
					</Toolbar>
				</AppBar>
				<TemporaryDrawer
					anchor="right"
					style={{ width: "80vw" }}
					open={props.mobileOpen}
					onClose={props.handleDrawerToggle}
				>
					<List>
						<ListItem key="title" button>
							<Typography
								className={props.classes.drawerTitle}
								variant="h6"
								component="h4"
								children="Online Notice Board"
								onClick={() => history.replace("/")}
							/>
						</ListItem>
						<Divider style={{ margin: "1em" }} />
						<ListItem
							style={{
								minHeight: "80vh",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<ButtonGroup
								orientation="vertical"
								variant="text"
								fullWidth
								aria-label="vertical contained primary button group"
							>
								{props.menuItems.map((item, index) => (
									<Button
										key={index}
										variant="text"
										color="inherit"
										fullWidth
										startIcon={item.icon}
										onClick={() => {history.replace(item.path);props.handleDrawerToggle()}}
									>
										{item.text}
									</Button>
								))}
							</ButtonGroup>
						</ListItem>
					</List>
				</TemporaryDrawer>
			</div>
		</>
	);
}

export default HomeAppBar;
