import { Button, Container, Select, TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useState } from "react";

export default function SignIn({ classes }) {
	// const params = useParams();
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const [userNameError, setUserNameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [typeError, setTypeError] = useState(false);

	const [user, setUser] = useState({
		username: "",
		password: "",
		type: "",
		showPassword: false,
	});

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

	const handleClickShowPassword = () => {
		setUser({ ...user, showPassword: !user.showPassword });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setUserNameError(false);
		setPasswordError(false);

		if (user.username === "") {
			setUserNameError(true);
		}
		if (user.password === "") {
			setPasswordError(true);
		}
		if (user.type === "") {
			setTypeError(true);
		}
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
			<Container
				maxWidth="sm"
				style={{
					Width: "100vw",
				}}
			>
				<code
					style={{ overflow: "auto", display: "block", marginBottom: "2em" }}
				>
					{JSON.stringify(user)}
				</code>
				<Typography
					variant="h5"
					align="center"
					color="inherit"
					style={{
						textTransform: "uppercase",
						fontFamily: "Quicksand",
						fontWeight: 600,
					}}
				>
					Sign In
				</Typography>
				<form noValidate autoComplete="off" onSubmit={handleSubmit}>
					<TextField
						className={classes.field}
						onChange={(e) => onChange(e)}
						label="User Name"
						variant="outlined"
						fullWidth
						name="username"
						value={user.username}
						required
						error={userNameError}
					/>
					<FormControl
						className={classes.field}
						variant="outlined"
						required
						error={passwordError}
					>
						<InputLabel htmlFor="outlined-adornment-password">
							Password
						</InputLabel>
						<OutlinedInput
							name="password"
							id="outlined-adornment-password"
							type={user.showPassword ? "text" : "password"}
							value={user.password}
							required
							fullWidth
							onChange={handleChange("password")}
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
					<FormControl
						variant="outlined"
						error={typeError}
						required
						className={classes.field}
					>
						<InputLabel id="demo-simple-select-outlined-label">
							Login As
						</InputLabel>
						<Select
							native
							value={user.type}
							onChange={onChange}
							variant="outlined"
							required
							fullWidth
							labelWidth={70}
							inputProps={{
								name: "type",
								id: "demo-simple-select-outlined-label",
							}}
						>
							<option aria-label="None" value="" />
							<option value={"Student"}>Student</option>
							<option value={"Faculty"}>Faculty</option>
							<option value={"Hod"}>Hod</option>
						</Select>
					</FormControl>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						size="large"
						endIcon={<span className="material-icons-outlined">login</span>}
					>
						Sign In
					</Button>
				</form>
			</Container>
		</main>
	);
}
