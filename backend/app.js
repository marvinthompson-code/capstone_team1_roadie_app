const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const app = express();

const path = require("path");

app.use(express.static(path.resolve(__dirname, "./public")));



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const usersRouter = require("./routes/users");
const artistsRouter = require("./routes/artists");
const clientsRouter = require("./routes/clients");
const bookingsRouter = require("./routes/bookings");
const eventsRouter = require("./routes/events");
const mediaRouter = require("./routes/media");
const lineupRouter = require("./routes/lineup");

const skillsRouter = require("./routes/skills");

app.use("/users", usersRouter);
app.use("/artists", artistsRouter);
app.use("/clients", clientsRouter);
app.use("/bookings", bookingsRouter);
app.use("/skills", skillsRouter);
app.use("/events", eventsRouter);
app.use("/media", mediaRouter);
app.use("/lineup", lineupRouter);

// app.post("/uploadphoto", (req, res) => {
//   upload(req, res, function (err) {
//     console.log("Request ---", req.body);
//     console.log("Request file ---", req.file);
//     res.json("/uploads/" + req.file.filename);
//   });
// });

app.listen(port, () => {
  console.log("App is listening on port", port);
});
