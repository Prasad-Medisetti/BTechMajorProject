let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let database = require("./database/db");

const noteRoute = require("../server/routes/note.routes");
const { ExposurePlus1Sharp } = require("@material-ui/icons");

mongoose.Promise = global.Promise;
mongoose
	.connect(database.db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(
		() => {
			console.log("Database connected sucessfully !");
		},
		(error) => {
			console.log("Database could not be connected : " + error);
		}
	);

const app = express();
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(cors());
app.use("/notes", noteRoute);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
	console.log("Connected to port " + port);
});

// Error Handling
app.use((req, res, next) => {
	next(createError(404));
});

app.use(function (err, req, res, next) {
	console.error(err.message);
	if (!err.statusCode) err.statusCode = 500;
	res.status(err.statusCode).send(err.message);
});
