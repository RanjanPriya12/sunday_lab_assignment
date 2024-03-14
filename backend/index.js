import express from "express";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";
import cropRouter from "./routes/crop.route";
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload());


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
app.use("/crops/api/v1/", cropRouter);

const port = 5000;
app.listen(port,() => {
    console.log(`Express Server is running on port : ${port}`);
});
