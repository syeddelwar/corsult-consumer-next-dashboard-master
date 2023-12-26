import DischargeModel from "@/models/DischargeModel";
import dbConnect from "../../../lib/dbConnect";
import { decodeBase64Img } from "@/utils";
import { isAdmin, verifyToken } from "@/middlewares";
import fs from "fs";

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

        // if (body.agency_representative_sign) {
        //   //  Decode Base64 encoded string
        //   var imageBuffer = decodeBase64Img(body.agency_representative_sign);
        //   //  Assign Filename
        //   const filename = Date.now();
        //   //  Write the file
        //   fs.writeFile(
        //     `public/uploads/agency_representative_sign/${filename}.png`,
        //     imageBuffer.data,
        //     (err, file) => {}
        //   );
        //   //  Add saved sign image to body of request
        //   body.agency_representative_sign = `${filename}.png`;
        // }

        const is_assessment_added = await DischargeModel.create(body);
        return res.status(201).json("Discharge Added!");
      } catch ({ message, code, keyPattern, statusCode, errors }) {
        let msg = "";
        if (code === 11000 && keyPattern["consumer_contract_id"]) {
          msg = "Discharge for this patient already exists!";
        }
        return res.status(statusCode || 500).json(msg || message);
      }
  }
}
