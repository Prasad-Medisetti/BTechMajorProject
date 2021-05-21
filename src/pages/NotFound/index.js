import { IconButton, Typography } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

function SlideTransition(props) {
	return <Slide {...props} direction="up" />;
}

export default function NotFound({ classes }) {
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
			<main className={classes.main}>
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
						icon={
							<span className="material-icons-outlined">error_outline</span>
						}
						onClose={handleClose}
						severity="error"
					>
						<code>{path}</code> is Not Found
					</Alert>
				</Snackbar>
			</main>
		</>
	);
}
