import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";

export default function HomePage({ classes, menuItems }) {
	const initialState = { isloaded: false, users: [] };

	const [isLoaded, setIsLoaded] = useState(initialState.isLoaded);
	const [users, setUsers] = useState(initialState.users);

	const fetchData = async () => {
		const response = await fetch(`https://api.github.com/users`);
		const data = await response.json();
		if (!response.ok) {
			const message = `An error has occured: ${response.status}`;
			throw new Error(message);
		} else {
			setUsers([...data]);
			return data;
		}
	};

	useEffect(() => {
		setIsLoaded(false);
		fetchData();
		setIsLoaded(true);
	}, []);

	return (
		<>
			<main className={classes.main}>
				{users.length > 0 && isLoaded === true ? (
					users.map((user) => {
						return (
							<div
								key={user.id}
								style={{
									display: "flex",
									flexWrap: "wrap",
									margin: ".5rem",
									textAlign: "center",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<h2>
									<code>{user.login}</code>
								</h2>
								<img
									src={user.avatar_url}
									loading="lazy"
									style={{ width: "240px", borderRadius: 8 }}
									alt={user.name}
								/>
								<a
									href={user.html_url}
									onClick={(e) => {
										e.preventDefault();
										window.open(user.html_url, "_blank");
									}}
									style={{ display: "block", color: "#000", margin: "1rem" }}
								>
									Goto GitHub Profile
								</a>
							</div>
						);
					})
				) : (
					<CircularProgress
						className={classes.circularProgress}
						color="inherit"
					/>
				)}
			</main>
		</>
	);
}
