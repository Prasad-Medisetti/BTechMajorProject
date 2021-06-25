import { CircularProgress, Grid, Paper, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import axios from "../configs/axios";

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
	block: {
		margin: ".5rem auto",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "78vh",
	},
}));

export default function Notes() {
	const classes = useStyles();
	const history = useHistory();
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [notes, setNotes] = useState([]);

	const fetchPosts = () => {
		axios
			.get("/api/notes")
			.then((res) => {
				if (Array.isArray(res.data)) {
					setError(null);
					setNotes(res.data);
				} else {
					setError(res.data);
					setNotes([]);
				}
			})
			.catch((error) => {
				if (error.response) {
					// client received an error response (5xx, 4xx)
					console.log("error.response.data", error.response.data);
					console.log("error.response.status", error.response.status);
					console.log("error.response.headers", error.response.headers);
				} else if (error.request) {
					// client never received a response, or request never left
					console.log("error.request", error.request);
				} else {
					// anything else
					console.log("Error", error.message);

					console.log("error.request", error.config);
				}
			});
	};

	useEffect(() => {
		setLoading(true);
		setError(null);
		fetchPosts();
		setLoading(false);
	}, [setError, setLoading]);

	const handleDelete = async (_id) => {
		axios.delete("/api/notes/" + _id);
		const newNotes = notes.filter((note) => note._id !== _id);
		setNotes(newNotes);
	};

	const handleEdit = async (_id) => {
		history.replace("/dashboard/edit/" + _id);
	};

	return (
		<>
			<Container maxWidth="md">
				{isLoading ? (
					<div className={classes.block}>
						<CircularProgress color="inherit" />
					</div>
				) : null}
				{!isLoading && notes.length > 0 ? (
					<Grid container spacing={3}>
						{notes.map((note) => (
							<Grid item xs={12} key={note._id}>
								<NoteCard
									note={note}
									handleEdit={handleEdit}
									handleDelete={handleDelete}
								/>
							</Grid>
						))}
					</Grid>
				) : null}
				{error ? (
					<Paper variant="elevation" elevation={2} className={classes.block}>
						<Typography>{error}</Typography>
					</Paper>
				) : null}
			</Container>
		</>
	);
}
