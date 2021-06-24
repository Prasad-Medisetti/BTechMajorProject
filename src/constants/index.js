import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import React from "react";

/* ------------------------------ PROJECT TITLE ----------------------------- */
export const LOGO_TEXT = "ACADEMIC BULLETIN BOARD";

/* ------------------------- Home App Bar Menu Items------------------------ */
export const menuItems = [
	{
		text: "HOME",
		icon: <span className="material-icons-outlined">home</span>,
		path: "/",
	},
	{
		text: "SIGN IN",
		icon: <span className="material-icons-outlined">login</span>,
		path: "/signin",
	},
	{
		text: "SIGN UP",
		icon: <span className="material-icons-outlined">person_add_alt</span>,
		path: "/signup",
	},
	// {
	// 	text: "DASHBOARD",
	// 	icon: <span className="material-icons-outlined">dashboard</span>,
	// 	path: "/dashboard",
	// },
];

/* ------------------------- Dashboard App Bar Menu Items ------------------------ */
export const dashboardMenuItems = [
	{
		text: "My Posts",
		icon: <SubjectOutlined />,
		path: "/dashboard",
	},
	{
		text: "Create Post",
		icon: <AddCircleOutlineOutlined />,
		path: "/dashboard/create",
	},
];
