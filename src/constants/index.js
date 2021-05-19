import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import React from "react";

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
	{
		text: "DASHBOARD",
		icon: <span className="material-icons-outlined">dashboard</span>,
		path: "/dashboard",
	},
];
export const dashboardMenuItems = [
	{
		text: "My Posts",
		icon: <SubjectOutlined color="secondary" />,
		path: "/dashboard",
	},
	{
		text: "Create Post",
		icon: <AddCircleOutlineOutlined color="secondary" />,
		path: "/dashboard/create",
	},
];
