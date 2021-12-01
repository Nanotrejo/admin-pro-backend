require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

const app = express();

app.use(cors());

app.use(express.json());

dbConnection();

app.use(express.static("public"));

app.use("/api/users", require("./routes/users"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/hospitals", require("./routes/hospitals"));
app.use("/api/doctors", require("./routes/doctors"));
app.use("/api/all", require("./routes/search"));
app.use("/api/uploads", require("./routes/uploads"));

app.listen(process.env.PORT, () => {
	console.log("Servidor corriendo en puerto: ", process.env.PORT);
});
