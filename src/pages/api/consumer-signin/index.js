// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import bcrypt from "bcryptjs";
import ConsumerContractModel from "../../../models/ConsumerContractModel";
import dbConnect from "../../../lib/dbConnect";
import jwt from "jsonwebtoken";
import { HttpError, env } from "@/utils";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  const { method, body } = req;

  await dbConnect();
  switch (method) {
    case "POST":
      try {
        const { cell, password } = body;
        let patient = await ConsumerContractModel.findOne({
          "consumerInfo.consumer_cell": cell,
        });
        // Check Whether the email exists or not
        if (!patient) {
          throw new HttpError("Invalid Credentials", 401);
        }
        const passwordCompare = await bcrypt.compare(
          password,
          patient.app_password
        );

        // Check whether the password is correct or not
        if (!passwordCompare) {
          throw new HttpError("Invalid Credentials", 401);
        }

        // Add payload to request
        const data = {
          app_id: patient._id,
        };
        const authToken = jwt.sign(data, JWT_SECRET);

        return res.json(authToken);
      } catch ({ message, statusCode }) {
        return res.status(statusCode || 500).json(message);
      }
  }
}
