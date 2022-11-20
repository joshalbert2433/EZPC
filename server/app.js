const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const UserRoutes = require("./routes/user.routes");
const AuthRoutes = require("./routes/auth.routes");
const ProductRoutes = require("./routes/product.routes");

require("./config/database.config");

const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/user", UserRoutes);
app.use("/auth", AuthRoutes);
app.use("/products", ProductRoutes);

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(PORT, () => console.log(`listening in port ${PORT}`));
