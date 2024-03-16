const express = require("express");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const cropRouter = require("./routes/crop.route");
const cors = require('cors');
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(fileUpload());


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
app.use("/crops/api/v1/", cropRouter);

const port = process.env.PORT || 5000;
app.listen(port,() => {
    console.log(`Express Server is running on port : ${port}`);
});
