import PatientEmergencyModel from "@/models/PatientEmergencyModel";
import dbConnect from "../../../lib/dbConnect";
import { getVerifyID, isAdmin, verifyToken } from "@/middlewares";
import { isValidObjectId } from "mongoose";
import { HttpError } from "@/utils";

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

        if (
          !body.consumer_contract_id ||
          !isValidObjectId(body.consumer_contract_id)
        ) {
          throw new HttpError("Invalid Consumer ID", 400);
        }

        const is_emergency_added = await PatientEmergencyModel.create(body);
        return res.status(201).json("Emergency Added!");
      } catch ({ message, code, keyPattern, statusCode, errors }) {
        let msg = "";
        // Check for unique values
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
        // Find Emergency By Consumer Contract ID
        const emergency = await PatientEmergencyModel.findOne({
          consumer_contract_id: appId,
        });
        return res.json(emergency);
      } catch ({ message, statusCode }) {
        return res.status(statusCode || 500).json(message);
      }
  }
}
