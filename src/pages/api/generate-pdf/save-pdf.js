import { isAdmin, verifyToken } from "@/middlewares";
import { HttpError, getUSTime } from "@/utils";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { method, body, headers } = req;

  switch (method) {
    case "POST":
      try {
        /**
         * Validate Whether Token Is Passed In Request Or Not
         *
         * ?True: Check if it is valid or not
         * */
        const token = headers["authorization"];
        if (!token) {
          return res.status(401).json("Unauthorized!");
        } else {
          await verifyToken(token, res);
          await isAdmin(token, res);
        }

        if (!body) {
          throw new HttpError("PDF Not Provided", 400);
        }

        const { cell } = req.query;

        const doesPDFFolderExists = path.join(
          process.cwd(),
          `${process.env.PDFS_BASE_URL}`
        );

        if (!fs.existsSync(doesPDFFolderExists)) {
          // Create the pdf folder if it doesn't exist
          fs.mkdirSync(doesPDFFolderExists);
        }

        const doesConsumerFolderExists = path.join(
          process.cwd(),
          `${process.env.PDFS_BASE_URL}/${cell}`
        );

        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
        const day = currentDate.getDate().toString().padStart(2, "0");
        let hours = currentDate.getHours();
        const minutes = currentDate.getMinutes().toString().padStart(2, "0");
        const seconds = currentDate.getSeconds().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours %= 12;
        hours = hours || 12;

        const formattedDate = getUSTime();

        const pdfPath = path.join(
          `${process.env.PDFS_BASE_URL}/${cell}/${formattedDate}.pdf`
        );

        const pdfInBase64 = req.body;
        if (!fs.existsSync(doesConsumerFolderExists)) {
          // Create the consumer folder if it doesn't exist
          fs.mkdirSync(doesConsumerFolderExists);
          fs.writeFileSync(pdfPath, pdfInBase64, "base64", (err, file) => {});
        } else {
          fs.writeFileSync(pdfPath, pdfInBase64, "base64", (err, file) => {});
        }

        return res.status(201).json("PDF Saved!");
      } catch ({ message, code, keyPattern, statusCode, errors }) {
        return res.status(statusCode || 500).json(message);
      }
  }
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
