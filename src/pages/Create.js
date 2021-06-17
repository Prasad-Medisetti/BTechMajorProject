import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    width: "100%"
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block"
  }
});

export default function Edit(props) {
  const classes = useStyles();
  const history = useHistory();
  // const params = useParams();
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const [note, setNote] = useState({
    title: "",
    details: "",
    category: "monney"
  });

  // useEffect(() => {
  // 	const _id = params.id;
  // 	console.log(params.id);
  // 	fetch(uri + _id)
  // 		.then((res) => res.json())
  // 		.then((data) => setNote(data))
  // 		.catch((error) => console.log(error));
  // }, [params.id]);

  const onChange = (e) => {
    const value = e.target.value;
    setNote({
      ...note,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (note.title === "") {
      setTitleError(true);
    }
    if (note.details === "") {
      setDetailsError(true);
    }
    if (note.title && note.details) {
      if (note._id) {
        // console.log(note._id);
        fetch(
          "https://onlinenoticeboard-server.herokuapp.com/notes" + note._id,
          {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ ...note })
          }
        ).then(() => history.push("/"));
      } else {
        fetch("https://onlinenoticeboard-server.herokuapp.com/notes", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ ...note })
        }).then(() => history.push("/dashboard"));
      }
    }
  };

  return (
    <Container maxWidth="sm">
      {window.location.pathname}
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Post
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          onChange={(e) => onChange(e)}
          label="Post Title"
          variant="outlined"
          color="secondary"
          fullWidth
          name="title"
          value={note.title}
          required
          error={titleError}
        />
        <TextField
          className={classes.field}
          onChange={(e) => onChange(e)}
          label="Post Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={6}
          fullWidth
          name="details"
          value={note.details}
          required
          error={detailsError}
        />

        <div className={classes.field}>
          <FormLabel>Post Category</FormLabel>
          <RadioGroup
            name="category"
            aria-label="category"
            value={note.category}
            onChange={(e) => onChange(e)}
          >
            <FormControl
              required
              value="money"
              control={<Radio />}
              label="Money"
            />
            <FormControl
              required
              value="todos"
              control={<Radio />}
              label="Todos"
            />
            <FormControl
              required
              value="reminders"
              control={<Radio />}
              label="Reminders"
            />
            <FormControl
              required
              value="work"
              control={<Radio />}
              label="Work"
            />
          </RadioGroup>
        </div>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
