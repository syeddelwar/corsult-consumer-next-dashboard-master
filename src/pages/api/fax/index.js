import FaxModel from "@/models/FaxModel";
import dbConnect from "../../../lib/dbConnect";
import { HttpError, extractPagesForFax, generateRandomBarcode } from "@/utils";
import { isAdmin, verifyToken } from "@/middlewares";
import fs from "fs";
import ConsumerContractModel from "@/models/ConsumerContractModel";
import axios from "axios";
import { endpoints } from "@/config";
import FormData from "form-data";

export default async function handler(req, res) {
  const { method, body, headers } = req;

  await dbConnect();

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

        const consumerInfo = await ConsumerContractModel.findById(
          body.consumer_contract_id
        );

        const barcodeValue = generateRandomBarcode();

        const data = {
          input: `${process.env.APP_URL}/${process.env.NEXT_PUBLIC_PDFS_BASE_URL}/${consumerInfo.consumerInfo.consumer_cell}/${body.consumerPDF}`,
          output: `${process.env.FAXES_SENT_BASE_URL}/${consumerInfo.consumerInfo.consumer_cell}`,
          outputName: body.consumerPDF,
          barcodeValue,
        };

        body.barcode = barcodeValue;
        extractPagesForFax(
          data.input,
          data.output,
          data.outputName,
          data.barcodeValue
        )
          .then(async () => {
            let formData = new FormData();
            formData.append("Username", process.env.FAX_USERNAME);
            formData.append("Password", process.env.FAX_PASSWORD);
            formData.append("Numbers1", consumerInfo.pcp.pcp_fax_no);
            formData.append(
              "Files0",
              fs.createReadStream(data.output + "/" + data.outputName)
            );
            formData.append("ProductId", process.env.FAX_PRODUCT_ID);

            endpoints.fax.sendFax.data = formData;

            const sendFax = await axios(endpoints.fax.sendFax);

            if (sendFax.data.Success) {
              const is_fax_added = await FaxModel.create(body);
              return res.status(201).json("Fax Added!");
            } else {
              throw new HttpError("Something went wrong", 400);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch ({ message, code, keyPattern, statusCode, errors }) {
        console.log(message);
        return res.status(statusCode || 500).json(message);
      }
  }
}
