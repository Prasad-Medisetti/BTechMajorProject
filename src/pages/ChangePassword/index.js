import {
	Box,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SwitchBox from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ShowWithAnimation from "../../components/ShowWithAnimation";
import axios from "../../configs/axios";
import { formatSizeUnits } from "../../utils";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Loading from "../../components/Loading";

const useStyles = makeStyles({
	container: {
		width: "100%",
	},
	field: {
		marginTop: 20,
		marginBottom: 20,
		display: "block",
	},
	formGroup: { marginLeft: "1rem", marginTop: ".5rem" },
	listIcon: {
		minWidth: "2.8em",
	},
});

export default function Edit({ toast, loggedUser }) {
	const classes = useStyles();
	const history = useHistory();
	// const params = useParams();

	const [isLoading, setIsLoading] = useState(false);
	const [isFormFilled, setIsFormFilled] = useState(false);
	const [user, setUser] = useState({
		newPassword:'',
		confirmNewPassword:'',
		showPassword: false,
	})
	const [newPasswordError, setNewPasswordError] = useState( {
			error: null,
			minLen: null,
			digits: null,
			upperCh: null,
			lowerCh: null,
			specialSym: null,
		}
	);
	const [confirmNewPasswordError, setConfirmNewPasswordError] = useState( {
			error: null,
			minLen: null,
			digits: null,
			upperCh: null,
			lowerCh: null,
			specialSym: null,
		}
	);


	const passwordErrors = [
		{
			exp: "minLen",
			message: "Your password must be at least 8 characters",
		},
		{
			exp: "digits",
			message: "Your password must contain at least one digit.",
		},
		{
			exp: "lowerCh",
			message: "Your password must contain at least one lowercase letter.",
		},
		{
			exp: "upperCh",
			message: "Your password must contain at least one uppercase letter.",
		},
		{
			exp: "specialSym",
			message: "Your password must contain at least one special character.",
		},
	];

	const validateNewPassword = () => {
		setNewPasswordError({
			minLen: user.newPassword.length >= 0 && user.newPassword.length < 8,
			digits: user.newPassword === "" || !/\d/.test(user.newPassword),
			lowerCh: user.newPassword === "" || !/[a-z]/.test(user.newPassword),
			upperCh: user.newPassword === "" || !/[A-Z]/.test(user.newPassword),
			specialSym: user.newPassword === "" || !/[^a-zA-Z0-9]/.test(user.newPassword),
			error:
				(user.newPassword.length > 0 && user.newPassword.length < 8) ||
				!/\d/.test(user.newPassword) ||
				!/[a-z]/.test(user.newPassword) ||
				!/[A-Z]/.test(user.newPassword) ||
				!/[^a-zA-Z0-9]/.test(user.newPassword),
		});
	};

		const validateConfirmNewPassword = () => {
		setConfirmNewPasswordError({
			minLen: user.confirmNewPassword.length >= 0 && user.confirmNewPassword.length < 8,
			digits: user.confirmNewPassword === "" || !/\d/.test(user.confirmNewPassword),
			lowerCh: user.confirmNewPassword === "" || !/[a-z]/.test(user.confirmNewPassword),
			upperCh: user.confirmNewPassword === "" || !/[A-Z]/.test(user.confirmNewPassword),
			specialSym: user.confirmNewPassword === "" || !/[^a-zA-Z0-9]/.test(user.confirmNewPassword),
			error:
				(user.confirmNewPassword.length > 0 && user.confirmNewPassword.length < 8) ||
				!/\d/.test(user.confirmNewPassword) ||
				!/[a-z]/.test(user.confirmNewPassword) ||
				!/[A-Z]/.test(user.confirmNewPassword) ||
				!/[^a-zA-Z0-9]/.test(user.confirmNewPassword),
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleClickShowPassword = () => {
		setUser({ ...user, showPassword: !user.showPassword });
	};

	const handleChange = (prop) => (event) => {
		setUser({ ...user, [prop]: event.target.value });
	};

	useEffect(() => {
		setIsFormFilled(
				user.newPassword !== "" && user.confirmNewPassword!==''
		);
	}, [user.newPassword , user.confirmNewPassword]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isFormFilled === false) return;
		if (newPasswordError.error===false && confirmNewPasswordError.error===false) {
			let {showPassword, ...data} = user
			axios
				.patch("/api/auth/change_password/"+loggedUser._id, data)
				.then((res) => {
					setUser({
						newPassword:'',
						confirmNewPassword:'',
						showPassword: false,
					})
					toast.handleToastClick({
						toastOpen: true,
						toastMessage: res.data.message,
						toastVariant: "standard",
						toastColor: "success",
					});
					// history.push("/dashboard");
				})
				.catch((error) => {
					if (error.response) {
						// client received an error response (5xx, 4xx)
						console.log("error.response.data", error.response.data);
						console.log("error.response.status", error.response.status);
						console.log("error.response.headers", error.response.headers);
						if (error.response.status === 401) {
							localStorage.clear();
							toast.handleToastClick({
								toastOpen: true,
								toastMessage: "Please Login",
								toastVariant: "standard",
								toastColor: "error",
							});
							history.replace("/signin");
						}
					} else if (error.request) {
						// client never received a response, or request never left
						console.log("error.request", error.request);
						toast.handleToastClick({
							toastOpen: true,
							toastMessage: error.message,
							toastVariant: "standard",
							toastColor: "error",
						});
					} else {
						// anything else
						console.log("Error", error.message);
						toast.handleToastClick({
							toastOpen: true,
							toastMessage: error.message,
							toastVariant: "standard",
							toastColor: "error",
						});
						console.log("error.request", error.config);
					}
				});
		}
	};

	return (
		<Container maxWidth="sm">
			<Typography variant="h5" color="textPrimary" align="center" gutterBottom>
				Change Password
			</Typography>

			<form
				noValidate
				autoComplete="off"
				onSubmit={handleSubmit}
			>
					<FormControl
						className={classes.field}
						variant="outlined"
						required
						size="small"
					>
						<InputLabel htmlFor="user_password">Password</InputLabel>
						<OutlinedInput
							name="newPassword"
							id="user_password"
							type={user.showPassword ? "text" : "password"}
							value={user.newPassword}
							labelWidth={90}
							required
							fullWidth
							onChange={handleChange("newPassword")}
							onBlur={validateNewPassword}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{user.showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					<ShowWithAnimation isMounted={newPasswordError.error}>
						<List
							dense
							disablePadding
							className={classes.field}
							style={{ margin: ".25em auto" }}
							aria-label="password validation hints"
						>
							{passwordErrors.map((error, id) => (
								<ShowWithAnimation
									isMounted={newPasswordError[error.exp]}
									key={id}
								>
									<ListItem
										style={{ padding: "0 .24rem", margin: ".5rem .5rem" }}
									>
										<span
											className="material-icons md-18"
											style={{ color: "#f44336", marginRight: ".5em" }}
										>
											error_outline
										</span>
										<Typography variant="body2" color="error">
											{error.message}
										</Typography>
									</ListItem>
								</ShowWithAnimation>
							))}
						</List>
					</ShowWithAnimation>
					<FormControl
						className={classes.field}
						variant="outlined"
						required
						size="small"
					>
						<InputLabel htmlFor="confirmNewPassword">Password</InputLabel>
						<OutlinedInput
							name="confirmNewPassword"
							id="confirmNewPassword"
							type={user.showPassword ? "text" : "password"}
							value={user.confirmNewPassword}
							labelWidth={90}
							required
							fullWidth
							onChange={handleChange("confirmNewPassword")}
							onBlur={validateConfirmNewPassword}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{user.showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					<ShowWithAnimation isMounted={confirmNewPasswordError.error}>
						<List
							dense
							disablePadding
							className={classes.field}
							style={{ margin: ".25em auto" }}
							aria-label="password validation hints"
						>
							{passwordErrors.map((error, id) => (
								<ShowWithAnimation
									isMounted={confirmNewPasswordError[error.exp]}
									key={id}
								>
									<ListItem
										style={{ padding: "0 .24rem", margin: ".5rem .5rem" }}
									>
										<span
											className="material-icons md-18"
											style={{ color: "#f44336", marginRight: ".5em" }}
										>
											error_outline
										</span>
										<Typography variant="body2" color="error">
											{error.message}
										</Typography>
									</ListItem>
								</ShowWithAnimation>
							))}
						</List>
					</ShowWithAnimation>

				<Button
					type="submit"
					color="primary"
					variant="contained"
					disabled={isFormFilled===false&&(newPasswordError.error===true || confirmNewPasswordError.error===true)}
					endIcon={<KeyboardArrowRightIcon />}
				>
					Submit
				</Button>
			</form>
		</Container>
	);
}
