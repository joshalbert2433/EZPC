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
const { upload } = require("./middleware/multer.middleware");

//DATABASE CONFIG
require("./config/database.config");

const PORT = process.env.PORT || 8181;

//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//ROUTES
app.use("/api/user", UserRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/products", ProductRoutes);

//ERROR HANDLER
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

//TEST
// app.post("/upload", upload.single("image"), (req, res) => {
//     console.log(req.file);
// });

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(PORT, () => console.log(`listening in port ${PORT}`));
