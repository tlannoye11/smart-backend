const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const todoRoutes = require("./routes/todo.route");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use("/todos", todoRoutes);

const db = require("./config/keys").mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

//const connection = mongoose.connection;

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`);
});
