const express = require("express");
const api = require("./api/api.router");
const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("PORT 5000");
});

app.use("/api", api);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Listening on port " + port);
});
