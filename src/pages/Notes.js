import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Masonry from "react-masonry-css";
import NoteCard from "../components/NoteCard";
// import axios from "axios";

const uri = "http://localhost:4000/notes/";
// const uri =
// 	"mongodb+srv://Admin:Admin@cluster0.7gwdx.mongodb.net/online-notice-board?retryWrites=true&w=majority";

export default function Notes() {

	const history = useHistory();
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		fetch(uri)
			.then((res) => res.json())
			.then((data) => setNotes(data))
			.catch((error) =>
				console.log(error)
			);

	}, []);

	const handleDelete = async (_id) => {
		// console.log(_id);
		await fetch(uri + _id, {
			method: "DELETE",
		});
		const newNotes = notes.filter((note) => note._id !== _id);
		setNotes(newNotes);
	};

	const handleEdit = async (_id) => {
		history.push('/create/' + _id);
	};

	const breakpoints = {
		default: 3,
		1100: 2,
		768: 1,
		// 500: 1,
	};

	return (
		<Container>
			<Masonry
				breakpointCols={breakpoints}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{notes.map((note) => (
					<div key={note._id}>
						<NoteCard note={note} handleEdit={handleEdit} handleDelete={handleDelete} />
					</div>
				))}
			</Masonry>
		</Container>
	);
}
