let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let morgan = require("morgan");
let database = require("./database/db");

const noteRoute = require("../server/routes/note.routes");

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);


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
app.use(morgan("dev"));
app.use("/notes", noteRoute);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
	console.log("Connected to port " + port);
});

// Error Handling
app.use((req, res, next) => {
	next(createError(404));
});

app.use(function createError(err, req, res, next) {
	console.error(err.message);
	if (!err.statusCode) err.statusCode = 500;
	res.status(err.statusCode).send(err.message);
});
