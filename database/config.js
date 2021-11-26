const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CONNECTION);
		console.log("DB Online");
	} catch (e) {
		console.log(e);
		throw new Error("Error a la hora de conectarse a MongoDB");
	}
};

module.exports = {
	dbConnection,
};
