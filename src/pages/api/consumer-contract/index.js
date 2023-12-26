import ConsumerContractModel from "../../../models/ConsumerContractModel";
import dbConnect from "../../../lib/dbConnect";
import { ConsumerWelcomeEmail, HttpError, decodeBase64Img } from "@/utils";
import { getVerifyID, verifyToken } from "@/middlewares";
import fs from "fs";
import bcrypt from "bcryptjs";
import { isValidObjectId } from "mongoose";
import { sendEmail } from "@/service";

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

        // Check if the consumer representative sign is passed in request or not
        if (body.consumer_representative_sign) {
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
        }
        if (body.authority_sign) {
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
        }

        // if (body.consumer_sign) {
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
        // }
        // if (body.insurance_representative_sign) {
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
        // }
        const app_password = body.app_password;
        // Hash
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(body.app_password, salt);
        body.app_password = hash;

        const is_contract_added = await ConsumerContractModel.create(body);
        if (is_contract_added) {
          // Send welcome email to consumer
          const changePasswordRoute = process.env.APP_URL
            ? process.env.APP_URL + "/consumer_application/change_password"
            : "http://localhost:3000/consumer_application/change_password";

          const html = ConsumerWelcomeEmail(
            changePasswordRoute,
            body.consumerInfo.consumer_cell,
            body.consumerInfo.consumer_gender,
            body.consumerInfo.consumer_first_name +
              " " +
              body.consumerInfo.consumer_last_name,
            app_password
          );
          sendEmail(
            body.consumerInfo.consumer_email_address,
            "Welcome to CORSULT",
            html
          );
          return res.status(201).json("Consumer Added!");
        } else {
          throw new HttpError("Something Went Wrong", 500);
        }
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
    case "GET":
      try {
        const token = headers["authorization"];

        const appId = getVerifyID(token, res);
        if (!isValidObjectId(appId)) {
          throw new HttpError("Unauthorized", 401);
        }
        // Find Application By Consumer Contract Application Document ID
        const application = await ConsumerContractModel.findById(appId).select(
          "-app_password"
        );
        return res.json(application);
      } catch ({ message, statusCode }) {
        return res.status(statusCode || 500).json(message);
      }
    case "PATCH":
      try {
        const token = headers["authorization"];
        const appId = getVerifyID(token, res);
        if (!isValidObjectId(appId)) {
          throw new HttpError("Unauthorized", 401);
        }
        // Find Application By Consumer Contract Application Document ID
        const app = await ConsumerContractModel.findById(appId);
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
          // Delete the previous saved sign
          fs.unlink(
            `public/uploads/consumer_representative_sign/${app.consumer_representative_sign}`,
            (err, file) => {}
          );
          //  Add saved sign image to body of request
          body.consumer_representative_sign = `${filename}.png`;
        } else {
          body.consumer_representative_sign = app.consumer_representative_sign;
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
        // } else {
        //   body.insurance_representative_sign =
        //     app.insurance_representative_sign;
        // }
        const data = {
          // consumer_sign: body.consumer_sign,
          consumer_representative_sign: body.consumer_representative_sign,
          // consumer_sign_date: body.consumer_sign_date,
          consumer_representative_sign_date:
            body.consumer_representative_sign_date,
          // insurance_representative_sign: body.insurance_representative_sign,
          // insurance_last_date: body.insurance_last_date,
        };
        // Find Application By Consumer Contract Application Document ID
        const application = await ConsumerContractModel.findByIdAndUpdate(
          appId,
          data
        );
        return res.json("Application Updated");
      } catch ({ message, statusCode }) {
        return res.status(statusCode || 500).json(message);
      }
    case "DELETE":
      try {
        const { id } = req.params;
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
        // Find Application By Consumer Contract Application Document ID
        const applications = await ConsumerContractModel.findById(id);
        return res.json(applications);
      } catch ({ message, statusCode }) {
        return res.status(statusCode || 500).json(message);
      }
  }
}
