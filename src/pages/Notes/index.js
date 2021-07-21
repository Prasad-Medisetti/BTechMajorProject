import { Grid, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading";
import NoteCard from "../../components/NoteCard";
import axios from "../../configs/axios";

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

export default function Notes({ toast, loggedUser }) {
	const classes = useStyles();
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		setError(null);
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
					setError(error.response.data);
					toast.handleToastClick({
						toastOpen: true,
						toastMessage: error.response.data.error,
						toastVariant: "standard",
						toastColor: "error",
					});
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

	const handleDelete = async (note) => {
		// console.log(loggedUser._id, note.postedBy._id)
		if (loggedUser._id !== note.postedBy._id) {
			toast.handleToastClick({
				toastOpen: true,
				toastMessage: "You cannot delete other users posts...",
				toastVariant: "standard",
				toastColor: "warning",
			});
			return;
		}
		axios
			.delete("/api/notes/" + note._id)
			.then((res) => {
				console.log(res);
				toast.handleToastClick({
					toastOpen: true,
					toastMessage: "Successfully deleled!",
					toastVariant: "standard",
					toastColor: "success",
				});
				const newNotes = notes.filter((item) => note._id !== item._id);
				setNotes(newNotes);
			})
			.catch((error) => {
				if (error.response) {
					// client received an error response (5xx, 4xx)
					console.log("error.response.data", error.response.data);
					console.log("error.response.status", error.response.status);
					console.log("error.response.headers", error.response.headers);
					setError(error.response.data);
					toast.handleToastClick({
						toastOpen: true,
						toastMessage: error.response.data.message,
						toastVariant: "standard",
						toastColor: "error",
					});
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

	const handleEdit = async (note) => {
		// console.log(loggedUser._id, note.postedBy._id)
		if (loggedUser._id !== note.postedBy._id) {
			toast.handleToastClick({
				toastOpen: true,
				toastMessage: "You cannot edit other users posts...",
				toastVariant: "standard",
				toastColor: "warning",
			});
			return;
		}
		history.replace("/dashboard/edit/" + note._id);
	};

	return (
		<>
			<Container>
				{isLoading ? <Loading isLoading={isLoading} /> : null}
				{isLoading === false && notes.length > 0 ? (
					<Grid container spacing={2}>
						{notes.map((note) => (
							<Grid item xs={12} key={note._id}>
								<NoteCard
									loggedUser={loggedUser}
									note={note}
									handleEdit={handleEdit}
									handleDelete={handleDelete}
								/>
							</Grid>
						))}
					</Grid>
				) : (
					<Typography variant="subtitle1" align="center">
						There are no posts...
					</Typography>
				)}
				{!isLoading && error ? (
					<Typography variant="subtitle1" align="center">
						{error}
					</Typography>
				) : null}
			</Container>
		</>
	);
}
