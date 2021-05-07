import React, { useEffect, useState } from "react";

export default function Home() {
	const [isLoaded, setIsLoaded] = useState(true);
	const [users, setUsers] = useState({});
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
		return;
	}, []);

	return (
		<>
			{isLoaded && (
				<div className="lds-spinner">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			)}
			{!isLoaded && Array.isArray(users) && (
				<div>
					{users.map((user) => (
						<p key={user.id}>{user.login}</p>
					))}
				</div>
			)}
		</>
	);
}
