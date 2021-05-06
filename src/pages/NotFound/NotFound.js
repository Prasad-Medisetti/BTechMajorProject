import React from "react";
import { useLocation } from "react-router";

export default function Home() {
	const location = useLocation();
	return (
		<>
			<h3>
				<code>{location.pathname} page is Not Found</code>
			</h3>
		</>
	);
}
