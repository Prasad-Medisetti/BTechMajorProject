import {
	Button,
	Container,
	List,
	ListItem,
	ListItemIcon,
	Select,
	TextField,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useState } from "react";
import { useHistory } from "react-router";

export default function SignIn({ classes }) {
	const history = useHistory();

	const [isSubmitted, setIsSubmitted] = useState(false);
	const [user, setUser] = useState({
		email: "",
		password: "",
		user_type: "",
		showPassword: false,
	});

	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState({
		error: false,
		minLen: false,
		digits: false,
		upperCh: false,
		lowerCh: false,
		specialSym: false,
	});
	const [typeError, setTypeError] = useState(false);

	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	const validateEmail = () => {
		setEmailError(user.email === "" || !emailRegex.test(user.email));
		return emailError;
	};
	const validatePassword = () => {
		setPasswordError({
			minLen: user.password === "" || !user.password.length >= 8,
			digits: user.password === "" || !/\d/.test(user.password),
			lowerCh: user.password === "" || !/[a-z]/.test(user.password),
			upperCh: user.password === "" || !/[A-Z]/.test(user.password),
			specialSym:
				user.password === "" || !/[.!@#$%^&*()_+-=]/.test(user.password),
			error:
				!user.password.length >= 8 ||
				!/\d/.test(user.password) ||
				!/[a-z]/.test(user.password) ||
				!/[A-Z]/.test(user.password) ||
				!/[.!@#$%^&*()_+-=]/.test(user.password),
		});
		return passwordError.error;
	};
	const validateType = () => {
		setTypeError(user.user_type === "");
		return typeError;
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

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(!validateEmail() && !validatePassword() && !validateType());
		setIsSubmitted(!validateEmail() && !validatePassword() && !validateType());

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
			<Container maxWidth="sm">
				{isSubmitted !== true && (
					<>
						<Typography
							variant="h6"
							align="center"
							color="inherit"
							style={{
								textTransform: "uppercase",
								fontFamily: "Quicksand",
								maxWidth: "100%",
								fontWeight: 600,
							}}
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
							/>
							{emailError && (
								<List
									dense
									disablePadding
									className={classes.field}
									style={{ margin: ".5em auto" }}
									aria-label="password validation hints"
								>
									<ListItem style={{ padding: ".25em .5em" }}>
										<span
											className="material-icons md-18"
											style={{ color: "#f44336", marginRight: ".5em" }}
										>
											error_outline
										</span>
										<Typography variant="body1" color="error">
											Please enter email address.
										</Typography>
									</ListItem>
								</List>
							)}
							{isSubmitted && (
								<pre>
									t:{emailRegex.test(user.email)}
									{JSON.stringify(emailError, null, "\t")}
								</pre>
							)}
							<FormControl
								className={classes.field}
								variant="outlined"
								required
								error={passwordError.error}
							>
								<InputLabel htmlFor="user_password">Password</InputLabel>
								<OutlinedInput
									name="password"
									id="user_password"
									type={user.showPassword ? "text" : "password"}
									value={user.password}
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
									labelWidth={80}
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
										<ListItem style={{ padding: ".25em .5em" }}>
											<span
												className="material-icons md-18"
												style={{ color: "#f44336", marginRight: ".5em" }}
											>
												error_outline
											</span>
											<Typography variant="body1" color="error">
												Your password must be at least 8 characters
											</Typography>
										</ListItem>
									)}
									{passwordError.lowerCh && (
										<ListItem style={{ padding: ".25em .5em" }}>
											<span
												className="material-icons md-18"
												style={{ color: "#f44336", marginRight: ".5em" }}
											>
												error_outline
											</span>
											<Typography variant="body1" color="error">
												Your password must contain at least one lowercase
												letter.
											</Typography>
										</ListItem>
									)}
									{passwordError.upperCh && (
										<ListItem style={{ padding: ".25em .5em" }}>
											<span
												className="material-icons md-18"
												style={{ color: "#f44336", marginRight: ".5em" }}
											>
												error_outline
											</span>
											<Typography variant="body1" color="error">
												Your password must contain at least one uppercase
												letter.
											</Typography>
										</ListItem>
									)}
									{passwordError.digits && (
										<ListItem style={{ padding: ".25em .5em" }}>
											<span
												className="material-icons md-18"
												style={{ color: "#f44336", marginRight: ".5em" }}
											>
												error_outline
											</span>
											<Typography variant="body1" color="error">
												Your password must contain at least one digit.
											</Typography>
										</ListItem>
									)}
									{passwordError.specialSym && (
										<ListItem style={{ padding: ".25em .5em" }}>
											<span
												className="material-icons md-18"
												style={{ color: "#f44336", marginRight: ".5em" }}
											>
												error_outline
											</span>
											<Typography variant="body1" color="error">
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
							>
								<InputLabel htmlFor="user_type">Login As</InputLabel>
								<Select
									native
									value={user.user_type}
									onChange={onChange}
									onBlur={validateType}
									variant="outlined"
									required
									fullWidth
									labelWidth={70}
									inputProps={{
										name: "user_type",
										id: "user_type",
									}}
								>
									<option aria-label="None" value="" />
									<option value={"Student"}>Student</option>
									<option value={"Faculty"}>Faculty</option>
									<option value={"Hod"}>Hod</option>
								</Select>
							</FormControl>
							{typeError === true && (
								<List
									dense
									disablePadding
									className={classes.field}
									style={{ margin: ".5em auto" }}
									aria-label="type validation hints"
								>
									<ListItem style={{ padding: ".25em .5em" }}>
										<span
											className="material-icons md-18"
											style={{ color: "#f44336", marginRight: ".5em" }}
										>
											error_outline
										</span>
										<Typography variant="body1" color="error">
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
									<span className="material-icons-outlined">mail_outline</span>
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
									<span className="material-icons-outlined">
										person_outline
									</span>
								</ListItemIcon>
								<Typography variant="body1" color="textPrimary">
									{user.user_type}
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
