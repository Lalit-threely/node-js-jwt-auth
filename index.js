const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const adminRoutes = require("./routes/adminRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const AppError = require("./utils/error");
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');
const app = express();

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("> DB connection successful ... ");
  });

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use("/api/users", userRouter);
app.use("/api/posts", postRouter)
app.use("/api/admin", adminRoutes);
app.use('/api/category', categoryRoutes);
app.use(cors())

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`> App running on port ${PORT} ...`);
});
