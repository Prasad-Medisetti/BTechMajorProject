import { CircularProgress, Paper, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { useHistory } from "react-router-dom";
import NoteCard from "../components/NoteCard";

// import axios from "axios";

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

const uri = "https://onlinenoticeboard-server.herokuapp.com/notes";

export default function Notes() {
	const classes = useStyles();
	const history = useHistory();
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [notes, setNotes] = useState([]);

	const fetchPosts = (URI) => {
		fetch(uri)
			.then((res) => res.json())
			.then((data) => {
				if (Array.isArray(data)) {
					setError(null);
					setNotes(data);
				} else {
					setError(data.error);
					setNotes([]);
				}
			})
			.catch((err) => setError(JSON.stringify(err)));
	};

	useEffect(() => {
		setLoading(true);
		setError(null);
		fetchPosts(uri);
		setLoading(false);
	}, [setError, setLoading]);

	const handleDelete = async (_id) => {
		// console.log(_id);
		await fetch(uri + _id, {
			method: "DELETE",
		});
		const newNotes = notes.filter((note) => note._id !== _id);
		setNotes(newNotes);
	};

	const handleEdit = async (_id) => {
		history.push("/dashboard/edit/" + _id);
	};

	const breakpoints = {
		default: 3,
		1100: 2,
		768: 1,
		// 500: 1,
	};

	return (
		<Container>
			{isLoading ? (
				<div className={classes.block}>
					<CircularProgress color="inherit" />
				</div>
			) : null}
			{!isLoading && notes.length > 0 ? (
				<Masonry
					breakpointCols={breakpoints}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
				>
					{notes.map((note) => (
						<div key={note._id}>
							<NoteCard
								note={note}
								handleEdit={handleEdit}
								handleDelete={handleDelete}
							/>
						</div>
					))}
				</Masonry>
			) : null}
			{error ? (
				<Paper variant="elevation" elevation={2} className={classes.block}>
					<Typography>{error}</Typography>
				</Paper>
			) : null}
		</Container>
	);
}
