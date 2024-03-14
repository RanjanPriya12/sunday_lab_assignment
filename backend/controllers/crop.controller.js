import connection from "../configs/db";
import cloudinary from "cloudinary";
import PDFDocument from 'pdfkit';
import sharp from 'sharp';

exports.cropAnalysis = async (req, res) => {
    try {
        const imageBuffer = Buffer.from(req.body.image, 'base64');
        const processedImageBuffer = await sharp(imageBuffer).resize(800, 600).toBuffer(); 
        const doc = new PDFDocument();
        doc.image(processedImageBuffer);
        const pdfBuffer = await new Promise((resolve) => {
            const buffers = [];
            doc.on('data', (chunk) => buffers.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(buffers)));
            doc.end();
        });

        const myCloud = await cloudinary.v2.uploader.upload(req.body.image);
        connection.query(`insert into crops(image,pdf_data) values(?,?)`, [myCloud.secure_url, pdfBuffer], (err, result) => {
            if (err) {
                return res.status(401).send({ success: false, error:err });
            } else {
                return res.status(201).send({ success: true, result });
            }
        });
    } catch (error) {
        return res.status(500).send({ success:false, error: error.message });
    }
};

exports.getAllReports = async (req, res) => {
    try {
        connection.query(`select * from crops`, (err, result) => {
            if (err) {
                return res.status(401).send({ success: false, error:err });
            } else {
                return res.status(201).send({ success: true, result });
            }
        });
    } catch (error) {
      return res.status(500).send({ success:false, error: error.message });
    }
};

exports.getReportById = async (req, res) => {
  try {
      connection.query(`select * from crops  where id=?`, req.params.id, (err, result) => {
        if (err) {
            return res.status(401).send({ success: false, error:err });
        } else {
            return res.status(201).send({ success: true, result });
        }
    });
  } catch (error) {
    return res.status(500).send({ success:false,error: error.message });
  }
};