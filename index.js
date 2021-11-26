require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

const app = express();

app.use(cors());

dbConnection();

app.get("/", (req, res) => {});
app.listen(process.env.PORT, () => {
	console.log("Servidor corriendo en puerto: ", process.env.PORT);
});