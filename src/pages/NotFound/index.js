import Button from "@material-ui/core/Button";
import grey from "@material-ui/core/colors/grey";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useHistory } from "react-router";
import NotFoundImg from "../../assets/images/undraw_page_not_found_su7k.svg";

export default function NotFound(props) {
	const history = useHistory();
	const { classes } = props;

	// useScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.1.1/gsap.min.js')

	return (
		<>
			<main className={classes.main}>
				<Container>
					<Grid container justify="center">
						<img
							alt="NotFound"
							style={{ width: "70vw", marginBottom: "1em" }}
							src={NotFoundImg}
						/>
					</Grid>
					<Typography
						variant="h4"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						Page not found :(
					</Typography>
					<Typography
						align="center"
						gutterBottom
						color="textSecondary"
						paragraph
					>
						The page you are looking for does not exist. But you can click the
						button below to go back to the homepage.
					</Typography>
					<Grid container justify="center">
						<Grid item>
							<Button
								size="large"
								variant="outlined"
								style={{
									backgroundColor: "#37474f",
									color: grey[100],
								}}
								onClick={() => {
									history.push("/");
								}}
							>
								Go home
							</Button>
						</Grid>
					</Grid>
				</Container>
			</main>
		</>
	);
}
