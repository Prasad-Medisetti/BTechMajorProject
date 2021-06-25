import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../configs/axios";

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

export default function Edit(props) {
	const classes = useStyles();
	const history = useHistory();
	// const params = useParams();
	const [titleError, setTitleError] = useState(false);
	const [detailsError, setDetailsError] = useState(false);

	const [note, setNote] = useState({
		title: "",
		details: "",
		category: "monney",
	});

	// useEffect(() => {
	// 	const _id = params.id;
	// 	console.log(params.id);
	// 	fetch(uri + _id)
	// 		.then((res) => res.json())
	// 		.then((data) => setNote(data))
	// 		.catch((error) => console.log(error));
	// }, [params.id]);

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
			axios
				.post("/api/notes", note)
				.then((res) => {
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
		}
	};

	return (
		<Container maxWidth="sm">
			<Typography
				variant="h6"
				color="textSecondary"
				component="h2"
				align="center"
				gutterBottom
			>
				Create a New Post
			</Typography>

			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<TextField
					className={classes.field}
					onChange={(e) => onChange(e)}
					label="Post Title"
					variant="outlined"
					color="secondary"
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
					label="Post Details"
					variant="outlined"
					color="secondary"
					multiline
					rows={6}
					fullWidth
					name="details"
					value={note.details}
					size="small"
					required
					error={detailsError}
				/>

				<div className={classes.field}>
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
							control={<Radio size="small" />}
							label="Money"
						/>
						<FormControlLabel
							value="todos"
							control={<Radio size="small" />}
							label="Todos"
						/>
						<FormControlLabel
							value="reminders"
							control={<Radio size="small" />}
							label="Reminders"
						/>
						<FormControlLabel
							value="work"
							control={<Radio size="small" />}
							label="Work"
						/>
					</RadioGroup>
				</div>

				<Button
					type="submit"
					color="secondary"
					variant="contained"
					endIcon={<KeyboardArrowRightIcon />}
				>
					Submit
				</Button>
			</form>
		</Container>
	);
}
