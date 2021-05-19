import Drawer from "@material-ui/core/Drawer";
import React from "react";

export default function TemporaryDrawer({ anchor, open, onClose, children }) {
	return (
		<>
			<Drawer anchor={anchor} open={open} onClose={onClose}>
				{children}
			</Drawer>
		</>
	);
}
