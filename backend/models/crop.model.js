import connection from "../configs/db";
import cloudinary from "cloudinary";
import PDFDocument from 'pdfkit';
import sharp from 'sharp';


exports.createCropAnalysis = async (data) => {
    try {
        const imageBuffer = Buffer.from(data.image, 'base64');
        const processedImageBuffer = await sharp(imageBuffer).resize(800, 600).toBuffer(); 
        const doc = new PDFDocument();
        doc.image(processedImageBuffer);
        const pdfBuffer = await new Promise((resolve) => {
            const buffers = [];
            doc.on('data', (chunk) => buffers.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(buffers)));
            doc.end();
        });

        const myCloud = await cloudinary.v2.uploader.upload(data.image);
        connection.query(`insert into crops(image,pdf_data) values(?,?)`, [myCloud.secure_url, pdfBuffer], (err, result) => {
            if (err) {
                return err;
            } else {
                return result;
            }
        }); 
    } catch (error) {
        return error;
    }
};

exports.getAllGeneratedReports = async () => {
    try {
        connection.query(`select * from crops`, (err, result) => {
            if (err) {
                return err;
            }
            else {
                return result;
            }
        });
    } catch (error) {
        return error;
    }
};

exports.getSingleReport = async (id) => {
    try {
        connection.query(`select * from crops  where id=?`, id, (err, result) => {
            if (err) {
                return err;
            } else {
                return result;
            }
        });
    } catch (error) {
        return error;
    }
};