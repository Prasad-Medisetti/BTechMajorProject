import { createMuiTheme, makeStyles } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
	root: {},
	menuButton: {},
	title: {
		letterSpacing: 0,
		display: "inline-block",
		marginLeft: theme.spacing(1),
		// color: "#00e676",
		textTransform: "uppercase",
		fontFamily: "Quicksand",
		fontWeight: 600,
		color: "#000",
		cursor: "pointer",
		transition: "all .4s",
		"&:hover": {
			color: purple[900],
			filter: "drop-shadow(0px 0px 1px inherit)",
			textDecoration: "none",
		},
		fontSize: '1.05rem',
	},
	appBar: {
		// padding: theme.spacing(0),
		minHeight: "4vh",
		// padding: "5em auto",
		// marginLeft: theme.spacing(1),
		// background: "#000000",
		// color: "#78909c",
	},
	main: {
		minHeight: "84vh",
		// background: "#000000",
		// color: "#78909c",
		margin: theme.spacing(4, 1),
		display: "flex",
		flexWrap: "wrap",
		// flexDirection: "column",
		justifyContent: "center",
		alignContent: "center",
	},
	footer: {
		padding: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		minHeight: "4vh",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[200]
				: theme.palette.grey[800],
		// backgroundColor: "#000000",
		// color: "#78909c",
	},
	footer_link: {
		color: "inherit",
		textDecoration: "none",
		cursor: "pointer",
		"&:hover": { textDecoration: "underline" },
	},
	circularProgress: {
		padding: theme.spacing(1.25),
		opacity: 0.8,
		backgroundColor: "#eeeeee",
		width: "1.8em",
		height: "1.8em",
		borderRadius: "50%",
	},
	field: {
		marginTop: "1rem",
		marginBottom: "1rem",
		display: "block",
		color: "#0a0a0a",
	},
	formControl: {
		minWidth: 150,
	},
	selectEmpty: {
		// marginTop: theme.spacing(2),
		paddingRight: 0,
	},
	listItem: {
		display: "flex",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	icon: {
		fill: theme.palette.primary,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	listItemText: { fontSize: theme.typography.fontSize * 1.15 },
	active: {
		textDecoration: "none",
		// color: "#ffffff",
		opacity: 0.9,
		backgroundColor: "rgba(0, 0, 0, 0.08)",
	},
	avatar: {},
	toolbar: { display: "flex" },
}));

export const theme = createMuiTheme({
	root: {
		transition: "1s",
	},
	palette: {
		// primary: {
		// 	main: "#fefefe",
		// },
		// secondary: purple,
	},
	typography: {
		fontFamily: "Quicksand",
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
		fontWeightBold: 700,
	},
});
