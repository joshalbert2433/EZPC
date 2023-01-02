const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// CONFIG
require("dotenv").config();

// DATABASE CONFIG
require("./config/database.config");

const PORT = process.env.PORT || 8181;

// ROUTES IMPORT
const UserDetailsRoutes = require("./routes/userDetails.routes");
const AuthRoutes = require("./routes/auth.routes");
const ProductRoutes = require("./routes/product.routes");
const OrderRoutes = require("./routes/order.routes");
const CartRoutes = require("./routes/cart.routes");

//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//ROUTES
app.use("/api/user", UserDetailsRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/cart", CartRoutes);

//ERROR HANDLER
app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
});

app.get("/", (req, res) => {
	res.send("hello world");
});

app.listen(PORT, () => console.log(`listening in port ${PORT}`));
