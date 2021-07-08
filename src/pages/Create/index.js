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
import { formatSizeUnits } from "../../utils";

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
	const [titleError, setTitleError] = useState(false);
	const [detailsError, setDetailsError] = useState(false);
	const [selectedFiles, setSelectedFiles] = useState(undefined);
	// const [progressInfos, setProgressInfos] = useState({ val: [] });
	// const [message, setMessage] = useState([]);
	// const [fileInfos, setFileInfos] = useState([]);

	const [note, setNote] = useState({
		title: "",
		details: "",
		postedBy: {},
	});

  const [urlList, setUrlList] = useState([{ title: "", url: "" }]);

	const [isPrivate, setIsPrivate] = useState(false);

	const [access, setAccess] = useState({
		student: false,
		faculty: false,
		hod: false,
	});

	const isPrivateChange = (event) => {
		setIsPrivate(!isPrivate);
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
		if (isPrivate===false) {
			setAccess({
				student: false,
				faculty: false,
				hod: false,
			})
		}
	}, [isPrivate]);

	// useEffect(() => {
	// 	const _id = params.id;
	// 	console.log(params.id);
	// 	fetch(uri + _id)
	// 		.then((res) => res.json())
	// 		.then((data) => setNote(data))
	// 		.catch((error) => console.log(error));
	// }, [params.id]);

	// const selectFiles = (event) => {
	// 	setSelectedFiles(event.target.files);
	// };


	// useEffect(() => {
	// 	if (selectedFiles !== undefined) {
	// 		Array.from(selectedFiles).forEach((file) => {
	// 			console.log(file.name);
	// 			console.log(formatSizeUnits(file.size));
	// 		});
	// 	}
	// }, [selectedFiles]);

	const onChange = (e) => {
		const value = e.target.value;
		setNote({
			...note,
			[e.target.name]: value,
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
			let newNote = { ...note,urlList, isPrivate, access, postedBy: { ...loggedUser }};
			axios
				.post("/api/notes", newNote)
				.then((res) => {
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
					<List dense style={{display: 'flex', flexDirection: "column",alignItems: "center",alignContent: "center"}}>
					{urlList.map((item, i) => {
						return (
							<>
								<ListItem key="i" disableGutters style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-evenly'}}>
									<ListItemIcon style={{ minWidth: "2.8rem" }}>
										<span className="material-icons-outlined">link</span>
									</ListItemIcon>
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
								<ListItem disableGutters>
									{urlList.length - 1 === i && (
										<Button
										variant="outlined"
											fullWidth
											startIcon={<span className="material-icons-outlined">add_link</span>}
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
				{/* <Box className={classes.field} boxShadow={0}>
					<input
						type="file"
						multiple
						onChange={selectFiles}
						style={{ display: "none" }}
						id="chooseFiles"
					/>
					{selectedFiles && (
						<List dense>
							{Array.from(selectedFiles).map((file) => (
								<ListItem>
									<ListItemIcon className={classes.listIcon}>
										<span className="material-icons">insert_drive_file</span>
									</ListItemIcon>
									<ListItemText
										primary={file.name}
										secondary={formatSizeUnits(file.size)}
									/>
									<ListItemSecondaryAction>
										<IconButton edge="end" aria-label="clear">
											<span className="material-icons">clear</span>
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							))}
						</List>
					)}
					<label htmlFor="chooseFiles">
						<Button
							variant="outlined"
							fullWidth
							component="span"
							startIcon={<span className="material-icons">attach_file</span>}
						>
							Choose Files
						</Button>
					</label>
				</Box> */}

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
