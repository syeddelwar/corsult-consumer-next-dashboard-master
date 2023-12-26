import PlanOfCareModel from "@/models/PlanOfCareModel";
import dbConnect from "../../../lib/dbConnect";
import { decodeBase64Img } from "@/utils";
import { getVerifyID, isAdmin, verifyToken } from "@/middlewares";
import fs from "fs";
import { isValidObjectId } from "mongoose";

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

        // if (body.designee_signature) {
        //   //  Decode Base64 encoded string
        //   var imageBuffer = decodeBase64Img(body.designee_signature);
        //   //  Assign Filename
        //   const filename = Date.now();
        //   //  Write the file
        //   fs.writeFile(
        //     `public/uploads/designee_signature/${filename}.png`,
        //     imageBuffer.data,
        //     (err, file) => {}
        //   );
        //   //  Add saved sign image to body of request
        //   body.designee_signature = `${filename}.png`;
        // }

        const is_care_added = await PlanOfCareModel.create(body);
        return res.status(201).json("Care Added!");
      } catch ({ message, code, keyPattern, statusCode, errors }) {
        let msg = "";
        if (code === 11000 && keyPattern["consumer_contract_id"]) {
          msg = "Emergency for this patient already exists!";
        }
        return res.status(statusCode || 500).json(msg || message);
      }
    case "GET":
      try {
        const token = headers["authorization"];

        const appId = getVerifyID(token, res);
        if (!isValidObjectId(appId)) {
          throw new HttpError("Unauthorized", 401);
        }
        // Find Care By Consumer Contract ID
        const care = await PlanOfCareModel.findOne({
          consumer_contract_id: appId,
        });
        return res.json(care);
      } catch ({ message, statusCode }) {
        return res.status(statusCode || 500).json(message);
      }
  }
}
