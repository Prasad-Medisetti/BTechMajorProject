import { Button, Divider, IconButton, Link, Toolbar } from "@material-ui/core";
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
			{/* desktop appbar */}
			<AppBar position="sticky" className={classes.appBar} color="default">
				<Hidden mdUp implementation="css">
					<Toolbar
						className={classes.toolbar}
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Link
							className={classes.title}
							onClick={() => {
								history.push("/");
								handleDrawerToggle(false);
							}}
						>
							Online Notice Board
						</Link>
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
					</Toolbar>
				</Hidden>

				{/* mobile appbar */}
				<Hidden smDown implementation="css">
					<Toolbar
						className={classes.toolbar}
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Link
							className={classes.title}
							onClick={() => {
								history.push("/");
								handleDrawerToggle(false);
							}}
						>
							Online Notice Board
						</Link>
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
					</Toolbar>
				</Hidden>
			</AppBar>
			<TemporaryDrawer
				anchor="top"
				open={mobileOpen}
				onClose={() => {
					handleDrawerToggle(false);
				}}
			>
				<List>
					<ListItem
						key="title"
						style={{ display: "block", textAlign: "center" }}
					>
						<Link
							className={classes.title}
							onClick={() => history.replace("/")}
						>
							Online Notice Board
						</Link>
					</ListItem>

					<Divider style={{ margin: ".5em auto" }} />
					<ListItem
						style={{
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
									onClick={() => {
										history.replace(item.path);
										handleDrawerToggle(false);
									}}
									style={{ minWidth: "" }}
								>
									{item.text}
								</Button>
							))}
						</ButtonGroup>
					</ListItem>
				</List>
			</TemporaryDrawer>
		</>
	);
}

export default HomeAppBar;
