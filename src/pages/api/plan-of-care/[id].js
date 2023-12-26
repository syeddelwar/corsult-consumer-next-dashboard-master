import PlanOfCareModel from "@/models/PlanOfCareModel";
import dbConnect from "../../../lib/dbConnect";
import { isAdmin, verifyToken } from "@/middlewares";
import { isValidObjectId } from "mongoose";
import { HttpError } from "@/utils";

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

        const poc = await PlanOfCareModel.findOne({
          consumer_contract_id: id,
        }).populate("consumer_contract_id", "-app_password");

        return res.json(poc);
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

        // Get the poc by emergency ID
        const poc = await PlanOfCareModel.findById(id);

        if (!isValidObjectId(id) || !poc) {
          throw new HttpError("Something Went Wrong", 400);
        }

        const is_poc_updated = await PlanOfCareModel.findByIdAndUpdate(
          id,
          body
        );
        return res.json("Plan Of Care Updated!");
      } catch ({ message, code, keyPattern, statusCode, errors }) {
        return res.status(statusCode || 500).json(message);
      }
  }
}
