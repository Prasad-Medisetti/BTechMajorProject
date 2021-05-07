import { Button, IconButton, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/CloseOutlined";

const useStyles = makeStyles((theme) => ({
	root: {
		...theme.typography.button,
		padding: theme.spacing(1),
	},
}));

function SlideTransition(props) {
	return <Slide {...props} direction="up" />;
}

export default function NotFound(props) {
	const classes = useStyles();
	const location = useLocation();
	const [path, setPath] = useState("");
	const [open, setOpen] = useState(null);

	useEffect(() => {
		setPath(location.pathname);
		setOpen(true);
		console.log(location.pathname);
	}, [location.pathname]);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Typography variant="h6" color="error">
				<code>{path}</code> is Not Found
			</Typography>
			<Snackbar
				open={open}
				className={classes.root}
				TransitionComponent={SlideTransition}
				autoHideDuration={10000}
				onClose={handleClose}
			>
				<Alert
					variant="standard"
					color="error"
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={handleClose}
						>
							<CloseIcon color="inherit" fontSize="inherit" />
						</IconButton>
					}
					icon={<span className="material-icons-outlined">error_outline</span>}
					onClose={handleClose}
					severity="error"
				>
					<code>{path}</code> is Not Found
				</Alert>
			</Snackbar>
		</>
	);
}
