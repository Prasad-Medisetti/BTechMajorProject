import { IconButton } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { Alert } from "@material-ui/lab";
import React from "react";

function TransitionDown(props) {
	return <Slide {...props} direction="down" />;
}

export default function MySnackbar(props) {
	return (
		<>
			<Snackbar
				open={props.toastOpen}
				style={{ margin: "4.5rem auto" }}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				TransitionComponent={TransitionDown}
				key="down"
			>
				<Alert
					variant="standard"
					color="success"
					action={
						<IconButton
							key="close"
							aria-label="close"
							color="inherit"
							size="small"
							onClick={props.handleToastClose}
						>
							<CloseIcon />
						</IconButton>
					}
					onClose={props.handleToastClose}
				>
					{props.toastMessage !== "" ? props.toastMessage : "This is a toast"}
				</Alert>
			</Snackbar>
		</>
	);
}
