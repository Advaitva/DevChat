const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");
const body = require("body-parser");
const passport = require("passport");

const app = express();
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error.bind(err, console));

app.get("/", (req, res) => {
  res.send("Hola Route Working Successfully!!");
});

app.use(body.urlencoded({ extended: false })); // extended:false --- no nested object ex. {obj1:{obj2:data}}
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App running successfully on port ${port}`));
