import ConsumerContractModel from "../../../models/ConsumerContractModel";
import DischargeModel from "@/models/DischargeModel";
import NursingAssessmentModel from "@/models/NursingAssessmentModel";
import PatientEmergencyModel from "@/models/PatientEmergencyModel";
import PlanOfCareModel from "@/models/PlanOfCareModel";
import FaxModel from "@/models/FaxModel";
import dbConnect from "../../../lib/dbConnect";
import { isValidObjectId } from "mongoose";
import { isAdmin, verifyToken } from "@/middlewares";
import fs from "fs";
import bcrypt from "bcryptjs";
import { HttpError, decodeBase64Img } from "@/utils";
import path from "path";

export default async function handler(req, res) {
  const { method, headers, body } = req;

  await dbConnect();

  switch (method) {
    case "DELETE":
      try {
        const { id, delete_pdfs } = req.query;
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
        if (isValidObjectId(id)) {
          const app = await ConsumerContractModel.findById(id);

          const assessment = await NursingAssessmentModel.findOne({
            consumer_contract_id: id,
          });
          if (app?.consumer_representative_sign) {
            //  Delete the signature
            fs.unlink(
              `public/uploads/consumer_representative_sign/${app.consumer_representative_sign}`,
              (err, file) => {}
            );
          }
          if (app?.authority_sign) {
            //  Delete the signature
            fs.unlink(
              `public/uploads/authority_sign/${app.authority_sign}`,
              (err, file) => {}
            );
          }
          if (assessment?.nurse_signature) {
            //  Delete the signature
            fs.unlink(
              `public/uploads/nurse_signature/${assessment.nurse_signature}`,
              (err, file) => {}
            );
          }
          // if (app?.consumer_sign) {
          //   //  Delete the signature
          //   fs.unlink(
          //     `public/uploads/consumer_sign/${app.consumer_sign}`,
          //     (err, file) => {}
          //   );
          // }
          // if (app?.insurance_representative_sign) {
          //   //  Delete the signature
          //   fs.unlink(
          //     `public/uploads/insurance_representative_sign/${app.insurance_representative_sign}`,
          //     (err, file) => {}
          //   );
          // }
          if (delete_pdfs == "true") {
            const consumerPdfsPath = path.join(
              `${process.env.PDFS_BASE_URL}/${app.consumerInfo.consumer_cell}`
            );
            if (fs.existsSync(consumerPdfsPath)) {
              fs.rmdirSync(consumerPdfsPath, { recursive: true });
            }
          }
          // Find Application By Consumer Contract Application ID And delete it
          await ConsumerContractModel.findByIdAndDelete(id);
          await DischargeModel.findOneAndDelete({ consumer_contract_id: id });
          await NursingAssessmentModel.findOneAndDelete({
            consumer_contract_id: id,
          });
          await PatientEmergencyModel.findOneAndDelete({
            consumer_contract_id: id,
          });
          await PlanOfCareModel.findOneAndDelete({ consumer_contract_id: id });
          await FaxModel.findOneAndDelete({ consumer_contract_id: id });
          return res.json("Application Deleted!");
        }
      } catch ({ message, statusCode }) {
        return res.status(statusCode || 500).json(message);
      }
    case "GET":
      try {
        const { id } = req.query;
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
          // await isAdmin(token, res);
        }
        if (isValidObjectId(id)) {
          const application = await ConsumerContractModel.findById(id)
            .select("-app_password")
            .select("-createdAt")
            .select("-updatedAt");

          return res.json(application);
        } else {
          return res.status(400).json("Invalid Application ID!");
        }
      } catch ({ message, statusCode }) {
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
        if (!isValidObjectId(id)) {
          throw new HttpError("Something Went Wrong", 400);
        }

        const app = await ConsumerContractModel.findById(id);

        // Check if the consumer representative sign is passed in request or not
        if (
          body.consumer_representative_sign &&
          body.consumer_representative_sign !== app.consumer_representative_sign
        ) {
          //  Decode Base64 encoded string
          var imageBuffer = decodeBase64Img(body.consumer_representative_sign);
          //  Assign Filename
          const filename = Date.now();
          //  Write the file
          fs.writeFile(
            `public/uploads/consumer_representative_sign/${filename}.png`,
            imageBuffer.data,
            (err, file) => {}
          );
          //  Add saved sign image to body of request
          body.consumer_representative_sign = `${filename}.png`;

          //  Delete the previous signature
          fs.unlink(
            `public/uploads/consumer_representative_sign/${app.consumer_representative_sign}`,
            (err, file) => {}
          );
        } else {
          body.consumer_representative_sign = app.consumer_representative_sign;
        }
        if (body.authority_sign && body.authority_sign !== app.authority_sign) {
          //  Decode Base64 encoded string
          var imageBuffer = decodeBase64Img(body.authority_sign);
          //  Assign Filename
          const filename = Date.now();
          //  Write the file
          fs.writeFile(
            `public/uploads/authority_sign/${filename}.png`,
            imageBuffer.data,
            (err, file) => {}
          );
          //  Add saved sign image to body of request
          body.authority_sign = `${filename}.png`;

          //  Delete the previous signature
          fs.unlink(
            `public/uploads/authority_sign/${app.authority_sign}`,
            (err, file) => {}
          );
        } else {
          body.authority_sign = app.authority_sign;
        }
        // if (body.consumer_sign && body.consumer_sign !== app.consumer_sign) {
        //   //  Decode Base64 encoded string
        //   var imageBuffer = decodeBase64Img(body.consumer_sign);
        //   //  Assign Filename
        //   const filename = Date.now();
        //   //  Write the file
        //   fs.writeFile(
        //     `public/uploads/consumer_sign/${filename}.png`,
        //     imageBuffer.data,
        //     (err, file) => {}
        //   );
        //   //  Add saved sign image to body of request
        //   body.consumer_sign = `${filename}.png`;

        //   //  Delete the previous signature
        //   fs.unlink(
        //     `public/uploads/consumer_sign/${app.consumer_sign}`,
        //     (err, file) => {}
        //   );
        // } else {
        //   body.consumer_sign = app.consumer_sign;
        // }
        // if (
        //   body.insurance_representative_sign &&
        //   body.insurance_representative_sign !==
        //     app.insurance_representative_sign
        // ) {
        //   //  Decode Base64 encoded string
        //   var imageBuffer = decodeBase64Img(body.insurance_representative_sign);
        //   //  Assign Filename
        //   const filename = Date.now();
        //   //  Write the file
        //   fs.writeFile(
        //     `public/uploads/insurance_representative_sign/${filename}.png`,
        //     imageBuffer.data,
        //     (err, file) => {}
        //   );
        //   //  Add saved sign image to body of request
        //   body.insurance_representative_sign = `${filename}.png`;

        //   //  Delete the previous signature
        //   fs.unlink(
        //     `public/uploads/insurance_representative_sign/${app.insurance_representative_sign}`,
        //     (err, file) => {}
        //   );
        // } else {
        //   body.insurance_representative_sign =
        //     app.insurance_representative_sign;
        // }

        if (body.app_password) {
          // Hash
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(body.app_password, salt);
          body.app_password = hash;
        } else {
          body.app_password = app.app_password;
        }

        const is_contract_updated =
          await ConsumerContractModel.findByIdAndUpdate(id, body);
        return res.json("Consumer Updated!");
      } catch ({ message, code, keyPattern, statusCode, errors }) {
        let msg = message;

        // Check for unique values
        if (code === 11000 && keyPattern["consumerInfo.consumer_mrn"]) {
          msg = "Patient with this MRN already exists!";
        } else if (code === 11000 && keyPattern["consumerInfo.consumer_ssn"]) {
          msg = "Patient with this Social Security Number already exists!";
        } else if (
          code === 11000 &&
          keyPattern["consumerInfo.consumer_medicaid_id"]
        ) {
          msg = "Patient with this Medicaid ID already exists!";
        } else if (
          code === 11000 &&
          keyPattern["consumerInfo.consumer_email_address"]
        ) {
          msg = "Patient with this Email Address already exists!";
        } else if (
          code === 11000 &&
          keyPattern["consumerDiagnosis.consumer_primary_diagnosis_code"]
        ) {
          msg = "Patient with this Primary Diagnosis Code already exists!";
        } else if (
          code === 11000 &&
          keyPattern["consumerDiagnosis.consumer_secondary_diagnosis_code"]
        ) {
          msg = "Patient with this Secondary Diagnosis Code already exists!";
        } else if (
          code === 11000 &&
          keyPattern["consumerDiagnosis.consumer_diagnosis_auth_number"]
        ) {
          msg = "Patient with this Authorization Number already exists!";
        } else if (code === 11000 && keyPattern["pcp.pcp_npi"]) {
          msg = "Patient with this NPI already exists!";
        } else if (code === 11000 && keyPattern["consumerInfo.consumer_cell"]) {
          msg = "Patient with this Cell No already exists!";
        } else if (errors && errors["consumerInfo.consumer_gender"]) {
          msg = "Please Select Gender";
        }

        return res.status(statusCode || 500).json(msg);
      }
  }
}
