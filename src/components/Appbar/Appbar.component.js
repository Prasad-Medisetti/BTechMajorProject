import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/MenuOutlined";

import { format } from "date-fns";

function Appbar({ classes, handleDrawerToggle }) {
	return (
		<AppBar
			position="fixed"
			className={classes.appBar}
			elevation={0}
			color="primary"
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
				{/* <Typography variant="h6" className={classes.title}>
					Online Notice Board
				</Typography> */}
				<Typography>Admin</Typography>
				<Avatar className={classes.avatar} />
			</Toolbar>
		</AppBar>
	);
}

export default Appbar;
