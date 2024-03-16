const express = require("express");
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
app.use("/crops/api/v1/", cropRouter);

const port = process.env.PORT || 5000;
app.listen(port,() => {
    console.log(`Express Server is running on port : ${port}`);
});
