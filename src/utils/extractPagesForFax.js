import { PDFDocument } from "pdf-lib";
import fs from "fs";
import { createCanvas } from "canvas";
import JsBarcode from "jsbarcode";

export default function (
  inputPdfPath,
  outputPdfPath,
  outputName,
  barcodeValue
) {
  try {
    return new Promise(async (resolve, reject) => {
      // Fetch an existing PDF document
      let response = await fetch(inputPdfPath);
      let bytes = await response.arrayBuffer();

      // Load a PDFDocument from the existing PDF bytes
      const pdfDoc = await PDFDocument.load(bytes);

      // const form = pdfDoc.getForm();
      // const fields = form.getFields();
      // fields.forEach((field) => {
      //   const type = field.constructor.name;
      //   const name = field.getName();
      //   console.log(`${type}: ${name}`);
      // });

      // Generate barcode image
      const canvas = createCanvas(400, 200); // Set canvas size
      JsBarcode(canvas, barcodeValue, {
        format: "CODE128", // You can change the barcode format here
        displayValue: true,
      });

      // Convert canvas to PNG image buffer
      const barcodeImageBuffer = canvas.toBuffer("image/png");

      const newPdfDoc = await PDFDocument.create();
      const copiedPages = await newPdfDoc.copyPages(pdfDoc, [44, 45]);
      const [firstPage, secondPage] = copiedPages;

      // // Draw barcode image on the first page
      const image = await newPdfDoc.embedPng(barcodeImageBuffer);
      const { width, height } = image.scale(0.5); // Scale down the image if needed
      firstPage.drawImage(image, {
        x: 100, // X-coordinate of the barcode image on the first page
        y: 100, // Y-coordinate of the barcode image on the first page
        width,
        height,
      });

      newPdfDoc.addPage(firstPage);
      newPdfDoc.addPage(secondPage);

      const pdfBytes = await newPdfDoc.save();

      if (!fs.existsSync(outputPdfPath)) {
        fs.mkdirSync(outputPdfPath, { recursive: true });
      }
      fs.writeFile(outputPdfPath + "/" + outputName, pdfBytes, (writeError) => {
        if (writeError) {
          // Handle the 'write' error and check if it's an EPIPE error
          if (writeError.code === "EPIPE") {
            console.error("EPIPE error occurred: Broken Pipe");
          } else {
            console.error(
              "Error occurred while writing the file:",
              writeError.message
            );
          }
          reject(writeError); // Reject the promise with the error
        } else {
          resolve(outputPdfPath + "/" + outputName);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}
