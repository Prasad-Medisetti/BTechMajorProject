import {
	Button,
	Divider,
	IconButton,
	Link,
	Toolbar,
	Typography,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import TemporaryDrawer from "../../components/TemporaryDrawer/TemporaryDrawer";

function HomeAppBar({ classes, menuItems, mobileOpen, handleDrawerToggle }) {
	const location = useLocation();
	const history = useHistory();

	return (
		<>
			<div className={classes.root}>
				{/* app bar */}
				<AppBar position="sticky" className={classes.appBar} color="default">
					<Toolbar className={classes.toolbar}>
						<Link
							className={classes.title}
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
								{menuItems.map((item, index) => (
									<Button
										key={index}
										className={
											location.pathname === item.path ? classes.active : null
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
								className={classes.menuButton}
								color="inherit"
								onClick={() => {
									handleDrawerToggle(true);
								}}
								aria-label="menu"
							>
								<MenuIcon />
							</IconButton>
						</Hidden>
					</Toolbar>
				</AppBar>
				<TemporaryDrawer
					anchor="right"
					style={{ width: "50vw" }}
					open={mobileOpen}
					onClose={() => {
						handleDrawerToggle(false);
					}}
				>
					<List>
						<ListItem key="title" button>
							<Typography
								className={classes.drawerTitle}
								variant="h6"
								component="h4"
								children="Online Notice Board"
								onClick={() => history.replace("/")}
							/>
						</ListItem>

						<Divider />
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
								{menuItems.map((item, index) => (
									<Button
										key={index}
										variant="text"
										color="inherit"
										fullWidth
										startIcon={item.icon}
										className={
											location.pathname === item.path ? classes.active : null
										}
										style={{ justifyContent: "flex-start" }}
										onClick={() => {
											history.replace(item.path);
											handleDrawerToggle(false);
										}}
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
