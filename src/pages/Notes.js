import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Masonry from "react-masonry-css";
import NoteCard from "../components/NoteCard";
// import axios from "axios";

const uri = "http://localhost:4000/notes/";

export default function Notes() {
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		fetch(uri)
			.then((res) => res.json())
			.then((data) => setNotes(data));
	}, []);

	const handleDelete = async (_id) => {
		console.log(_id);
		await fetch("http://localhost:4000/notes/" + _id, {
			method: "DELETE",
		});
		const newNotes = notes.filter((note) => note._id !== _id);
		setNotes(newNotes);
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
						<NoteCard note={note} handleDelete={handleDelete} />
					</div>
				))}
			</Masonry>
		</Container>
	);
}
