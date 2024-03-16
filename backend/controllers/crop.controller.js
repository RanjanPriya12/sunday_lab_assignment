const connection = require("../configs/db");
const sharp = require('sharp');
const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.cropAnalysis = async (req, res) => {
    try {
        const base64Image = req.body.image.replace(/^data:image\/jpeg;base64,/, '');
        const imageBufferValue = Buffer.from(base64Image, 'base64');
        const imageBuffer = await sharp(imageBufferValue).toBuffer();
        const doc = new PDFDocument();
        const pdfBuffer = [];
        doc.on('data', chunk => {
            pdfBuffer.push(chunk);
        });

        doc.on('end', async () => {
            const finalPdfBuffer = Buffer.concat(pdfBuffer);
            const pdfFolderPath = './pdfs/';
            if (!fs.existsSync(pdfFolderPath)) {
                fs.mkdirSync(pdfFolderPath);
            }
            const pdfFileName = `output_${Date.now()}.pdf`;
            fs.writeFileSync(`${pdfFolderPath}/${pdfFileName}`, finalPdfBuffer);
            const insertQuery = `insert into reports(image,pdf_data) values(?,?)`;
            connection.query(insertQuery, [req.body.title, finalPdfBuffer], (err, result) => {
                if (err) {
                    return res.status(500).send({ success: false, error: err.message });
                }
                return res.status(201).send({ success: true, result:`Pdf created succefully!` });
            });
        });
        doc.image(imageBuffer, {
            fit: [500, 500], 
            align: 'center',
            valign: 'center'
        });
        doc.end();
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
};

exports.getAllReports = async (req, res) => {
    try {
        connection.query(`select * from reports`, (err, result) => {
            if (err) {
                return res.status(401).send({ success: false, error: err });
            } else {
                return res.status(201).send({ success: true, result });
            }
        });
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
};

exports.getReportById = async (req, res) => {
    try {
        connection.query(`select * from reports  where id=?`, req.params.id, (err, result) => {
            if (err) {
                return res.status(401).send({ success: false, error: err });
            } else {
                return res.status(201).send({ success: true, result });
            }
        });
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
};