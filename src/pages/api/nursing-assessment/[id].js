import NursingAssessmentModel from "@/models/NursingAssessmentModel";
import dbConnect from "../../../lib/dbConnect";
import { isAdmin, verifyToken } from "@/middlewares";
import { isValidObjectId } from "mongoose";
import { HttpError, decodeBase64Img } from "@/utils";
import fs from "fs";

export default async function handler(req, res) {
  const { method, body, headers } = req;

  await dbConnect();

  switch (method) {
    case "GET":
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
        const { id } = req.query;
        if (!isValidObjectId(id)) {
          return res.status(401).json("Unauthorized!");
        }
        const assessment = await NursingAssessmentModel.findOne({
          consumer_contract_id: id,
        }).populate("consumer_contract_id", "-app_password");
        return res.json(assessment);
      } catch ({ message, code, keyPattern, statusCode, errors }) {
        return res.status(statusCode || 500).json(message);
      }
    case "PUT":
      try {
        /**
         * Validate Whether Token Is Passed In Request Or Not
         *
         * ?True: Check if it is valid or not
         * */
        const { id } = req.query;
        var decoded = "";
        const token = headers["authorization"];
        if (!token) {
          return res.status(401).json("Unauthorized!");
        } else {
          decoded = await verifyToken(token, res);
          await isAdmin(token, res);
        }

        // Get the assessment by Assessment ID
        const assessment = await NursingAssessmentModel.findById(id);

        if (!isValidObjectId(id) || !assessment) {
          throw new HttpError("Something Went Wrong", 400);
        }
        // Check if the consumer representative sign is passed in request or not
        if (
          body.nurse_signature &&
          body.nurse_signature !== assessment.nurse_signature
        ) {
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

          //  Delete the previous signature
          fs.unlink(
            `public/uploads/nurse_signature/${assessment.nurse_signature}`,
            (err, file) => {}
          );
        } else {
          body.nurse_signature = assessment.nurse_signature;
        }

        const is_assessment_updated =
          await NursingAssessmentModel.findByIdAndUpdate(id, body);
        return res.json("Assessment Updated!");
      } catch ({ message, code, keyPattern, statusCode, errors }) {
        let msg = "";
        // Check for unique values
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
