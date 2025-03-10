const connectDB = require("./config/db");
const cors = require('cors');
const express = require("express");
const propertyRouter = require("./routes/propertyRouter");
const {requestLogger,unknownEndpoint,errorHandler} = require("./middleware/customMiddleware");
require("dotenv").config();
// express app

const app = express();

connectDB();
 
// middleware
app.use(express.json());
app.use(cors());
app.use(requestLogger);

app.get("/", (req, res) => res.send("API Running!"));

// routes


app.use("/api/properties", propertyRouter);





app.use(unknownEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
