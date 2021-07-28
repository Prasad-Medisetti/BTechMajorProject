import {
	Box,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	ListItemSecondaryAction,
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
import { useHistory } from "react-router-dom";
import ShowWithAnimation from "../../components/ShowWithAnimation";
import axios from "../../configs/axios";
import { openInNewTab, formatSizeUnits } from "../../utils";
import CircularProgress from "@material-ui/core/CircularProgress";
import { grey } from "@material-ui/core/colors";
import { ButtonGroup } from "@material-ui/core";
import configData from "../../configs/config";

const useStyles = makeStyles((theme) => ({
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
	wrapper: {
		position: "relative",
	},
	progress: {
		color: grey[700],
		position: "absolute",
		top: "50%",
		left: "50%",
		marginTop: -12,
		marginLeft: -12,
	},
}));

const API_URL = process.env.REACT_APP_SERVER_URL || configData.SERVER_URL;

export default function Edit({ toast, loggedUser }) {
	const classes = useStyles();
	const history = useHistory();
	// const params = useParams();
	const [titleError, setTitleError] = useState(false);
	const [detailsError, setDetailsError] = useState(false);
	const [note, setNote] = useState({
		title: "",
		details: "",
		postedBy: {},
	});
	const [file, setFile] = useState([]);
	const [uploadedFiles, setUploadedFiles] = useState(() => {
		const file = JSON.parse(localStorage.getItem("uploadedFiles"));
		if (file === null || file === "") return [];
		else return file;
	});
	const [uploadProgress, updateUploadProgress] = useState(0);
	const [uploading, setUploading] = useState();
	const [urlList, setUrlList] = useState([{ title: "", url: "" }]);
	const [isPrivate, setIsPrivate] = useState(false);
	const [sendEmailAlerts, setSendEmailAlerts] = useState(false);
	const [access, setAccess] = useState({
		student: false,
		faculty: false,
		hod: false,
	});

	useEffect(() => {
		if (uploadedFiles !== undefined) {
			Array.from(uploadedFiles).forEach((item) => {
				console.log(item.name);
				console.log(formatSizeUnits(item.size));
			});
		}
	}, [uploadedFiles]);

	const isPrivateChange = (event) => {
		setIsPrivate(!isPrivate);
		// console.log(event.target.name, event.target.checked);
	};

	const toggleSendEmailAlerts = (event) => {
		setSendEmailAlerts(!sendEmailAlerts);
		// console.log(event.target.name, event.target.checked);
	};

	const isAccessChange = (event) => {
		setAccess({ ...access, [event.target.name]: event.target.checked });
		// console.log(event.target.name, event.target.checked);
	};

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

	useEffect(() => {
		if (isPrivate === false) {
			setAccess({
				student: false,
				faculty: false,
				hod: false,
			});
		}
	}, [isPrivate]);

	const onChange = (e) => {
		const value = e.target.value;
		setNote({
			...note,
			[e.target.name]: value,
		});
	};

	const handleFileUpload = (e) => {
		e.preventDefault();
		if (file && file.length > 0) {
			setUploading(true);
			const formData = new FormData();
			let i = 0;
			while (i < file.length) {
				formData.append("file", file[i]);
				i++;
			}

			axios
				.post("api/uploads", formData, {
					onUploadProgress: (ev) => {
						// console.log(Math.round((ev.loaded / ev.total) * 100) + "%");
						const progress = (ev.loaded / ev.total) * 100;
						updateUploadProgress(Math.round(progress));
					},
				})
				.then((res) => {
					// our mocked response will always return true
					// in practice, you would want to use the actual response object
					setUploading(false);
					setUploadedFiles(res.data.files);
					localStorage.setItem("uploadedFiles", JSON.stringify(res.data.files));
					setFile([]);
					toast.handleToastClick({
						toastOpen: true,
						toastMessage: res.data.message,
						toastVariant: "standard",
						toastColor: "success",
					});
					updateUploadProgress(0);
				})
				.catch((err) => {
					toast.handleToastClick({
						toastOpen: true,
						toastMessage: err.message,
						toastVariant: "standard",
						toastColor: "error",
					});
					setUploading(false);
				});
		}
	};
	const handleFileDelete = async (file) => {
		axios
			.delete(API_URL + "/api/uploads/" + file.filename)
			.then((res) => {
				const newFiles = uploadedFiles.filter(
					(item) => item.path !== file.path,
				);

				setUploadedFiles(newFiles);
				localStorage.setItem("uploadedFiles", JSON.stringify(newFiles));
				toast.handleToastClick({
					toastOpen: true,
					toastMessage: res.data.message,
					toastVariant: "standard",
					toastColor: "success",
				});
			})
			.catch((error) => {
				toast.handleToastClick({
					toastOpen: true,
					toastMessage: error.message,
					toastVariant: "standard",
					toastColor: "error",
				});
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setTitleError(false);
		setDetailsError(false);

		if (note.title === "") {
			setTitleError(true);
		}
		if (note.details === "") {
			setDetailsError(true);
		}
		if (note.title && note.details) {
			let newNote = {
				...note,
				urlList,
				isPrivate,
				access,
				files: file,
				sendEmailAlerts,
				postedBy: { ...loggedUser },
			};
			axios
				.post("/api/notes", newNote)
				.then((res) => {
					toast.handleToastClick({
						toastOpen: true,
						toastMessage: "Successfully posted...",
						toastVariant: "standard",
						toastColor: "success",
					});
					history.push("/dashboard");
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
						} else {
							toast.handleToastClick({
								toastOpen: true,
								toastMessage: error.response.data.error,
								toastVariant: "standard",
								toastColor: "error",
							});
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
				Create a New Post
			</Typography>

			<form
				noValidate
				autoComplete="off"
				onSubmit={handleSubmit}
				encType="multipart/form-data"
			>
				<TextField
					className={classes.field}
					onChange={(e) => onChange(e)}
					label="Title"
					variant="outlined"
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
												<span className="material-icons-outlined">clear</span>
											</IconButton>
										</ShowWithAnimation>
									</ListItem>
									<ListItem disableGutters key="add-link">
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
				{/* <div className={classes.field}>
					<FormLabel>Post Category</FormLabel>
					<RadioGroup
						name="category"
						aria-label="category"
						value={note.category}
						onChange={(e) => onChange(e)}
						style={{ marginLeft: ".75rem" }}
					>
						<FormControlLabel
							value="money"
							control={<Radio color="primary" size="small" />}
							label="Money"
						/>
						<FormControlLabel
							value="todos"
							control={<Radio color="primary" size="small" />}
							label="Todos"
						/>
						<FormControlLabel
							value="reminders"
							control={<Radio color="primary" size="small" />}
							label="Reminders"
						/>
						<FormControlLabel
							value="work"
							control={<Radio color="primary" size="small" />}
							label="Work"
						/>
					</RadioGroup>
				</div> */}
				<ButtonGroup
					size="small"
					variant="outlined"
					fullWidth
					style={{
						display: "flex",
						justifyContent: "space-evenly",
						alignContent: "center",
						flexDirection: "row",
						alignItems: "center",
						border: "1px solid rgba(0, 0, 0, 0.23)",
					}}
					aria-label="small outlined button group"
				>
					<label htmlFor="icon-button-file" fullWidth>
						<Button component="span">
							{file.length !== 0
								? `${file.length} ${
										file.length === 1 ? "file" : "files"
								  } selected`
								: "Choose Files"}
						</Button>
					</label>
					<input
						id="icon-button-file"
						type="file"
						name="files"
						multiple
						style={{ display: "none" }}
						accept={[
							"image/*",
							".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
							"image/jpeg",
						].toString()}
						onChange={(e) => {
							if (e.target.files && e.target.files.length > 0) {
								setFile(e.target.files);
							}
						}}
					/>
					<div className={classes.wrapper}>
						<Button
							onClick={handleFileUpload}
							startIcon={
								<span className="material-icons-outlined">file_upload</span>
							}
							disabled={uploading || file.length === 0}
						>
							{file ? (
								"Upload"
							) : (
								<CircularProgress
									size={24}
									className={classes.progress}
									variant="determinate"
									color="inherit"
									value={uploadProgress}
								/>
							)}
						</Button>
						{uploading && (
							<CircularProgress
								size={24}
								thickness={5.4}
								className={classes.progress}
								disableShrink
								variant="determinate"
								color="inherit"
								value={uploadProgress}
							/>
						)}
					</div>
				</ButtonGroup>
				{uploadedFiles.length > 0 && (
					<List
						dense
						subheader={
							<ListSubheader component="div" id="nested-list-subheader">
								Uploaded Files
							</ListSubheader>
						}
					>
						{Array.from(uploadedFiles).map((file) => (
							<ListItem>
								<ListItemIcon className={classes.listIcon}>
									<span className="material-icons">insert_drive_file</span>
								</ListItemIcon>
								<ListItemText
									primary={file.filename}
									secondary={formatSizeUnits(file.size)}
								/>
								<ListItemSecondaryAction>
									<IconButton
										edge="end"
										aria-label="clear"
										onClick={() => openInNewTab(API_URL + "/api/" + file.path)}
									>
										<span className="material-icons-outlined">visibility</span>
									</IconButton>
									<IconButton
										edge="end"
										aria-label="clear"
										onClick={() => handleFileDelete(file)}
									>
										<span className="material-icons-outlined">delete</span>
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						))}
					</List>
				)}
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
								<FormLabel component="legend">Choose who can access</FormLabel>
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
		</Container>
	);
}
