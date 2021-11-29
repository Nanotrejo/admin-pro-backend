const { Schema, model } = require("mongoose");

const DoctorsSchema = Schema({
	name: {
		type: String,
		require: true,
	},
	img: {
		type: String,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "Users",
		required: true,
	},
	hospital: {
		type: Schema.Types.ObjectId,
		ref: "Hospitals",
		require: true,
	},
});

// Si se le quiere hacer un filtro y cambiar el nombre de las variables
DoctorsSchema.method("toJSON", function () {
	const { __v, ...object } = this.toObject();
	return object;
});

module.exports = model("Doctors", DoctorsSchema);
