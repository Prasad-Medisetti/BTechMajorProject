import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/MenuOutlined";
import { format } from "date-fns";
import React from "react";

function Appbar({ classes, handleDrawerToggle }) {
	return (
		<AppBar
			position="fixed"
			className={classes.appBar}
			elevation={2}
			color="default"
		>
			<Toolbar>
				<Hidden smUp implementation="css">
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerToggle}
						edge="start"
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
				</Hidden>
				<Typography className={classes.date}>
					Today is the {format(new Date(), "do MMMM Y")}
				</Typography>
				<Typography>Admin</Typography>
				<Avatar className={classes.avatar} />
			</Toolbar>
		</AppBar>
	);
}

export default Appbar;
