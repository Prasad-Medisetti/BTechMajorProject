import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles({
	field: {
		marginTop: 20,
		marginBottom: 20,
		display: "block",
	},
});

const uri = "http://localhost:4000/notes/";
// const uri =
// 	"mongodb+srv://Admin:Admin@cluster0.7gwdx.mongodb.net/online-notice-board?retryWrites=true&w=majority";

export default function Edit() {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	const [titleError, setTitleError] = useState(false);
	const [detailsError, setDetailsError] = useState(false);

	const [note, setNote] = useState({
		title: "",
		details: "",
		category: "monney"
	});

	useEffect(() => {
		const _id = location.pathname.split("edit/")[1];
		fetch(uri + _id)
			.then((res) => res.json())
			.then((data) => setNote(data))
			.catch((error) =>
				console.log(error)
			);
	}, []);

	const onChange = (e) => {
		const value = e.target.value;
		setNote({
			...note,
			[e.target.name]: value
		});
	}

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
			fetch("http://localhost:4000/notes/" + note._id, {
				method: "PUT",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ ...note }),
			}).then(() => history.push("/"));
		}
	};

	return (
		<Container maxwidth="lg">
			<Typography
				variant="h6"
				color="textSecondary"
				component="h2"
				gutterBottom
			>
				Edit a Note
			</ Typography >

			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<TextField
					className={classes.field}
					onChange={(e) => onChange(e)}
					label="Note Title"
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
					label="Details"
					variant="outlined"
					color="secondary"
					multiline
					rows={4}
					fullWidth
					name="details"
					value={note.details}
					required
					error={detailsError}
				/>

				<FormControl className={classes.field}>
					<FormLabel>Note Category</FormLabel>
					<RadioGroup
						name="category"
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
				</FormControl>

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
