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

	// console.log(`toast`, props.toast)

	return (
		<Snackbar
			open={props.toast.toastOpen}
			style={{ margin: "4.5rem auto" }}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			TransitionComponent={TransitionDown}
			key="down"
		>
			<Alert
				variant={props.toast.toastVariant}
				severity={props.toast.toastColor}
				action={
					<IconButton
						key="close"
						aria-label="close"
						color="inherit"
						size="small"
						onClick={props.toast.handleToastClose}
					>
						<CloseIcon />
					</IconButton>
				}
				onClose={props.toast.handleToastClose}
			>
				{props.toast.toastMessage !== ""
					? props.toast.toastMessage
					: "This is a toast"}
			</Alert>
		</Snackbar>
	);
}
