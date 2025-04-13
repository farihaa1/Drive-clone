const express = require("express");
const app = express();
const userRouter = require("./routes/user.route");
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
const indexRouter=require('./routes/index.routes');


connectDb();

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Drive Backend");
});
app.use("/", indexRouter);
app.use("/user", userRouter);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
