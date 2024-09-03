const express = require("express");
const app = express();
const port = 5000;
const mongodb = require("./db");
const CreateUser = require("./Routes/CreateUser");
const DisplayData=require("./Routes/DisplayData")
const OrderData=require("./Routes/OrderData")
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api", CreateUser);
app.use("/api", DisplayData);
app.use("/api", OrderData);

app.listen(port, () => {
  console.log(`app is listning on port ${port}`);
});
