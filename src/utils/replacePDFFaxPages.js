import { PDFDocument } from "pdf-lib";
import fs from "fs/promises";

export default async function (originalPdfPath, combinedPagesBase64) {
  try {
    // Load original PDF
    const originalPdfBytes = await fs.readFile(originalPdfPath);
    const originalPdfDoc = await PDFDocument.load(originalPdfBytes);

    // Load combined pages from a single base64 string
    const combinedPagesBytes = Buffer.from(combinedPagesBase64, "base64");
    const combinedPdfDoc = await PDFDocument.load(combinedPagesBytes);

    // Extract individual pages from the combined PDF
    const [newPage1, newPage2] = await originalPdfDoc.copyPages(
      combinedPdfDoc,
      [1, 2]
    );

    // Replace pages 45 and 46 in the original PDF with new pages
    originalPdfDoc.removePage(44); // Remove original page 45
    originalPdfDoc.removePage(45); // Remove original page 46

    originalPdfDoc.insertPage(44, newPage1); // Insert new page 45 at index 44
    originalPdfDoc.insertPage(45, newPage2); // Insert new page 46 at index 45

    // Save modified PDF
    const modifiedPdfBytes = await originalPdfDoc.save();
    await fs.writeFile(originalPdfPath, modifiedPdfBytes);

    console.log("PDF pages replaced and saved successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}
