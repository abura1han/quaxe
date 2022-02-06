require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const path = require("path");
const helmet = require("helmet");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const socket = require("socket.io");

const PORT = 9000 || process.env.PORT;
const io = socket(server, {
  cors: {
    origin: "*",
  },
});

//
// Conntect to DB
//
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ldpb3.mongodb.net/quaxe?retryWrites=true&w=majority`;
async function dbConnection() {
  try {
    await mongoose.connect(dbUrl);
    console.info("Database connected");
  } catch (error) {
    console.error("\n\n\nDatabase connection problem\n\n\n");
    console.error(error);
  }
}
dbConnection();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app routes
app.use("/", require("./routes/index"));

// chat engine
const chatEngine = require("./chat");
chatEngine(io);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

server.listen(PORT, () =>
  console.log(`Server running on http://localhost${PORT}`)
);
