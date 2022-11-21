const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//ENV CONFIG
require("dotenv").config();

//ROUTES IMPORT
const UserRoutes = require("./routes/user.routes");
const AuthRoutes = require("./routes/auth.routes");
const ProductRoutes = require("./routes/product.routes");

//DATABASE CONFIG
require("./config/database.config");

const PORT = process.env.PORT || 8181;

//MIDDLEWARE
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//ROUTES
app.use("/api/user", UserRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/products", ProductRoutes);

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(PORT, () => console.log(`listening in port ${PORT}`));
