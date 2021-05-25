import {
	Button,
	Container,
	List,
	ListItem,
	ListItemIcon,
	Select,
	TextField
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useState } from "react";
import MySnackbar from "../../components/Snackbar";

export default function SignIn({ classes }) {
	const initialState = {
		isSubmitted: false,
		user: {
			email: "",
			password: "",
			designation: "",
			showPassword: false,
		},
		emailError: false,
		passwordError: {
			error: false,
			minLen: false,
			digits: false,
			upperCh: false,
			lowerCh: false,
			specialSym: false,
		},
		designationError: false,
	};

	const [toastOpen, setToastOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(initialState.isSubmitted);
	const [user, setUser] = useState(initialState.user);
	const [emailError, setEmailError] = useState(initialState.emailError);
	const [passwordError, setPasswordError] = useState(
		initialState.passwordError,
	);
	const [designationError, setDesignationError] = useState(
		initialState.designationError,
	);

	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	const validateEmail = () => {
		setEmailError(user.email === "" || !emailRegex.test(user.email));
	};

	const validatePassword = () => {
		setPasswordError({
			minLen: user.password.length >= 0 && user.password.length < 8,
			digits: user.password === "" || !/\d/.test(user.password),
			lowerCh: user.password === "" || !/[a-z]/.test(user.password),
			upperCh: user.password === "" || !/[A-Z]/.test(user.password),
			specialSym: user.password === "" || !/[^a-zA-Z0-9]/.test(user.password),
			error:
				(user.password.length > 0 && user.password.length < 8) ||
				!/\d/.test(user.password) ||
				!/[a-z]/.test(user.password) ||
				!/[A-Z]/.test(user.password) ||
				!/[^a-zA-Z0-9]/.test(user.password),
		});
	};

	const validateDesignation = () => {
		setDesignationError(user.designation === "");
	};

	const onChange = (e) => {
		const value = e.target.value;
		setUser({
			...user,
			[e.target.name]: value,
		});
	};

	const handleChange = (prop) => (event) => {
		setUser({ ...user, [prop]: event.target.value });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleClickShowPassword = () => {
		setUser({ ...user, showPassword: !user.showPassword });
	};

	const handleToastClick = () => {
		setToastOpen(true);
		setTimeout(() => {
			setToastOpen(false);
		}, 6000);
	};

	const handleToastClose = () => {
		setToastOpen(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(!emailError && !passwordError.error && !designationError);

		validateEmail();
		validatePassword();
		validateDesignation();

		setIsSubmitted(
			user.email !== "" &&
				user.password !== "" &&
				user.designation !== "" &&
				!emailError &&
				!passwordError.error &&
				!designationError,
		);

		setToastMessage("Sign In Successful");
		setToastOpen(isSubmitted);
		setTimeout(() => {
			setToastOpen(false);
		}, 6000);

		// if (note.title && note.details) {
		// 	if (note._id) {
		// 		// console.log(note._id);
		// 		fetch(
		// 			"https://onlinenoticeboard-server.herokuapp.com/notes" + note._id,
		// 			{
		// 				method: "PUT",
		// 				headers: { "Content-type": "application/json" },
		// 				body: JSON.stringify({ ...note }),
		// 			},
		// 		).then(() => history.push("/"));
		// 	} else {
		// 		fetch("https://onlinenoticeboard-server.herokuapp.com/notes", {
		// 			method: "POST",
		// 			headers: { "Content-type": "application/json" },
		// 			body: JSON.stringify({ ...note }),
		// 		}).then(() => history.push("/dashboard"));
		// 	}
		// }
	};

	return (
		<main className={classes.main}>
			<MySnackbar
				toastOpen={toastOpen}
				handleToastClick={handleToastClick}
				handleToastClose={handleToastClose}
				toastMessage={toastMessage}
			/>
			<Container maxWidth="sm">
				{isSubmitted === false && (
					<>
						<Typography
							variant="h1"
							align="center"
							color="inherit"
							style={{
								fontSize: "1.4rem",
								fontWeight: 600,
								textTransform: "uppercase",
								marginBottom: "1.2rem",
							}}
							onClick={handleToastClick}
						>
							Sign In
						</Typography>
						<form noValidate autoComplete="off" onSubmit={handleSubmit}>
							<TextField
								className={classes.field}
								onChange={(e) => onChange(e)}
								onBlur={validateEmail}
								label="Email"
								variant="outlined"
								fullWidth
								type="email"
								name="email"
								value={user.email}
								required
								error={emailError}
								size="small"
							/>
							{emailError && (
								<List
									dense
									disablePadding
									className={classes.field}
									style={{ margin: ".5rem auto" }}
									aria-label="password validation hints"
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
											Please enter your email address.
										</Typography>
									</ListItem>
								</List>
							)}
							<FormControl
								className={classes.field}
								variant="outlined"
								required
								size="small"
								error={passwordError.error}
							>
								<InputLabel htmlFor="user_password">Password</InputLabel>
								<OutlinedInput
									name="password"
									id="user_password"
									type={user.showPassword ? "text" : "password"}
									value={user.password}
									labelWidth={90}
									required
									fullWidth
									onChange={handleChange("password")}
									onBlur={validatePassword}
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
							{/* {<pre>{JSON.stringify(passwordError, null, 4)}</pre>} */}
							{passwordError.error && (
								<List
									dense
									disablePadding
									className={classes.field}
									style={{ margin: ".25em auto" }}
									aria-label="password validation hints"
								>
									{passwordError.minLen && (
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
												Your password must be at least 8 characters
											</Typography>
										</ListItem>
									)}
									{passwordError.lowerCh && (
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
												Your password must contain at least one lowercase
												letter.
											</Typography>
										</ListItem>
									)}
									{passwordError.upperCh && (
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
												Your password must contain at least one uppercase
												letter.
											</Typography>
										</ListItem>
									)}
									{passwordError.digits && (
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
												Your password must contain at least one digit.
											</Typography>
										</ListItem>
									)}
									{passwordError.specialSym && (
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
												Your password must contain at least one special
												character.
											</Typography>
										</ListItem>
									)}
								</List>
							)}
							<FormControl
								variant="outlined"
								required
								className={classes.field}
								error={designationError}
								size="small"
							>
								<InputLabel id="demo-simple-select-outlined-label">
									Sign In As
								</InputLabel>
								<Select
									value={user.designation}
									onChange={onChange}
									onBlur={validateDesignation}
									error={designationError}
									variant="outlined"
									required
									fullWidth
									labelWidth={90}
									inputProps={{
										name: "designation",
										id: "designation",
									}}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									<MenuItem value={"Student"}>Student</MenuItem>
									<MenuItem value={"Faculty"}>Faculty</MenuItem>
									<MenuItem value={"Hod"}>Hod</MenuItem>
								</Select>
							</FormControl>
							{JSON.stringify(user.designation)}
							<FormControl
								variant="outlined"
								required
								className={classes.field}
								error={designationError}
								size="small"
							>
								<InputLabel htmlFor="designation">Sign In As</InputLabel>
								<Select
									native
									value={user.designation}
									onChange={onChange}
									onBlur={validateDesignation}
									error={designationError}
									variant="outlined"
									required
									fullWidth
									label='Sign In As'
									labelWidth={90}
									inputProps={{
										name: "designation",
										id: "designation",
									}}
								>
									<option aria-label="None" value="">
										None
									</option>
									<option value={"Student"}>Student</option>
									<option value={"Faculty"}>Faculty</option>
									<option value={"Hod"}>Hod</option>
								</Select>
							</FormControl>
							{designationError && (
								<List
									dense
									disablePadding
									className={classes.field}
									style={{ margin: ".5rem auto" }}
									aria-label="type validation hints"
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
											Please choose an option.
										</Typography>
									</ListItem>
								</List>
							)}
							<Button
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
								size="large"
								endIcon={<span className="material-icons-outlined">login</span>}
								style={{ margin: ".5em auto" }}
							>
								Sign In
							</Button>
						</form>
					</>
				)}
				{isSubmitted === true && (
					<>
						<Typography variant="h5" color="inherit">
							Details you have submitted are ...
						</Typography>
						<List aria-label="user info" style={{ marginTop: "1rem" }}>
							<ListItem>
								<ListItemIcon>
									<span className="material-icons-outlined">email</span>
								</ListItemIcon>
								<Typography variant="body1" color="textPrimary">
									{user.email}
								</Typography>
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<span className="material-icons-outlined">password</span>
								</ListItemIcon>
								<Typography variant="body1" color="textPrimary">
									{user.password}
								</Typography>
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<span className="material-icons-outlined">account_box</span>
								</ListItemIcon>
								<Typography variant="body1" color="textPrimary">
									{user.designation}
								</Typography>
							</ListItem>
							<ListItem>
								<ListItemIcon
									style={{ margin: ".5em auto" }}
									onClick={() => {
										setIsSubmitted(false);
									}}
								>
									<IconButton aria-label="delete" color="primary">
										<span className="material-icons-outlined">arrow_back</span>
									</IconButton>
								</ListItemIcon>
							</ListItem>
						</List>
					</>
				)}
			</Container>
		</main>
	);
}
