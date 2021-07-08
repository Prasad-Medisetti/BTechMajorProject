import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { blue, green, pink, yellow } from "@material-ui/core/colors";
// import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { MoreVertOutlined } from "@material-ui/icons";
import { formatDistance } from "date-fns";
import React from "react";
import { titleCase } from "../utils";
import Chip from '@material-ui/core/Chip';
import {
	Box,
	Button,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
	avatar: {
		marginRight:"4px",
    width: '1.8rem',
    height: '1.8rem',
		backgroundColor: (note) => {
			if (note.postedBy.designation === "Principal") {
				return yellow[700];
			}
			if (note.postedBy.designation === "Hod") {
				return green[500];
			}
			if (note.postedBy.designation === "Faculty") {
				return pink[500];
			}
			return blue[500];
		},
	},
	small: {
    width: '1.8rem',
    height: '1.8rem',
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
	cardMenu: {
		marginRight: 8,
	},
}));

export default function NoteCard({
	loggedUser,
	note,
	handleEdit,
	handleDelete,
}) {
	const classes = useStyles(note);

	const [cardMenu, setcardMenu] = React.useState(null);

  const preventDefault = (event) => event.preventDefault();

	const showCardMenu = (event) => {
		setcardMenu(event.currentTarget);
	};

	const handleClose = () => {
		setcardMenu(null);
	};

	return (
		<>
			{note ? (
				<Card elevation={1} variant="outlined">
					<CardHeader
					style={{marginRight:'8px'}}
						avatar={
							<Avatar className={`${classes.avatar} ${classes.small}`}>
								{note.postedBy.designation[0].toUpperCase()}
							</Avatar>
						}
						action={
							loggedUser.role === "admin" ? (
								<>
									<IconButton
										aria-label="settings"
										aria-haspopup="true"
										size="small"
										onClick={showCardMenu}
										className={classes.cardMenu}
									>
										<MoreVertOutlined />
									</IconButton>
									<Menu
										id="card-menu"
										anchorEl={cardMenu}
										variant="selectedMenu"
										open={Boolean(cardMenu)}
										onClose={handleClose}
										onMouseLeave={handleClose}
									>
										<MenuItem onClick={() => handleEdit(note)}>
											<ListItemIcon>
												<span className="material-icons-outlined">
													mode_edit_outline
												</span>
											</ListItemIcon>
											<Typography variant="inherit">Edit</Typography>
										</MenuItem>
										<MenuItem onClick={() => handleDelete(note)}>
											<ListItemIcon>
												<span className="material-icons-outlined">delete</span>
											</ListItemIcon>
											<Typography  variant="inherit">Delete</Typography>
										</MenuItem>
									</Menu>
								</>
							) : undefined
						}
						title={
							<>
								<Typography variant="body2" style={{display: 'flex',alignItems: 'center', fontWeight:"600"}}>
									{titleCase(note.postedBy.firstName+" "+note.postedBy.lastName)}
									<Chip label={note.postedBy.designation} variant="outlined" size="small" style={{marginLeft:'.25rem',fontSize:'.8rem',fontWeight:"500"}}/>
								</Typography>
							</>
						}
						subheader={
							<Typography variant="caption" component="span">
								{titleCase(formatDistance(new Date(note.updatedAt), new Date(), {addSuffix: true}))}
							</Typography>
						}
					/>
					<CardContent style={{paddingTop:0,paddingBottom:'1em'}}>
						<Typography variant="subtitle1" color="textPrimary">
							{note.title}
						</Typography>
						<Typography variant="body1" color="textSecondary" paragraph>
							{note.details}
						</Typography>
						{
							note.urlList.length>0 &&
							<>
							<Box
								display="flex"
								flexWrap="wrap"
								flexDirection="row"
								justifyContent="center"
								alignItems="center"
							>
								{
									note.urlList.map((url, key)=>{
										return (
											<Box key={key}>
												<Button
													variant="text"
													color="default"
													size="small"
													component="a"
													startIcon={<span className="material-icons-outlined">link</span>}
													// href='https://google.com'
													href={url.url}
													target='_blank'
													rel="noreferrer noopener"
												>
													{url.title}
												</Button>
											</Box>
										)
									})
								}
							</Box>
							{/* <List  dense aria-label={note.title}>
								<ListItem button>
									<ListItemIcon>
									</ListItemIcon>
									<ListItemText primary="Drafts" />
								</ListItem>
							</List> */}
						</>
						}

					</CardContent>
				</Card>
			) : null}
		</>
	);
}
