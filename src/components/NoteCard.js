import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { yellow, green, pink, blue } from "@material-ui/core/colors";
import { EditOutlined, MoreVertOutlined } from "@material-ui/icons";
// import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
	avatar: {
		backgroundColor: (note) => {
			if (note.category === "work") {
				return yellow[700];
			}
			if (note.category === "money") {
				return green[500];
			}
			if (note.category === "todos") {
				return pink[500];
			}
			return blue[500];
		},
	},
	cardMenu: {
		marginRight: 8,
	},
});

export default function NoteCard({ note, handleEdit, handleDelete }) {
	const classes = useStyles(note);

	const [cardMenu, setcardMenu] = React.useState(null);

	const showCardMenu = (event) => {
		setcardMenu(event.currentTarget);
	};

	const handleClose = () => {
		setcardMenu(null);
	};

	return (
		<div>
			<Card elevation={1} variant="outlined">
				<CardHeader
					avatar={
						<Avatar className={classes.avatar}>
							{note.category[0].toUpperCase()}
						</Avatar>
					}
					action={
						<>
							<IconButton
								aria-label="settings"
								aria-haspopup="true"
								onClick={showCardMenu}
								className={classes.cardMenu}
							>
								<MoreVertOutlined />
							</IconButton>
							<Menu
								id="card-menu"
								anchorEl={cardMenu}
								keepMounted
								open={Boolean(cardMenu)}
								onClose={handleClose}
							>
								<MenuItem onClick={() => handleEdit(note._id)}>
									<EditOutlined fontSize="small" /> Edit
								</MenuItem>
								<MenuItem onClick={() => handleDelete(note._id)}>
									<DeleteOutlined fontSize="small" /> Delete
								</MenuItem>
							</Menu>
						</>
					}
					title={note.title}
					subheader={note.category}
				/>
				<CardContent>
					<Typography variant="body2" color="textSecondary">
						{note.details}
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
}
