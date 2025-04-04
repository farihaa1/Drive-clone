const express = require("express");
const app = express();
const userRouter = require("./routes/user.route");
const connectDb = require("./config/db");

connectDb();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

app.listen(5000, () => {
  console.log("server is running on port 3000");
});
