const { Schema, model } = require("mongoose");

const HospitalSchema = Schema({
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
		require: true,
	},
});

// Si se le quiere hacer un filtro y cambiar el nombre de las variables
HospitalSchema.method("toJSON", function () {
	const { __v, ...object } = this.toObject();
	return object;
});

module.exports = model("Hospitals", HospitalSchema);
