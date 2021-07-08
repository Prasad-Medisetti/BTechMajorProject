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
		text: "Posts",
		icon: <span className="material-icons-outlined">notes</span>,
		path: "/dashboard",
	},
	{
		text: "Profile",
		icon: <span className="material-icons-outlined">account_circle</span>,
		path: "/dashboard/profile",
	},
	{
		text: "Change password",
		icon: <span className="material-icons-outlined">password</span>,
		path: "/dashboard/change_password",
	},
];

export const dashboardMenuItemsAdmin = [
	{
		text: "Posts",
		icon: <span className="material-icons-outlined">notes</span>,
		path: "/dashboard",
	},
	{
		text: "Create Post",
		icon: <span className="material-icons-outlined">post_add</span>,
		path: "/dashboard/create",
	},
	{
		text: "Profile",
		icon: <span className="material-icons-outlined">account_circle</span>,
		path: "/dashboard/profile",
	},
	{
		text: "Change password",
		icon: <span className="material-icons-outlined">password</span>,
		path: "/dashboard/change_password",
	},
];
