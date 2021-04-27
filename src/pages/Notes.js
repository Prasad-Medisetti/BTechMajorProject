import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Masonry from "react-masonry-css";
import NoteCard from "../components/NoteCard";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import axios from "axios";

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));

const uri = "http://localhost:4000/note/";
// const uri =
// 	"mongodb+srv://Admin:Admin@cluster0.7gwdx.mongodb.net/online-notice-board?retryWrites=true&w=majority";

export default function Notes() {
	const classes = useStyles();
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [notes, setNotes] = useState([]);

	const [bdrop, setBdrop] = React.useState(false);

	useEffect(() => {
		setBdrop(true);
		setIsLoading(true);
		fetch(uri)
			.then((res) => res.json())
			.then((data) => {
				setNotes(data);
			})
			.catch((error) => {
				setError(error);
			});
		setIsLoading(false);
		setBdrop(false);
	}, [isLoading]);

	const handleDelete = async (_id) => {
		// console.log(_id);
		await fetch(uri + _id, {
			method: "DELETE",
		});
		const newNotes = notes.filter((note) => note._id !== _id);
		setNotes(newNotes);
	};

	const handleEdit = async (_id) => {
		history.push("/edit/" + _id);
	};

	const breakpoints = {
		default: 3,
		1100: 2,
		768: 1,
		// 500: 1,
	};

	return (
		<Container>
			{!isLoading ? (
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
			) : (
				<Backdrop className={classes.backdrop} open={bdrop}>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}
			{error ? <p>{JSON.stringify(error)}</p> : null}
		</Container>
	);
}
