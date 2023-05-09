const mongoose = require("mongoose");

module.exports = mongoose.connect(process.env.MONGO_URL);
console.log(process.env.MONGO_URL);
mongoose.connection.on("connected", () => console.log("Connected"));
mongoose.connection.on("error", (err) =>
	console.log("Connection failed with - ", err)
);
