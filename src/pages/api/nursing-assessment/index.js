import NursingAssessmentModel from "@/models/NursingAssessmentModel";
import dbConnect from "../../../lib/dbConnect";
import { decodeBase64Img } from "@/utils";
import { verifyToken } from "@/middlewares";
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
        var decoded = "";
        const token = headers["authorization"];
        if (!token) {
          return res.status(401).json("Unauthorized!");
        } else {
          decoded = await verifyToken(token, res);
        }

        if (body?.nurse_signature) {
          //  Decode Base64 encoded string
          var imageBuffer = decodeBase64Img(body.nurse_signature);
          //  Assign Filename
          const filename = Date.now();
          //  Write the file
          fs.writeFile(
            `public/uploads/nurse_signature/${filename}.png`,
            imageBuffer.data,
            (err, file) => {}
          );
          //  Add saved sign image to body of request
          body.nurse_signature = `${filename}.png`;
        }

        const is_assessment_added = await NursingAssessmentModel.create(body);
        return res.status(201).json("Assessment Added!");
      } catch ({ message, code, keyPattern, statusCode, errors }) {
        let msg = "";
        // Check for unique values
        if (code === 11000 && keyPattern["consumer_contract_id"]) {
          msg = "Emergency for this patient already exists!";
        }
        if (
          code === 11000 &&
          keyPattern["consumerDiagnosis.consumer_primary_diagnosis_code"]
        ) {
          msg = "Patient with this primary diagnosis code already exists!";
        }
        if (
          code === 11000 &&
          keyPattern["consumerDiagnosis.consumer_secondary_diagnosis_code"]
        ) {
          msg = "Patient with this secondary diagnosis code already exists!";
        }
        return res.status(statusCode || 500).json(msg || message);
      }
  }
}
