import {
	Box,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	makeStyles,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import SwitchBox from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
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
	formGroup: { marginLeft: "1rem", marginTop: ".5rem" },
	listIcon: {
		minWidth: "2.8em",
	},
});

// const uri =
// 	"mongodb+srv://Admin:Admin@cluster0.7gwdx.mongodb.net/online-notice-board?retryWrites=true&w=majority";

export default function Edit({ toast, loggedUser }) {
	const classes = useStyles();
	const history = useHistory();
	const params = useParams();
	const [titleError, setTitleError] = useState(false);
	const [detailsError, setDetailsError] = useState(false);

	const [note, setNote] = useState({
		title: "",
		details: "",
		postedBy: {},
	});
	const [isPrivate, setIsPrivate] = useState(false);
	const [sendEmailAlerts, setSendEmailAlerts] = useState(false);
	const [access, setAccess] = useState({
		student: false,
		faculty: false,
		hod: false,
	});
	const [urlList, setUrlList] = useState([{ title: "", url: "" }]);

	const isPrivateChange = (event) => {
		setIsPrivate(!isPrivate);
		// console.log(event.target.name, event.target.checked);
	};

	const isAccessChange = (event) => {
		setAccess({ ...access, [event.target.name]: event.target.checked });
		// console.log(event.target.name, event.target.checked);
	};

	const toggleSendEmailAlerts = (event) => {
		setSendEmailAlerts(!sendEmailAlerts);
		// console.log(event.target.name, event.target.checked);
	};

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (isPrivate === false) {
			setAccess({
				student: false,
				faculty: false,
				hod: false,
			});
		}
	}, [isPrivate]);

	// URL handles
	// handle url input change
	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...urlList];
		list[index][name] = value;
		setUrlList(list);
	};

	// handle url click event of the Remove button
	const handleRemoveClick = (index) => {
		const list = [...urlList];
		list.splice(index, 1);
		setUrlList(list);
	};

	// handle url click event of the Add button
	const handleAddClick = () => {
		setUrlList([...urlList, { title: "", url: "" }]);
	};

	// Fetch a note specific id to id
	useEffect(() => {
		setIsLoading(true);
		setError(null);
		const _id = params.id;
		axios
			.get("/api/notes/" + _id)
			.then((res) => {
				if (res.data == null) {
				}
				setError(null);
				setNote(res.data);
				setAccess(res.data.access);
				setUrlList(res.data.urlList);
				if (res.data.urlList.length === 0) setUrlList([{ title: "", url: "" }]);
				setIsPrivate(res.data.isPrivate);
				if (Object.keys(res.data).length > 0) {
					setError(null);
					setNote(res.data);
				} else {
					setError(res.data);
					setNote({});
				}
			})
			.catch((error) => {
				if (error.response) {
					// client received an error response (5xx, 4xx)
					console.log("error.response.data", error.response.data);
					console.log("error.response.status", error.response.status);
					console.log("error.response.headers", error.response.headers);
					setNote({});
					setError(error.response.data);
					if (error.response.status === 401) {
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

		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}, []);

	const onChange = (e) => {
		const value = e.target.value;
		setNote({
			...note,
			[e.target.name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (note.title === "") {
			setTitleError(true);
		}
		if (note.details === "") {
			setDetailsError(true);
		}
		if (note.title && note.details) {
			setIsLoading(true);
			let { _id, date, createdAt, updatedAt, __v, ...newNote } = {
				...note,
				urlList,
				isPrivate,
				access,
				postedBy: { ...loggedUser },
			};
			// console.log(newNote);

			axios
				.patch("/api/notes/" + _id, newNote)
				.then((res) => {
					// console.log(res)
					history.push("/dashboard");
				})
				.catch((error) => {
					if (error.response) {
						// client received an error response (5xx, 4xx)
						console.log("error.response.data", error.response.data);
						console.log("error.response.status", error.response.status);
						console.log("error.response.headers", error.response.headers);

						history.push("/dashboard");
					} else if (error.request) {
						// client never received a response, or request never left
						console.log("error.request", error.request);
					} else {
						// anything else
						console.log("Error", error.message);
						console.log("error.request", error.config);
					}
				});

			setTimeout(() => {
				setIsLoading(false);
			}, 3000);
		}
	};

	return (
		<Container maxWidth="sm">
			{isLoading ? <Loading isLoading={isLoading} /> : null}
			{!isLoading && note && Object.keys(note).length > 0 ? (
				<>
					<Typography
						variant="h5"
						color="textPrimary"
						align="center"
						gutterBottom
					>
						Edit Post
					</Typography>

					<form noValidate autoComplete="off" onSubmit={handleSubmit}>
						<TextField
							className={classes.field}
							onChange={(e) => onChange(e)}
							label="Title"
							variant="outlined"
							color="primary"
							fullWidth
							name="title"
							value={note.title}
							required
							error={titleError}
							size="small"
						/>
						<TextField
							className={classes.field}
							onChange={(e) => onChange(e)}
							label="Details"
							variant="outlined"
							color="primary"
							multiline
							rows={6}
							fullWidth
							name="details"
							value={note.details}
							size="small"
							required
							error={detailsError}
						/>

						{
							<List
								dense
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									alignContent: "center",
								}}
							>
								{urlList.map((item, i) => {
									return (
										<>
											<ListItem
												key={i}
												disableGutters
												style={{
													display: "flex",
													flexDirection: "row",
													justifyContent: "space-evenly",
												}}
											>
												<Box width="100%">
													<Box my={1} mx="auto">
														<TextField
															name="title"
															size="small"
															fullWidth
															variant="outlined"
															label="Example"
															value={item.title}
															onChange={(e) => handleInputChange(e, i)}
														/>
													</Box>
													<Box my={1} mx="auto">
														<TextField
															name="url"
															size="small"
															fullWidth
															variant="outlined"
															label="https://example.com"
															type="url"
															value={item.url}
															onChange={(e) => handleInputChange(e, i)}
														/>
													</Box>
												</Box>
												<ShowWithAnimation isMounted={urlList.length !== 1}>
													<IconButton
														aria-label="delete"
														onClick={() => handleRemoveClick(i)}
													>
														<span className="material-icons-outlined">
															clear
														</span>
													</IconButton>
												</ShowWithAnimation>
											</ListItem>
											<ListItem disableGutters key="addlink">
												{urlList.length - 1 === i && (
													<Button
														variant="outlined"
														fullWidth
														startIcon={
															<span className="material-icons-outlined">
																add_link
															</span>
														}
														onClick={handleAddClick}
													>
														Add URL
													</Button>
												)}
											</ListItem>
										</>
									);
								})}
							</List>
						}

						<div className={classes.formGroup}>
							<div component="fieldset" className={classes.field}>
								<FormLabel component="legend">Access</FormLabel>
								<FormControlLabel
									control={
										<SwitchBox
											color="primary"
											checked={isPrivate}
											required
											onChange={isPrivateChange}
											name="isPrivate"
										/>
									}
									label={isPrivate ? "Private Only" : "Public Access"}
								/>
								<ShowWithAnimation isMounted={isPrivate}>
									<FormGroup className={classes.formGroup}>
										<FormLabel component="legend">
											Choose who can access
										</FormLabel>
										<FormControlLabel
											control={
												<Checkbox
													color="primary"
													size="small"
													checked={access.student}
													onChange={isAccessChange}
													name="student"
												/>
											}
											label="Student"
										/>
										<FormControlLabel
											control={
												<Checkbox
													color="primary"
													size="small"
													checked={access.faculty}
													onChange={isAccessChange}
													name="faculty"
												/>
											}
											label="Faculty"
										/>
										<FormControlLabel
											control={
												<Checkbox
													color="primary"
													size="small"
													checked={access.hod}
													onChange={isAccessChange}
													name="hod"
												/>
											}
											label="Hod"
										/>
									</FormGroup>
								</ShowWithAnimation>
							</div>
						</div>

						<div className={classes.formGroup}>
							<div component="fieldset" className={classes.field}>
								<FormLabel component="legend">Email Alerts</FormLabel>
								<FormControlLabel
									control={
										<SwitchBox
											color="primary"
											checked={sendEmailAlerts}
											required
											onChange={toggleSendEmailAlerts}
											name="isPrivate"
										/>
									}
									label={sendEmailAlerts ? "ON" : "OFF"}
								/>
							</div>
						</div>

						<Button
							type="submit"
							color="primary"
							variant="contained"
							endIcon={<KeyboardArrowRightIcon />}
						>
							Submit
						</Button>
					</form>
				</>
			) : null}
			{error ? (
				<Typography variant="h5" align="center">
					{error}
				</Typography>
			) : null}
		</Container>
	);
}
