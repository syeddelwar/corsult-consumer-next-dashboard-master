import ConsumerContractModel from "../../../models/ConsumerContractModel";
import dbConnect from "../../../lib/dbConnect";
import { getVerifyID } from "@/middlewares";
import { isValidObjectId } from "mongoose";
import { HttpError } from "@/utils";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  const { method, headers, body } = req;

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        const token = headers["authorization"];
        const appId = getVerifyID(token, res);
        if (!isValidObjectId(appId)) {
          throw new HttpError("Unauthorized", 401);
        }
        // Hash
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(body.app_password, salt);
        const data = {
          app_password: hash,
        };
        // Find Application By Consumer Contract Application Document ID and update it
        const application = await ConsumerContractModel.findByIdAndUpdate(
          appId,
          data
        );
        return res.json("Password Updated!");
      } catch ({ message, statusCode }) {
        return res.status(statusCode || 500).json(message);
      }
  }
}
