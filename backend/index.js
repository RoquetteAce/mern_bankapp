const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/users");
const customerRoutes = require("./routes/customers");

const app = express();
const PORT = 9000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://admin-adrian:12345@cluster0-70fmj.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use("/users", userRoutes);
app.use("/customers", customerRoutes);
app.get("/", (req, res) =>
  res.send(`Our application is running on port ${PORT}`)
);

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));

module.exports = app;
