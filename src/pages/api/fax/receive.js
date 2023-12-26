import { endpoints } from "@/config";
import dbConnect from "../../../lib/dbConnect";
import FormData from "form-data";
import axios from "axios";
import { getFaxDetails } from "@/middlewares";
import {
  parseFormData,
  extractBarcodeFromPDF,
  removeCircularReferences,
  parseFormEncodedData,
} from "@/utils";
import { replacePDFFaxPages } from "../../../utils";
import fs from "fs";
import FaxsReceivedModel from "@/models/FaxsReceivedModel";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { method, body, headers } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const fields = await parseFormEncodedData(req);
        const { jobid, prodid } = fields;
        req.customBody = fields;

        await FaxsReceivedModel.create({ data: removeCircularReferences(req) });
        console.log(jobid, prodid);
        let formData = new FormData();
        formData.append("Username", process.env.FAX_USERNAME);
        formData.append("Password", process.env.FAX_PASSWORD);
        formData.append("FaxIds1", `{"Id":"${jobid}","Direction": "Inbound"}`);
        formData.append("ProductId", prodid);

        endpoints.fax.getFaxDocs.data = formData;

        const faxDocs = await axios(endpoints.fax.getFaxDocs);

        const faxContentBase64 =
          faxDocs.data.Result[0].FaxFiles[0].FileContents;

        const barcode = await extractBarcodeFromPDF(faxContentBase64);

        const fax = await getFaxDetails(barcode, res);

        const savedGeneratedPDFPath = `${process.env.PDFS_BASE_URL}/${fax.consumer_contract_id.consumerInfo.consumer_cell}/${fax.consumerPDF}`;
        const savedSentFAXPDF = `${process.env.FAXES_SENT_BASE_URL}/${fax.consumer_contract_id.consumerInfo.consumer_cell}/${fax.consumerPDF}`;

        replacePDFFaxPages(savedGeneratedPDFPath, faxContentBase64);

        //  Delete the save sent pdf
        fs.unlink(savedSentFAXPDF, (err, file) => {});

        return res.json({
          msg: "Success!",
          jobid: jobid,
          prodid: prodid,
        });
      } catch ({ message, code, keyPattern, statusCode, errors }) {
        return res.status(statusCode || 500).json(message);
      }
  }
}
