import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Container,
	Icon,
	Typography,
} from "@material-ui/core";
import black from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { useHistory } from "react-router";
import clgUpdates from "../../assets/images/undraw_Online_information_re_erks.svg";
import emailUpdates from "../../assets/images/undraw_Personal_text_re_vqj3.svg";
import auth from "../../assets/images/undraw_secure_login_pdn4.svg";
import privacy from "../../assets/images/undraw_security_o890.svg";
import styles from "./Landing.module.css";

export default function HomePage({ classes }) {
	const history = useHistory();
	return (
		<>
			<main className={classes.main}>
				{/*hero header*/}
				<Container maxWidth="md" className={styles.landing_hero_section}>
					<Typography
						variant="h1"
						align="center"
						className={styles.landing_hero_section__heading1}
					>
						What is Online Notice Board?
					</Typography>
					<Typography
						className={styles.landing_hero_section__para}
						align="center"
					>
						{
							"Online Notice Board is a web application which is to provide up to date notices & other information for all the users or students associated with particular campus or department."
						}
					</Typography>
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
						alignContent="center"
						wrap="nowrap"
					>
						<Button
							size="large"
							variant="outlined"
							color="inherit"
							style={{
								backgroundColor: "#37474f",
								color: black[100],
							}}
							onClick={() => {
								history.replace("signup");
							}}
							endIcon={<Icon>arrow_forward</Icon>}
						>
							Get Started Now
						</Button>
					</Grid>
				</Container>
				<Container maxWidth="md" className={styles.landing_features_section}>
					<Typography
						variant="h1"
						align="center"
						className={styles.landing_features_section__heading1}
					>
						Online Notice Board offers the following features...
					</Typography>
					<Grid
						container
						spacing={2}
						direction="row"
						justify="center"
						alignItems="center"
						alignContent="center"
						wrap="wrap"
					>
						<Grid
							container
							item
							spacing={2}
							direction="row"
							justify="center"
							alignItems="center"
							alignContent="center"
							wrap="wrap"
						>
							<Grid item xs>
								<Card variant="outlined" style={{ minWidth: "232px" }}>
									<CardActionArea>
										<CardMedia
											component="img"
											alt="Contemplative Reptile"
											image={clgUpdates}
											style={{
												height: "160px",
												objectFit: "contain",
											}}
											title="Contemplative Reptile"
										/>
										<CardContent>
											<Typography gutterBottom variant="h5" component="h2">
												College Updates
											</Typography>
											<Typography
												variant="body1"
												align="justify"
												style={{
													hyphens: "auto",
												}}
											>
												Lorem ipsum dolor sit amet consectetur adipisicing elit.
												Nemo inventore explicabo magni exercitationem
												consectetur, quasi, fuga ducimus tempora iusto possimus
												voluptate. Recusandae minus, iste laboriosam minima
												consectetur nostrum itaque sit!
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
							<Grid item xs>
								<Card variant="outlined" style={{ minWidth: "232px" }}>
									<CardActionArea>
										<CardMedia
											component="img"
											alt="Contemplative Reptile"
											image={emailUpdates}
											style={{
												height: "200px",
												objectFit: "contain",
											}}
											title="Contemplative Reptile"
										/>
										<CardContent>
											<Typography gutterBottom variant="h5" component="h2">
												Email Updates
											</Typography>
											<Typography
												variant="body1"
												align="justify"
												style={{
													hyphens: "auto",
												}}
											>
												Lorem ipsum dolor sit amet consectetur adipisicing elit.
												Nemo inventore explicabo magni exercitationem
												consectetur, quasi, fuga ducimus tempora iusto possimus
												voluptate. Recusandae minus, iste laboriosam minima
												consectetur nostrum itaque sit!
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						</Grid>
						<Grid
							container
							item
							spacing={3}
							direction="row"
							justify="center"
							alignItems="center"
							alignContent="center"
							wrap="wrap"
						>
							<Grid item xs>
								<Card variant="outlined" style={{ minWidth: "232px" }}>
									<CardActionArea>
										<CardMedia
											component="img"
											alt="Contemplative Reptile"
											image={auth}
											style={{
												height: "200px",
												objectFit: "contain",
											}}
											title="Contemplative Reptile"
										/>
										<CardContent>
											<Typography gutterBottom variant="h5" component="h2">
												Secure Login
											</Typography>
											<Typography
												variant="body1"
												align="justify"
												style={{
													hyphens: "auto",
												}}
											>
												Lorem ipsum dolor sit amet consectetur adipisicing elit.
												Nemo inventore explicabo magni exercitationem
												consectetur, quasi, fuga ducimus tempora iusto possimus
												voluptate. Recusandae minus, iste laboriosam minima
												consectetur nostrum itaque sit!
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
							<Grid item xs>
								<Card variant="outlined" style={{ minWidth: "232px" }}>
									<CardActionArea>
										<CardMedia
											component="img"
											alt="Contemplative Reptile"
											image={privacy}
											style={{
												height: "200px",
												objectFit: "contain",
											}}
											title="Contemplative Reptile"
										/>
										<CardContent>
											<Typography gutterBottom variant="h5" component="h2">
												Privacy
											</Typography>
											<Typography
												variant="body1"
												align="justify"
												style={{
													hyphens: "auto",
												}}
											>
												Lorem ipsum dolor sit amet consectetur adipisicing elit.
												Nemo inventore explicabo magni exercitationem
												consectetur, quasi, fuga ducimus tempora iusto possimus
												voluptate. Recusandae minus, iste laboriosam minima
												consectetur nostrum itaque sit!
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</main>
		</>
	);
}
