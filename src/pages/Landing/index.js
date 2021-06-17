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
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { useHistory } from "react-router";
import emailUpdates from "../../assets/images/undraw_Mailbox_re_dvds.svg";
import clgUpdates from "../../assets/images/undraw_Online_information_re_erks.svg";
import auth from "../../assets/images/undraw_secure_login_pdn4.svg";
import privacy from "../../assets/images/undraw_security_o890.svg";
import branchUpdates from "../../assets/images/undraw_Work_chat_re_qes4.svg";
import { LOGO_TEXT } from "../../constants";
import { titleCase } from "../../utils";
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
						What is {titleCase(LOGO_TEXT)} ?
					</Typography>
					<Typography
						className={styles.landing_hero_section__para}
						align="center"
					>
						{titleCase(LOGO_TEXT)} is a web application which is to provide up
						to date notices & other information for all the users or students
						associated with particular campus or department.
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
								color: grey[100],
							}}
							onClick={() => {
								history.push("/signup");
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
						{titleCase(LOGO_TEXT)} offers the following features...
					</Typography>
					<Grid
						container
						spacing={3}
						direction="row"
						justify="center"
						alignItems="center"
						alignContent="center"
						wrap="wrap"
					>
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
							<Grid item sm>
								<Card
									variant="elevation"
									style={{ minWidth: "232px", textAlign: "center" }}
								>
									<CardActionArea>
										<CardMedia
											component="img"
											alt="Contemplative Reptile"
											image={clgUpdates}
											style={{
												height: "160px",
												objectFit: "contain",
												marginTop: "1rem",
											}}
											title="Contemplative Reptile"
										/>
										<CardContent
											style={{
												fontSize: "1.25rem",
												margin: "auto .5rem",
											}}
										>
											<Typography
												gutterBottom
												variant="h5"
												component="h6"
												style={{
													fontSize: "1.25rem",
													margin: ".5rem auto .5rem",
												}}
											>
												College Updates
											</Typography>
											<Typography
												variant="body2"
												style={{
													hyphens: "auto",
													minHeight: "4.8rem",
												}}
											>
												The updates from the college related to exams, fee
												payments, workshop registrations, college fests, etc ...
												will be displayed in the respective user's dashboard.
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
							<Grid item sm>
								<Card
									variant="elevation"
									style={{ minWidth: "232px", textAlign: "center" }}
								>
									<CardActionArea>
										<CardMedia
											component="img"
											alt="Contemplative Reptile"
											image={branchUpdates}
											style={{
												height: "180px",
												objectFit: "contain",
												marginTop: "1rem",
											}}
											title="Contemplative Reptile"
										/>
										<CardContent
											style={{
												fontSize: "1.25rem",
												margin: "auto .5rem",
											}}
										>
											<Typography
												gutterBottom
												variant="h5"
												component="h6"
												style={{
													fontSize: "1.25rem",
													margin: ".5rem auto .5rem",
												}}
											>
												Branch Wise Updates
											</Typography>
											<Typography
												variant="body2"
												className={styles.branchUpdates}
												style={{
													hyphens: "auto",
													minHeight: "4rem",
												}}
											>
												Sending branch-wise updates to every user who belongs to
												the respective branch.
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
							<Grid item sm>
								<Card
									variant="elevation"
									style={{ minWidth: "232px", textAlign: "center" }}
								>
									<CardActionArea>
										<CardMedia
											component="img"
											alt="Contemplative Reptile"
											image={emailUpdates}
											style={{
												height: "160px",
												objectFit: "contain",
												marginTop: "1rem",
											}}
											title="Contemplative Reptile"
										/>
										<CardContent
											style={{
												fontSize: "1.25rem",
												margin: "auto .5rem",
											}}
										>
											<Typography
												gutterBottom
												variant="h5"
												component="h6"
												style={{
													fontSize: "1.25rem",
													margin: ".5rem auto .5rem",
												}}
											>
												Email Alerts
											</Typography>
											<Typography
												variant="body2"
												style={{
													hyphens: "auto",
													minHeight: "4.8rem",
												}}
											>
												Users will receive email alerts if any new updates are
												posted on the website.
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
							<Grid item sm>
								<Card
									variant="elevation"
									style={{ minWidth: "232px", textAlign: "center" }}
								>
									<CardActionArea>
										<CardMedia
											component="img"
											alt="Contemplative Reptile"
											image={auth}
											style={{
												height: "160px",
												objectFit: "contain",
												marginTop: "1rem",
											}}
											title="Contemplative Reptile"
										/>
										<CardContent
											style={{
												fontSize: "1.25rem",
												margin: "auto .5rem",
											}}
										>
											<Typography
												gutterBottom
												variant="h5"
												component="h6"
												style={{
													fontSize: "1.25rem",
													margin: ".5rem auto .5rem",
												}}
											>
												Authentication
											</Typography>
											<Typography
												variant="body2"
												style={{
													hyphens: "auto",
													minHeight: "4.8rem",
												}}
											>
												Only authorized users are allowed to log in and access
												the updates to which they are authorized.
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						</Grid>
						<Grid
							container
							item
							direction="column"
							justify="center"
							alignItems="center"
							alignContent="center"
							wrap="wrap"
							sm={6}
						>
							<Grid item sm>
								<Card
									variant="elevation"
									style={{ minWidth: "232px", textAlign: "center" }}
								>
									<CardActionArea>
										<CardMedia
											component="img"
											alt="Contemplative Reptile"
											image={privacy}
											style={{
												height: "160px",
												objectFit: "contain",
												marginTop: "1rem",
											}}
											title="Contemplative Reptile"
										/>
										<CardContent
											style={{
												fontSize: "1.25rem",
												margin: "auto .5rem",
											}}
										>
											<Typography
												gutterBottom
												variant="h5"
												component="h6"
												style={{
													fontSize: "1.25rem",
													margin: ".5rem auto .5rem",
												}}
											>
												Privacy
											</Typography>
											<Typography
												variant="body2"
												style={{
													hyphens: "auto",
													minHeight: "4.8rem",
												}}
											>
												The updates between the HOD and Staff, HOD to HOD will
												be protected from access by other users like students or
												faculties.
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
