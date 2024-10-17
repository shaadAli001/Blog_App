const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const bodyparser = require("body-parser");
const morgan = require("morgan");

const userRoute = require("./Routes/userRoute");
const blogRoute = require("./Routes/blogRoutes");
const connectedDB = require("./Config/db");
dotenv.config();

// mongoConnect
connectedDB()
const app = express();

// middleware
app.use(cors());
app.use(bodyparser.json());
app.use(morgan("dev"))

app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} and  Listening on PORT:${PORT}`.bgCyan.white);
});
