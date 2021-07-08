import { makeStyles, Select, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ShowWithAnimation from "../../components/ShowWithAnimation";
import axios from "../../configs/axios";

const useStyles = makeStyles({
	container: {
		width: "100%",
	},
	field: {
		marginTop: 20,
		marginBottom: 20,
		display: "block",
	},
});

// const uri =
// 	"mongodb+srv://Admin:Admin@cluster0.7gwdx.mongodb.net/online-notice-board?retryWrites=true&w=majority";

export default function Profile({ loggedUser, setLoggedUser, toast }) {
	const classes = useStyles();
	const history = useHistory();
	const params = useParams();
	/* ------------------------------ Initial State ----------------------------- */
	const initialState = {
		isFormFilled: false,
		user: {},
	};
	const [user, setUser] = useState({});
	const [isFormFilled, setIsFormFilled] = useState(initialState.isFormFilled);

	useEffect(() => {
		// console.log(loggedUser);
		if (loggedUser != null) {
			setUser({ ...loggedUser });
		}
	}, [loggedUser]);

	const onChange = (e) => {
		// const value = e.target.value;
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		setIsFormFilled(isValidUser(user));
	}, [user]);

	const isValidUser = (user) => {
		let valid = false;

		switch (user.designation) {
			case "Student":
				if (
					user.branch &&
					user.rollNo &&
					user.section &&
					user.academicYear &&
					user.collegeName
				) {
					valid = true;
				} else {
					valid = false;
				}
				break;
			case "Faculty":
				if (user.empId && user.branch && user.collegeName) {
					valid = true;
				} else {
					valid = false;
				}
				break;
			case "Hod":
				if (user.empId && user.branch && user.collegeName) {
					valid = true;
				} else {
					valid = false;
				}
				break;
			case "Principal":
				if (user.empId && user.collegeName) {
					valid = true;
				} else {
					valid = false;
				}
				break;
		}

		return valid;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isFormFilled === false) return;

		let { _id, createdAt, date, updatedAt, __v, ...newUser } = {
			...loggedUser,
			...user,
		};
		// console.log(newUser);
		axios
			.patch("/api/auth/user/" + _id, newUser)
			.then((res) => {
				// console.log(res.data);
				// history.push("/dashboard");

				setLoggedUser(res.data);
				toast.handleToastClick({
					toastOpen: true,
					toastMessage: "Your profile updated successfully",
					toastVariant: "standard",
					toastColor: "success",
				});
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
						// history.replace("/signin");
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
	};

	return (
		<Container maxWidth="sm">
			{loggedUser !== null ? (
				<>
					<Typography
						variant="h5"
						color="textPrimary"
						align="center"
						gutterBottom
					>
						Profile
					</Typography>

					<form noValidate autoComplete="off" onSubmit={handleSubmit}>
						<TextField
							className={classes.field}
							onChange={(e) => {
								onChange(e);
							}}
							label="First Name"
							variant="outlined"
							fullWidth
							type="text"
							name="firstName"
							value={user.firstName}
							size="small"
						/>
						<TextField
							className={classes.field}
							onChange={(e) => {
								onChange(e);
							}}
							label="Last Name"
							variant="outlined"
							fullWidth
							type="text"
							name="lastName"
							value={user.lastName}
							size="small"
						/>
						<FormControl
							variant="outlined"
							className={classes.field}
							size="small"
						>
							<InputLabel htmlFor="gender">Gender</InputLabel>
							<Select
								native
								value={user.gender}
								onChange={onChange}
								variant="outlined"
								fullWidth
								labelWidth={70}
								inputProps={{
									name: "gender",
									id: "gender",
								}}
							>
								{user.gender === "" && <option aria-label="None" value="" />}
								<option value={"Female"}>Female</option>
								<option value={"Male"}>Male</option>
								<option value={"Others"}>Others</option>
							</Select>
						</FormControl>
						<TextField
							className={classes.field}
							onChange={(e) => onChange(e)}
							style={{
								color: "rgba(0, 0, 0, 0.65)",
							}}
							label="Email"
							variant="outlined"
							fullWidth
							type="email"
							name="email"
							value={loggedUser.email}
							size="small"
							disabled
						/>
						<FormControl
							variant="outlined"
							className={classes.field}
							size="small"
							disabled
						>
							<InputLabel htmlFor="designation">Designation</InputLabel>
							<Select
								native
								value={loggedUser.designation}
								onChange={onChange}
								variant="outlined"
								required
								fullWidth
								labelWidth={100}
								inputProps={{
									name: "designation",
									id: "designation",
								}}
								disabled
							>
								{loggedUser.designation === "" && (
									<option aria-label="None" value="" />
								)}
								<option value={"Student"}>Student</option>
								<option value={"Faculty"}>Faculty</option>
								<option value={"Hod"}>Hod</option>
								<option value={"Principal"}>Principal</option>
							</Select>
						</FormControl>
						<FormControl
							variant="outlined"
							className={classes.field}
							size="small"
						>
							<InputLabel htmlFor="collegeName">CollegeName</InputLabel>
							<Select
								native
								value={user.collegeName}
								onChange={onChange}
								variant="outlined"
								required
								fullWidth
								labelWidth={120}
								inputProps={{
									name: "collegeName",
									id: "collegeName",
								}}
							>
								{user.collegeName === undefined && (
									<option aria-label="None" value="" />
								)}
								<option value={"AEC"}>AEC</option>
								<option value={"ACE"}>ACE</option>
								<option value={"ACET"}>ACET</option>
							</Select>
						</FormControl>
						<ShowWithAnimation isMounted={loggedUser.designation === "Student"}>
							<TextField
								className={classes.field}
								onChange={(e) => {
									onChange(e);
								}}
								label="Roll No"
								variant="outlined"
								fullWidth
								type="text"
								name="rollNo"
								value={user.rollNo}
								size="small"
							/>
							<FormControl
								variant="outlined"
								className={classes.field}
								size="small"
								required
							>
								<InputLabel htmlFor="academicYear">Academic Year</InputLabel>
								<Select
									native
									value={user.academicYear}
									onChange={onChange}
									variant="outlined"
									required
									fullWidth
									labelWidth={120}
									inputProps={{
										name: "academicYear",
										id: "academicYear",
									}}
								>
									{user.academicYear === undefined && (
										<option aria-label="None" value="" />
									)}
									<option value={"I"}>I</option>
									<option value={"II"}>II</option>
									<option value={"III"}>III</option>
									<option value={"IV"}>IV</option>
								</Select>
							</FormControl>
							<FormControl
								variant="outlined"
								className={classes.field}
								size="small"
								required
							>
								<InputLabel htmlFor="branch">Branch</InputLabel>
								<Select
									native
									value={user.branch}
									onChange={onChange}
									variant="outlined"
									required
									fullWidth
									labelWidth={70}
									inputProps={{
										name: "branch",
										id: "branch",
									}}
								>
									{user.branch === undefined && (
										<option aria-label="None" value="" />
									)}
									<option value={"CSE"}>CSE</option>
									<option value={"IT"}>IT</option>
									<option value={"EEE"}>EEE</option>
									<option value={"ECE"}>ECE</option>
									<option value={"CE"}>CE</option>
									<option value={"MECH"}>MECH</option>
									<option value={"PET"}>PET</option>
								</Select>
							</FormControl>
							<FormControl
								variant="outlined"
								className={classes.field}
								required
								size="small"
							>
								<InputLabel htmlFor="section">Section</InputLabel>
								<Select
									native
									value={user.section}
									onChange={onChange}
									variant="outlined"
									required
									fullWidth
									labelWidth={120}
									inputProps={{
										name: "section",
										id: "section",
									}}
								>
									{user.section === undefined && (
										<option aria-label="None" value="" />
									)}
									<option value={"A"}>A</option>
									<option value={"B"}>B</option>
									<option value={"C"}>C</option>
									<option value={"D"}>D</option>
								</Select>
							</FormControl>
						</ShowWithAnimation>
						<ShowWithAnimation isMounted={loggedUser.designation === "Faculty"}>
							<TextField
								className={classes.field}
								onChange={(e) => onChange(e)}
								label="Employee Id"
								variant="outlined"
								fullWidth
								type="text"
								name="empId"
								value={user.empId}
								size="small"
								required
							/>
							<FormControl
								variant="outlined"
								className={classes.field}
								size="small"
							>
								<InputLabel htmlFor="branch">Branch</InputLabel>
								<Select
									native
									value={user.branch}
									onChange={onChange}
									variant="outlined"
									required
									fullWidth
									labelWidth={70}
									inputProps={{
										name: "branch",
										id: "branch",
									}}
								>
									{user.branch === undefined && (
										<option aria-label="None" value="" />
									)}
									<option value={"CSE"}>CSE</option>
									<option value={"IT"}>IT</option>
									<option value={"EEE"}>EEE</option>
									<option value={"ECE"}>ECE</option>
									<option value={"CE"}>CE</option>
									<option value={"MECH"}>MECH</option>
									<option value={"PET"}>PET</option>
								</Select>
							</FormControl>
						</ShowWithAnimation>
						<ShowWithAnimation isMounted={loggedUser.designation === "Hod"}>
							<TextField
								className={classes.field}
								onChange={(e) => onChange(e)}
								label="Employee Id"
								variant="outlined"
								fullWidth
								type="text"
								name="empId"
								value={user.empId}
								size="small"
							/>
							<FormControl
								variant="outlined"
								className={classes.field}
								size="small"
							>
								<InputLabel htmlFor="branch">Branch</InputLabel>
								<Select
									native
									value={user.branch}
									onChange={onChange}
									variant="outlined"
									required
									fullWidth
									labelWidth={70}
									inputProps={{
										name: "branch",
										id: "branch",
									}}
								>
									{user.branch === undefined && (
										<option aria-label="None" value="" />
									)}
									<option value={"CSE"}>CSE</option>
									<option value={"IT"}>IT</option>
									<option value={"EEE"}>EEE</option>
									<option value={"ECE"}>ECE</option>
									<option value={"CE"}>CE</option>
									<option value={"MECH"}>MECH</option>
									<option value={"PET"}>PET</option>
								</Select>
							</FormControl>
						</ShowWithAnimation>
						<ShowWithAnimation
							isMounted={loggedUser.designation === "Principal"}
						>
							<TextField
								className={classes.field}
								onChange={(e) => onChange(e)}
								label="Employee Id"
								variant="outlined"
								fullWidth
								type="text"
								name="empId"
								value={user.empId}
								size="small"
							/>
						</ShowWithAnimation>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							endIcon={<KeyboardArrowRightIcon />}
							disabled={isFormFilled === false}
						>
							Submit
						</Button>
					</form>
				</>
			) : (
				<Typography variant="h6" align="center">
					Please Login...
				</Typography>
			)}
			{/* {error ? (
						<Typography variant="h5" align="center">{error}</Typography>
				) : null} */}
		</Container>
	);
}
