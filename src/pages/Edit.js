import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
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

// const uri =
// 	"mongodb+srv://Admin:Admin@cluster0.7gwdx.mongodb.net/online-notice-board?retryWrites=true&w=majority";

export default function Edit(props) {
	const classes = useStyles();
	const history = useHistory();
	const params = useParams();
	const [titleError, setTitleError] = useState(false);
	const [detailsError, setDetailsError] = useState(false);

	const [note, setNote] = useState({
		title: "",
		details: "",
		category: "monney",
	});

	useEffect(() => {
		const _id = params.id;
		console.log(params.id);
		axios.get('/api/notes/' + _id)
			.then((res) => setNote(res.data))
			.catch((error) => console.log(error));
	}, [params.id]);

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
		 	let {_id,date,__v, ...newNote} = note
			axios.patch("/api/notes/"+_id,newNote )
		 		.then(() => history.push("/dashboard")).catch((error) => {
	        if (error.response) {
	          // client received an error response (5xx, 4xx)
	          console.log("error.response.data", error.response.data);
	          console.log("error.response.status", error.response.status);
	          console.log("error.response.headers", error.response.headers);

	          history.push("/dashboard")
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
	}

	return (
		<Container maxWidth="sm">
			<Typography
				variant="h6"
				color="textSecondary"
				component="h2"
				gutterBottom
			>
				Edit Post
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
					>
						<FormControlLabel value="money" control={<Radio />} label="Money" />
						<FormControlLabel value="todos" control={<Radio />} label="Todos" />
						<FormControlLabel
							value="reminders"
							control={<Radio />}
							label="Reminders"
						/>
						<FormControlLabel value="work" control={<Radio />} label="Work" />
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
